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
  if (isBroadcastView) {
    const gameIsOffline = statusName !== "connected";
    document.documentElement.classList.toggle("game-offline", gameIsOffline);
  }
}

async function fetchFromApi(path) {
  const response = await fetch(getApiAddress() + path, { cache: "no-store" });
  if (response.status === 503) {
    return { notReady: true };
  }
  if (response.status === 404) {
    return { missing: true };
  }
  if (!response.ok) {
    throw new Error(path + " returned " + response.status);
  }
  const data = await response.json();
  return { data: data };
}

async function loadLocationsIfNeeded() {
  if (locationCatalog !== null) {
    return true;
  }
  const result = await fetchFromApi("/locations");
  if (result.notReady || result.missing) {
    return false;
  }
  locationCatalog = result.data.locations;
  locationGroups = result.data.groups;
  return true;
}

async function loadSettingsIfNeeded() {
  if (seedSettings !== null) {
    return true;
  }
  const result = await fetchFromApi("/settings");
  if (result.notReady) {
    return false;
  }
  if (result.missing) {
    seedSettings = {};
    return true;
  }
  seedSettings = result.data.settings;
  return true;
}

async function checkForUpdates() {
  const addressWhenStarted = getApiAddress();
  try {
    const locationsAreLoaded = await loadLocationsIfNeeded();
    const settingsAreLoaded = locationsAreLoaded && await loadSettingsIfNeeded();
    if (!settingsAreLoaded) {
      showConnectionStatus("Game running, randomizer not ready", "waiting");
    } else {
      const result = await fetchFromApi("/state");
      if (addressWhenStarted !== getApiAddress()) {
        return;
      }
      if (result.notReady || result.missing) {
        showConnectionStatus("Game running, randomizer not ready", "waiting");
      } else {
        showConnectionStatus("Connected", "connected");
        await handleNewState(result.data);
      }
    }
  } catch (error) {
    showConnectionStatus("Can't reach the API (is the game running?)", "disconnected");
  } finally {
    setTimeout(checkForUpdates, trackerConfig.checkForUpdatesEveryMilliseconds);
  }
}

async function handleNewState(newState) {
  if (currentState !== null && newState.revision === currentState.revision && newState.seed === currentState.seed) {
    return;
  }
  if (currentState !== null && newState.seed !== currentState.seed) {
    seedSettings = null;
    itemCountsLastTime = null;
    foundLocationsLastTime = null;
    const settingsAreLoaded = await loadSettingsIfNeeded();
    if (!settingsAreLoaded) {
      return;
    }
  }
  previousState = currentState;
  currentState = newState;
  addChangeToLog();
  drawEverything();
}

function forgetEverything() {
  locationCatalog = null;
  locationGroups = [];
  seedSettings = null;
  currentState = null;
  itemCountsLastTime = null;
  foundLocationsLastTime = null;
}
