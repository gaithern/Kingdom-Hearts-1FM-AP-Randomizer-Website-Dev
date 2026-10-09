function drawEverything() {
  const itemCounts = countItemsYouHave();
  drawWorlds(itemCounts);
  drawItemGrid(itemCounts);
  drawSeedDetails();
  drawSettings();
  drawDebugStats();
  drawWarnings();
  document.getElementById("raw-state").textContent = JSON.stringify(currentState, null, 1);
  itemCountsLastTime = itemCounts;
  scaleBroadcastToFitWindow();
}

function saveSnapshot() {
  if (currentState === null) {
    return;
  }
  const snapshotText = JSON.stringify(currentState, null, 1);
  const snapshotFile = new Blob([snapshotText], { type: "application/json" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(snapshotFile);
  downloadLink.download = "kh1-state-r" + currentState.revision + ".json";
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
}

function toggleTheme() {
  document.documentElement.classList.toggle("light-theme");
}

function startTracker() {
  const apiAddressBox = document.getElementById("api-address");
  apiAddressBox.value = urlParameters.get("api") || trackerConfig.defaultApiAddress;
  apiAddressBox.addEventListener("change", forgetEverything);

  document.getElementById("reload-locations-button").addEventListener("click", forgetEverything);
  document.getElementById("save-snapshot-button").addEventListener("click", saveSnapshot);
  document.getElementById("theme-button").addEventListener("click", toggleTheme);
  document.getElementById("broadcast-view-button").addEventListener("click", openBroadcastView);
  document.getElementById("warning-list").innerHTML = "<li>None</li>";

  if (isBroadcastView) {
    setUpBroadcastView();
  }

  checkForUpdates();
}

startTracker();
