function shouldShowWorld(group, locationCountPerGroup) {
  if (!locationCountPerGroup[group.key]) {
    return false;
  }
  const settingThatHidesWorld = getWorldConfig(group.key).hiddenWhenSettingIsOff;
  if (settingThatHidesWorld && seedSettings[settingThatHidesWorld] === false) {
    return false;
  }
  return true;
}

function drawWorlds(itemCounts) {
  const locationCountPerGroup = {};
  for (const location of Object.values(locationCatalog)) {
    locationCountPerGroup[location.group] = (locationCountPerGroup[location.group] || 0) + 1;
  }

  const checkedCountPerGroup = {};
  for (const locationId of currentState.checked_locations) {
    const group = getGroupOfLocation(locationId);
    if (group) {
      checkedCountPerGroup[group] = (checkedCountPerGroup[group] || 0) + 1;
    }
  }

  const importantChecksFoundPerGroup = {};
  const foundItemsPerGroup = {};
  for (const item of currentState.items) {
    if (item.location === undefined) {
      continue;
    }
    const group = getGroupOfLocation(item.location) || "other";
    if (item.progression) {
      importantChecksFoundPerGroup[group] = (importantChecksFoundPerGroup[group] || 0) + 1;
    }
    if (getIconForItem(item.name) !== null) {
      if (!foundItemsPerGroup[group]) {
        foundItemsPerGroup[group] = [];
      }
      foundItemsPerGroup[group].push(item);
    }
  }

  let worldsHtml = "";
  for (const group of locationGroups) {
    if (!shouldShowWorld(group, locationCountPerGroup)) {
      continue;
    }
    worldsHtml += makeWorldHtml(group, itemCounts, checkedCountPerGroup, locationCountPerGroup, importantChecksFoundPerGroup, foundItemsPerGroup);
  }
  document.getElementById("world-list").innerHTML = worldsHtml;

  foundLocationsLastTime = [];
  for (const item of currentState.items) {
    foundLocationsLastTime.push(item.location);
  }

  shrinkFoundIconsToFit();
}

function makeWorldHtml(group, itemCounts, checkedCountPerGroup, locationCountPerGroup, importantChecksFoundPerGroup, foundItemsPerGroup) {
  const worldConfig = getWorldConfig(group.key);

  let worldClasses = "world";
  const youAreInThisWorld = !currentState.in_gummi && currentState.current_group === group.key;
  if (youAreInThisWorld) {
    worldClasses += " you-are-here";
  }
  const worldIsLocked = worldConfig.unlockedByItem && howManyYouHave(itemCounts, worldConfig.unlockedByItem) === 0;
  if (worldIsLocked) {
    worldClasses += " locked";
  }

  const checkedCount = checkedCountPerGroup[group.key] || 0;
  const locationCount = locationCountPerGroup[group.key];
  const worldHoverText = group.name + " (" + checkedCount + " / " + locationCount + " checks)";

  const importantChecksFound = importantChecksFoundPerGroup[group.key] || 0;
  let worldIsComplete = false;
  if (currentState.progression_remaining) {
    const importantChecksLeft = currentState.progression_remaining[group.key] || 0;
    worldIsComplete = importantChecksLeft === 0;
  }
  let badgeClasses = "important-checks-badge gummi-font";
  let badgeHoverText = "Important checks found";
  if (worldIsComplete) {
    badgeClasses += " world-complete";
    badgeHoverText += ", none left";
  }

  let html = '<div class="' + worldClasses + '">';
  html += '<div class="world-icon">';
  html += makeImageHtml(worldConfig.icon, worldHoverText);
  html += '<span class="' + badgeClasses + '" title="' + badgeHoverText + '">' + importantChecksFound + "</span>";
  html += "</div>";
  html += '<div class="found-items">' + makeFoundItemsHtml(foundItemsPerGroup[group.key] || []) + "</div>";
  html += "</div>";
  return html;
}

function makeFoundItemsHtml(foundItems) {
  const foundItemsByIcon = {};
  const iconOrder = [];
  for (const item of foundItems) {
    const icon = getIconForItem(item.name);
    if (!foundItemsByIcon[icon]) {
      foundItemsByIcon[icon] = { itemNames: [], count: 0, sentByServer: false, justReceived: false };
      iconOrder.push(icon);
    }
    const iconGroup = foundItemsByIcon[icon];
    if (!iconGroup.itemNames.includes(item.name)) {
      iconGroup.itemNames.push(item.name);
    }
    iconGroup.count += 1;
    if (item.source === "remote") {
      iconGroup.sentByServer = true;
    }
    if (foundLocationsLastTime !== null && !foundLocationsLastTime.includes(item.location)) {
      iconGroup.justReceived = true;
    }
  }

  let html = "";
  for (const icon of iconOrder) {
    const iconGroup = foundItemsByIcon[icon];
    let classes = "found-item";
    let hoverText = iconGroup.itemNames.join(", ");
    if (iconGroup.sentByServer) {
      classes += " sent-by-server";
      hoverText += " (sent by the server)";
    }
    if (iconGroup.justReceived) {
      classes += " just-received";
    }
    html += '<span class="' + classes + '">';
    html += makeImageHtml(icon, hoverText);
    if (iconGroup.count > 1) {
      html += '<span class="item-count gummi-font">' + iconGroup.count + "</span>";
    }
    html += "</span>";
  }
  return html;
}

function shrinkFoundIconsToFit() {
  const allFoundItemAreas = document.querySelectorAll(".found-items");
  for (const foundItemArea of allFoundItemAreas) {
    for (const size of trackerConfig.foundIconSizesToTryInPixels) {
      foundItemArea.style.setProperty("--found-icon-size", size + "px");
      const everythingFits = foundItemArea.scrollHeight <= foundItemArea.clientHeight;
      if (everythingFits) {
        break;
      }
    }
  }
}
