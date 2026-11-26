const SERVER_PLAYER = 0;

function getGroupKeyForLocation(location) {
  let typeText = "";
  if (location.type) {
    typeText = location.type;
  }
  const locationTypes = typeText.split(";");
  if (locationTypes.includes(trackerConfig.synthesisLocationType)) {
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

function getItemsFoundInGame(checkedLocations) {
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
      foundItems.push({ item: itemId, name: name, source: "game", location: locationId });
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

function getItemNamesYouFoundByLocation() {
  const itemNames = {};
  for (const item of currentState.items) {
    if (item.location !== undefined && item.name !== null) {
      itemNames[item.location] = item.name;
    }
  }
  return itemNames;
}

function getItemNameAtLocation(locationId, itemNamesYouFound) {
  if (itemNamesYouFound[locationId] !== undefined) {
    return itemNamesYouFound[locationId];
  }
  const itemLocationMap = seedFiles.item_location_map || {};
  const itemId = itemLocationMap[locationId];
  if (itemId === undefined || itemId === trackerConfig.apItemPlaceholder) {
    return null;
  }
  return getItemName(itemId);
}

function doesAnUnknownItemCount() {
  if (!isOptionTurnedOn("only_tracked_items_are_important")) {
    return true;
  }
  return isItemTracked(trackerConfig.importantMultiworldItem.name);
}

function isItemTracked(itemName) {
  if (getWorldUnlockedByItem(itemName) !== null) {
    return true;
  }
  return getTrackedItemThatCounts(itemName) !== null;
}

function isImportantLocation(locationId, itemNamesYouFound, progressionLocations) {
  const itemName = getItemNameAtLocation(locationId, itemNamesYouFound);
  const seedSaysItIsImportant = progressionLocations.has(locationId);
  if (itemName === null) {
    return seedSaysItIsImportant && doesAnUnknownItemCount();
  }
  if (!seedSaysItIsImportant) {
    return isOptionTurnedOn("all_tracked_items_are_important") && isItemTracked(itemName);
  }
  if (!isOptionTurnedOn("only_tracked_items_are_important")) {
    return true;
  }
  return isItemTracked(itemName);
}

function getLocationsThatMightBeImportant(itemNamesYouFound) {
  const locations = new Set(seedFiles.progression_locations || []);
  if (!isOptionTurnedOn("all_tracked_items_are_important")) {
    return locations;
  }
  const itemLocationMap = seedFiles.item_location_map || {};
  for (const locationKey of Object.keys(itemLocationMap)) {
    locations.add(Number(locationKey));
  }
  for (const locationKey of Object.keys(itemNamesYouFound)) {
    locations.add(Number(locationKey));
  }
  return locations;
}

function getImportantMultiworldItemsFound() {
  const multiworldItems = [];
  if (seedFiles.item_location_map === null) {
    return multiworldItems;
  }
  const progressionLocations = new Set(seedFiles.progression_locations || []);
  const itemNamesYouFound = getItemNamesYouFoundByLocation();
  for (const locationId of currentState.checked_locations) {
    const holdsProgression = progressionLocations.has(locationId);
    const holdsAnotherPlayersItem = getItemNameAtLocation(locationId, itemNamesYouFound) === null;
    if (holdsProgression && holdsAnotherPlayersItem) {
      multiworldItems.push({ name: trackerConfig.importantMultiworldItem.name, source: "game", location: locationId });
    }
  }
  return multiworldItems;
}

function countImportantChecksPerGroup() {
  const counts = { found: {}, remaining: {}, remainingIsKnown: seedFiles.progression_locations !== null };
  const checkedLocations = new Set(currentState.checked_locations);
  const itemNamesYouFound = getItemNamesYouFoundByLocation();
  const progressionLocations = new Set(seedFiles.progression_locations || []);
  for (const locationId of getLocationsThatMightBeImportant(itemNamesYouFound)) {
    const groupKey = getGroupOfLocation(locationId);
    if (!groupKey || !isImportantLocation(locationId, itemNamesYouFound, progressionLocations)) {
      continue;
    }
    if (checkedLocations.has(locationId)) {
      counts.found[groupKey] = (counts.found[groupKey] || 0) + 1;
    } else {
      counts.remaining[groupKey] = (counts.remaining[groupKey] || 0) + 1;
    }
  }
  return counts;
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
    items: getItemsFoundInGame(checkedLocations).concat(getItemsReceived(rawState)),
    starting_items: startingItems,
  };
}
