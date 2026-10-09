function drawEverything() {
  const itemCounts = countItemsYouHave();
  drawWorlds(itemCounts);
  drawItemGrid(itemCounts);
  drawSeedDetails();
  drawSettings();
  document.getElementById("raw-state").textContent = JSON.stringify(currentState, null, 1);
  itemCountsLastTime = itemCounts;
  scaleBroadcastToFitWindow();
}

function startTracker() {
  const apiAddressBox = document.getElementById("api-address");
  apiAddressBox.value = urlParameters.get("api") || trackerConfig.defaultApiAddress;
  apiAddressBox.addEventListener("change", forgetEverything);

  document.getElementById("broadcast-view-button").addEventListener("click", openBroadcastView);

  if (isBroadcastView) {
    setUpBroadcastView();
  }

  checkForUpdates();
}

startTracker();
