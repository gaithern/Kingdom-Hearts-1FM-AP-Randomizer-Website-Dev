function getGroupOfLocation(locationId) {
  const location = locationCatalog[locationId];
  if (location) {
    return location.group;
  }
  return null;
}

function getWorldConfig(groupKey) {
  const worldConfig = trackerConfig.worlds[groupKey];
  if (worldConfig) {
    return worldConfig;
  }
  return trackerConfig.worlds.other;
}

function isSettingOn(settingName, settingIsOnWhenMissing) {
  const settingValue = seedSettings[settingName];
  if (settingValue === undefined) {
    return settingIsOnWhenMissing === true;
  }
  return settingValue === true;
}

function howManyYouHave(itemCounts, itemName) {
  return itemCounts[itemName] || 0;
}

function countItemsYouHave() {
  const itemCounts = {};
  const allItems = currentState.items.concat(currentState.starting_items);
  for (const item of allItems) {
    itemCounts[item.name] = howManyYouHave(itemCounts, item.name) + 1;
  }
  for (const rule of trackerConfig.itemsTheGameGivesYou) {
    const ruleApplies = isSettingOn(rule.onlyWhenSettingIsOn, rule.settingIsOnWhenMissing);
    const youHaveEnough = howManyYouHave(itemCounts, rule.whenYouHave) >= rule.howMany;
    if (ruleApplies && youHaveEnough) {
      for (const itemName of rule.youAlsoGet) {
        if (howManyYouHave(itemCounts, itemName) === 0) {
          itemCounts[itemName] = 1;
        }
      }
    }
  }
  return itemCounts;
}

function getIconForItem(itemName) {
  for (const row of trackerConfig.itemRows) {
    for (const trackedItem of row) {
      if (trackedItem.countsItems.includes(itemName)) {
        return trackedItem.icon;
      }
    }
  }
  for (const worldConfig of Object.values(trackerConfig.worlds)) {
    if (worldConfig.unlockedByItem === itemName) {
      return worldConfig.icon;
    }
  }
  return null;
}

function countItemsFromSource(source) {
  let count = 0;
  for (const item of currentState.items) {
    if (item.source === source) {
      count += 1;
    }
  }
  return count;
}
