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

async function loadSeedFilesFromApi() {
  const required = ["settings", "locations", "items"];
  const optional = ["item_location_map", "progression_locations"];
  const files = {};
  for (const name of required.concat(optional)) {
    const result = await fetchFromApi("/" + name);
    if (result.missing && required.includes(name)) {
      return null;
    }
    files[name] = result.missing ? null : result.data;
  }
  return files;
}

function useSeedFiles(files) {
  seedFiles = files;
  seedSettings = files.settings;
  buildLocationCatalog();
  drawTrackerOptions();
}

async function checkLocalApi(sessionWhenStarted) {
  if (seedFiles === null) {
    const files = await loadSeedFilesFromApi();
    if (sessionWhenStarted !== connectionSession) {
      return;
    }
    if (files === null) {
      showConnectionStatus("Game running", "waiting");
      return;
    }
    useSeedFiles(files);
  }
  const result = await fetchFromApi("/state");
  if (sessionWhenStarted !== connectionSession) {
    return;
  }
  if (result.missing) {
    showConnectionStatus("Game running", "waiting");
  } else {
    showConnectionStatus("Connected", "connected");
    handleNewState(result.text, result.data);
  }
}

function startLocalPolling() {
  if (!localPollingIsRunning) {
    localPollingIsRunning = true;
    checkForUpdates();
  }
}

async function checkForUpdates() {
  if (getConnectionSource() !== "local") {
    localPollingIsRunning = false;
    return;
  }
  const sessionWhenStarted = connectionSession;
  try {
    await checkLocalApi(sessionWhenStarted);
  } catch (error) {
    if (sessionWhenStarted === connectionSession) {
      showConnectionStatus("Can't reach the API", "disconnected");
      forgetEverything();
    }
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
  connectionSession += 1;
  const aSeedWasLoaded = seedSettings !== null;
  seedFiles = null;
  locationCatalog = null;
  locationGroups = [];
  seedSettings = null;
  rawStateText = null;
  currentState = null;
  itemCountsLastTime = null;
  foundItemKeysLastTime = null;
  if (aSeedWasLoaded) {
    drawTrackerOptions();
  }
}
