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

function drawSettings() {
  const allSettingNames = Object.keys(seedSettings).sort();
  let tableHtml = "";
  for (const settingName of allSettingNames) {
    tableHtml += makeTableRowHtml(settingName, JSON.stringify(seedSettings[settingName]));
  }
  if (allSettingNames.length === 0) {
    tableHtml = makeTableRowHtml("No /settings from this randomizer", "");
  }

  document.getElementById("all-settings").innerHTML = tableHtml;
}
