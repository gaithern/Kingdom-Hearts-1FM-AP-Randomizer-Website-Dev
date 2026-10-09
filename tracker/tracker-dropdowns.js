function getCurrentWorldName() {
  let worldName = "World " + currentState.world;
  for (const group of locationGroups) {
    if (group.key === currentState.current_group) {
      worldName = group.name;
    }
  }
  if (currentState.in_gummi) {
    worldName += " (gummi)";
  }
  return worldName;
}

function drawSeedDetails() {
  let slot = currentState.slot;
  if (currentState.player !== undefined) {
    slot += " (player " + currentState.player + ")";
  }
  let html = "";
  html += makeTableRowHtml("Seed", currentState.seed);
  html += makeTableRowHtml("Slot", slot);
  html += makeTableRowHtml("Archipelago", currentState.connected ? "Connected" : "Offline");
  html += makeTableRowHtml("Current world", getCurrentWorldName());
  html += makeTableRowHtml("Checks", currentState.checked_locations.length);
  html += makeTableRowHtml("From other players", countItemsFromSource("multiworld"));
  html += makeTableRowHtml("Victory", currentState.victory ? "Yes" : "No");
  document.getElementById("seed-details").innerHTML = html;
}

function formatSettingValue(value) {
  if (value === true) {
    return "on";
  }
  if (value === false) {
    return "off";
  }
  return value;
}

function drawSettings() {
  let chipsHtml = "";
  for (const settingName of Object.keys(trackerConfig.settingsShownAsChips)) {
    if (seedSettings[settingName] === undefined) {
      continue;
    }
    const label = trackerConfig.settingsShownAsChips[settingName];
    chipsHtml += '<span class="setting-chip">' + escapeHtml(label) + ": <b>" + escapeHtml(formatSettingValue(seedSettings[settingName])) + "</b></span>";
  }

  const allSettingNames = Object.keys(seedSettings).sort();
  if (allSettingNames.length === 0) {
    chipsHtml = '<span class="setting-chip">No /settings from this randomizer</span>';
  }

  let tableHtml = "";
  for (const settingName of allSettingNames) {
    tableHtml += makeTableRowHtml(settingName, JSON.stringify(seedSettings[settingName]));
  }

  document.getElementById("setting-chips").innerHTML = chipsHtml;
  document.getElementById("all-settings").innerHTML = tableHtml;
}

function getTotalProgressionLeft() {
  if (!currentState.progression_remaining) {
    return "no data";
  }
  let total = 0;
  for (const count of Object.values(currentState.progression_remaining)) {
    total += count;
  }
  return total;
}

function drawDebugStats() {
  const stats = [
    ["Seed", currentState.seed],
    ["Slot", currentState.slot],
    ["Player", currentState.player === undefined ? "-" : currentState.player],
    ["AP connected", currentState.connected ? "yes" : "no"],
    ["World", currentState.world + " (" + (currentState.current_group || "none") + ")"],
    ["In gummi", currentState.in_gummi ? "yes" : "no"],
    ["Victory", currentState.victory ? "yes" : "no"],
    ["Checked", currentState.checked_locations.length],
    ["Game items", countItemsFromSource("game")],
    ["Remote items", countItemsFromSource("remote")],
    ["Multiworld items", countItemsFromSource("multiworld")],
    ["Server items", countItemsFromSource("server")],
    ["Starting items", currentState.starting_items.length],
    ["Progression left", getTotalProgressionLeft()],
    ["Revision", currentState.revision]
  ];
  let html = "";
  for (const stat of stats) {
    html += '<div class="debug-stat"><span class="debug-stat-name">' + escapeHtml(stat[0]) + '</span><span class="debug-stat-value">' + escapeHtml(stat[1]) + "</span></div>";
  }
  document.getElementById("debug-stats").innerHTML = html;
}

