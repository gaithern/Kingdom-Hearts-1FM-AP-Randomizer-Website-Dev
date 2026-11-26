function setUpBroadcastView() {
  document.documentElement.classList.add("broadcast");
  applyBroadcastBackground();
  window.addEventListener("resize", scaleBroadcastToFitWindow);
}

function applyBroadcastBackground() {
  if (isOptionTurnedOn("transparent_background")) {
    document.documentElement.classList.add("transparent-background");
  } else {
    document.documentElement.classList.remove("transparent-background");
  }
}

function scaleBroadcastToFitWindow() {
  if (!isBroadcastView) {
    return;
  }
  const main = document.getElementById("tracker");
  main.style.zoom = "1";
  const widthScale = window.innerWidth / main.offsetWidth;
  const heightScale = window.innerHeight / main.offsetHeight;
  const scale = Math.min(widthScale, heightScale);
  main.style.zoom = String(scale);
}

function makeBroadcastAddress() {
  const pageAddress = window.location.href.split("?")[0].split("#")[0];
  let broadcastAddress = pageAddress + "?broadcast";
  broadcastAddress += "&api=" + encodeURIComponent(getApiAddress());
  broadcastAddress += "&on=" + encodeURIComponent(getKeysOfChoicesTurnedOn().join(","));
  return broadcastAddress;
}

function showBroadcastButtonText(text) {
  const broadcastButton = document.getElementById("broadcast-view-button");
  broadcastButton.textContent = text;
  setTimeout(() => {
    broadcastButton.textContent = "Broadcast view";
  }, 2000);
}

async function copyBroadcastLink(broadcastAddress) {
  try {
    await navigator.clipboard.writeText(broadcastAddress);
    showBroadcastButtonText("Link copied!");
  } catch (error) {
    return;
  }
}

function openBroadcastView() {
  const broadcastAddress = makeBroadcastAddress();
  copyBroadcastLink(broadcastAddress);
  const windowSize = trackerConfig.broadcastWindowSize;
  window.open(broadcastAddress, "_blank", "width=" + windowSize.width + ",height=" + windowSize.height);
}
