const SERVER_PLAYER = 0;

function getGroupKeyForLocation(location) {
  if (location.type === trackerConfig.synthesisLocationType) {
    return "synthesis";
  }
  for (const [groupKey, worldConfig] of Object.entries(trackerConfig.worlds)) {
    if (worldConfig.category === location.category) {
      return groupKey;
    }
  }
  return null;
}

function getGroupKeyForWorldId(worldId) {
  for (const [groupKey, worldConfig] of Object.entries(trackerConfig.worlds)) {
    if (worldConfig.worldId === worldId) {
      return groupKey;
    }
  }
  return null;
}

function buildLocationCatalog() {
  const locationsInSeed = seedFiles.item_location_map || seedFiles.locations;
  locationCatalog = {};
  for (const locationId of Object.keys(locationsInSeed)) {
    const location = seedFiles.locations[locationId];
    const groupKey = location && getGroupKeyForLocation(location);
    if (groupKey) {
      locationCatalog[locationId] = { name: location.name, group: groupKey };
    }
  }
  locationGroups = [];
  for (const [groupKey, worldConfig] of Object.entries(trackerConfig.worlds)) {
    if (groupKey !== "archipelago") {
      locationGroups.push({ key: groupKey, name: worldConfig.name });
    }
  }
}

function getItemName(itemId) {
  const item = seedFiles.items[itemId];
  return item ? item.name : null;
}

function getItemsFoundInGame(checkedLocations, progressionLocations) {
  const itemLocationMap = seedFiles.item_location_map || {};
  const remoteLocations = new Set(seedSettings.remote_location_ids || []);
  const foundItems = [];
  for (const locationId of checkedLocations) {
    const itemId = itemLocationMap[locationId];
    if (itemId === undefined || itemId === trackerConfig.apItemPlaceholder || remoteLocations.has(locationId)) {
      continue;
    }
    const name = getItemName(itemId);
    if (name !== null) {
      foundItems.push({ item: itemId, name: name, source: "game", location: locationId, progression: progressionLocations.has(locationId) });
    }
  }
  return foundItems;
}

function getItemsReceived(rawState) {
  return rawState.items.map((record, position) => {
    let source = "multiworld";
    if (record.player === SERVER_PLAYER) {
      source = "server";
    } else if (record.player === rawState.player) {
      source = "remote";
    }
    const item = { item: record.item, name: getItemName(record.item), source: source, progression: (record.flags & 1) !== 0 };
    if (source === "remote") {
      item.location = record.location;
    }
    item.index = record.index !== undefined ? record.index : position;
    return item;
  });
}

function getProgressionRemaining(checkedLocations, progressionLocations) {
  if (seedFiles.progression_locations === null) {
    return null;
  }
  const checked = new Set(checkedLocations);
  const remaining = {};
  for (const locationId of progressionLocations) {
    const groupKey = getGroupOfLocation(locationId);
    if (groupKey) {
      remaining[groupKey] = (remaining[groupKey] || 0) + (checked.has(locationId) ? 0 : 1);
    }
  }
  return remaining;
}

function getCheckedLocations(rawState) {
  let locations = rawState.checked_locations;
  if (seedSettings.remote_items === "full") {
    locations = locations.concat(rawState.server_checked_locations || []);
  }
  return [...new Set(locations)].sort((a, b) => a - b);
}

function buildTrackerState(rawState) {
  const checkedLocations = getCheckedLocations(rawState);
  const progressionLocations = new Set(seedFiles.progression_locations || []);
  const startingItems = (seedSettings.starting_items || []).map(itemId => ({ item: itemId, name: getItemName(itemId) }));
  return {
    seed: seedSettings.seed,
    slot: seedSettings.slot_name,
    player: rawState.player,
    connected: rawState.connected,
    world: rawState.world,
    current_group: getGroupKeyForWorldId(rawState.world),
    in_gummi: rawState.in_gummi,
    victory: rawState.victory,
    checked_locations: checkedLocations,
    items: getItemsFoundInGame(checkedLocations, progressionLocations).concat(getItemsReceived(rawState)),
    starting_items: startingItems,
    progression_remaining: getProgressionRemaining(checkedLocations, progressionLocations),
  };
}