function findProblemsWithState() {
  const problems = [];

  if (currentState.api !== trackerConfig.expectedApiVersion) {
    problems.push("Unexpected api version " + currentState.api);
  }

  const knownGroupKeys = [];
  for (const group of locationGroups) {
    knownGroupKeys.push(group.key);
  }

  for (const locationId of Object.keys(locationCatalog)) {
    const group = locationCatalog[locationId].group;
    if (!knownGroupKeys.includes(group)) {
      problems.push("Location " + locationId + ' has group "' + group + '", which /locations doesn\'t list');
      break;
    }
  }

  if (currentState.progression_remaining) {
    for (const groupKey of Object.keys(currentState.progression_remaining)) {
      if (!knownGroupKeys.includes(groupKey)) {
        problems.push('progression_remaining has unknown group "' + groupKey + '"');
      }
      if (currentState.progression_remaining[groupKey] < 0) {
        problems.push("progression_remaining." + groupKey + " is negative");
      }
    }
  }

  const checkedLocations = currentState.checked_locations;
  const uniqueCheckedLocations = new Set(checkedLocations);
  if (uniqueCheckedLocations.size !== checkedLocations.length) {
    problems.push("checked_locations contains duplicates");
  }
  for (const locationId of checkedLocations) {
    if (getGroupOfLocation(locationId) === null) {
      problems.push("Checked location " + locationId + " isn't in /locations");
    }
  }

  const locationsWithItems = [];
  const indexesSeen = [];
  for (const item of currentState.items) {
    const itemHasLocation = item.location !== undefined;
    const itemHasIndex = item.index !== undefined;
    const itemIsFromYourWorld = item.source === "game" || item.source === "remote";

    if (!trackerConfig.validItemSources.includes(item.source)) {
      problems.push(item.name + ' has unknown source "' + item.source + '"');
    }
    if (itemIsFromYourWorld && !itemHasLocation) {
      problems.push(item.name + " (" + item.source + ") is missing a location");
    }
    if (!itemIsFromYourWorld && itemHasLocation) {
      problems.push(item.name + " (" + item.source + ") shouldn't have a location");
    }
    if (itemIsFromYourWorld && itemHasLocation && !uniqueCheckedLocations.has(item.location)) {
      problems.push(item.name + " at " + item.location + " isn't in checked_locations");
    }
    if (itemIsFromYourWorld && locationsWithItems.includes(item.location)) {
      problems.push("Location " + item.location + " has two items");
    }
    if (itemIsFromYourWorld) {
      locationsWithItems.push(item.location);
    }
    if (item.source === "game" && itemHasIndex) {
      problems.push(item.name + " (game) shouldn't have an index");
    }
    if (item.source !== "game" && !itemHasIndex) {
      problems.push(item.name + " (" + item.source + ") is missing an index");
    }
    if (itemHasIndex && indexesSeen.includes(item.index)) {
      problems.push("items repeats index " + item.index);
    }
    if (itemHasIndex) {
      indexesSeen.push(item.index);
    }
    if (item.source === "multiworld" && !item.sender) {
      problems.push(item.name + " from another player has no sender");
    }
  }

  return problems;
}

function drawWarnings() {
  const problems = findProblemsWithState();
  let html = "";
  for (const problem of problems) {
    html += "<li>" + escapeHtml(problem) + "</li>";
  }
  if (problems.length === 0) {
    html = "<li>None</li>";
  }
  document.getElementById("warning-list").innerHTML = html;
}

function describeChange(listName, label) {
  let countBefore = 0;
  if (previousState !== null) {
    countBefore = previousState[listName].length;
  }
  const difference = currentState[listName].length - countBefore;
  if (difference > 0) {
    return "+" + difference + " " + label;
  }
  if (difference < 0) {
    return difference + " " + label;
  }
  return null;
}

function addChangeToLog() {
  const logLine = document.createElement("div");
  const time = new Date().toLocaleTimeString();

  const scriptsReloaded = previousState !== null && currentState.revision < previousState.revision;
  const newRun = previousState !== null && currentState.seed !== previousState.seed;

  if (scriptsReloaded || newRun) {
    logLine.className = "reload-message";
    logLine.textContent = time + "  scripts reloaded or new run (revision " + previousState.revision + " -> " + currentState.revision + ")";
  } else {
    const changes = [];
    const listsToCompare = [["checked_locations", "checks"], ["items", "items"], ["starting_items", "starting"]];
    for (const listToCompare of listsToCompare) {
      const change = describeChange(listToCompare[0], listToCompare[1]);
      if (change !== null) {
        changes.push(change);
      }
    }
    if (previousState !== null && previousState.world !== currentState.world) {
      changes.push("world " + previousState.world + " -> " + currentState.world);
    }
    if (previousState !== null && previousState.connected !== currentState.connected) {
      changes.push(currentState.connected ? "connected" : "disconnected");
    }
    let description = changes.join(", ");
    if (description === "") {
      description = previousState === null ? "first snapshot" : "status change";
    }
    logLine.textContent = time + "  r" + currentState.revision + "  " + description;
  }

  document.getElementById("change-log").prepend(logLine);
}
