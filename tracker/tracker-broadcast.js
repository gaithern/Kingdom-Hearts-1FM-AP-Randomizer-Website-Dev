function setUpBroadcastView() {
  const page = document.documentElement;
  page.classList.add("broadcast");

  const background = urlParameters.get("bg") || "transparent";
  page.classList.add("background-" + background);

  const layout = urlParameters.get("layout");
  if (layout) {
    page.classList.add("layout-" + layout);
  }

  if (urlParameters.get("worlds") === "0") {
    page.classList.add("hide-worlds");
  }

  if (urlParameters.get("items") === "0") {
    page.classList.add("hide-items");
  }

  window.addEventListener("resize", scaleBroadcastToFitWindow);
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

function openBroadcastView() {
  const pageAddress = window.location.href.split("?")[0].split("#")[0];
  const broadcastAddress = pageAddress + "?broadcast&bg=dark&api=" + encodeURIComponent(getApiAddress());
  const windowSize = trackerConfig.broadcastWindowSize;
  window.open(broadcastAddress, "_blank", "width=" + windowSize.width + ",height=" + windowSize.height);
}
