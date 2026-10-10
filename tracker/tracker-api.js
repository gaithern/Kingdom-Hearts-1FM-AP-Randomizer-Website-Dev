function getApiAddress() {
  let address = document.getElementById("api-address").value.trim();
  if (address.endsWith("/")) {
    address = address.slice(0, -1);
  }
  return address;
}

function showConnectionStatus(message, statusName) {
  document.getElementById("status-message").textContent = message;
  document.getElementById("status-light").className = "status-light " + statusName;
}

async function fetchFromApi(path) {
  const response = await fetch(getApiAddress() + path, { cache: "no-store" });
  if (response.status === 404) {
    return { missing: true };
  }
  if (!response.ok) {
    throw new Error(path + " returned " + response.status);
  }
  const text = await response.text();
  return { text: text, data: JSON.parse(text) };
}

// The seed files never change while the game runs, so they are loaded once
// and forgotten when the game goes away (a new seed means a restart).
async function loadSeedFilesIfNeeded() {
  if (seedFiles !== null) {
    return true;
  }
  const required = ["settings", "locations", "items"];
  const optional = ["item_location_map", "progression_locations"];
  const files = {};
  for (const name of required.concat(optional)) {
    const result = await fetchFromApi("/" + name);
    if (result.missing && required.includes(name)) {
      return false;
    }
    files[name] = result.missing ? null : result.data;
  }
  seedFiles = files;
  seedSettings = files.settings;
  buildLocationCatalog();
  return true;
}

async function checkForUpdates() {
  const addressWhenStarted = getApiAddress();
  try {
    const seedFilesAreLoaded = await loadSeedFilesIfNeeded();
    if (!seedFilesAreLoaded) {
      showConnectionStatus("Game running", "waiting");
    } else {
      const result = await fetchFromApi("/state");
      if (addressWhenStarted !== getApiAddress()) {
        return;
      }
      if (result.missing) {
        showConnectionStatus("Game running", "waiting");
      } else {
        showConnectionStatus("Connected", "connected");
        handleNewState(result.text, result.data);
      }
    }
  } catch (error) {
    showConnectionStatus("Can't reach the API", "disconnected");
    forgetEverything();
  } finally {
    setTimeout(checkForUpdates, trackerConfig.checkForUpdatesEveryMilliseconds);
  }
}

function handleNewState(stateText, rawState) {
  if (stateText === rawStateText) {
    return;
  }
  rawStateText = stateText;
  currentState = buildTrackerState(rawState);
  drawEverything();
}

function forgetEverything() {
  seedFiles = null;
  locationCatalog = null;
  locationGroups = [];
  seedSettings = null;
  rawStateText = null;
  currentState = null;
  itemCountsLastTime = null;
  foundItemKeysLastTime = null;
}
