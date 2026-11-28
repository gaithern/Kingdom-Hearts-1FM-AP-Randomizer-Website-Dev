const urlParameters = new URLSearchParams(window.location.search);
const isBroadcastView = urlParameters.has("broadcast");

let seedFiles = null;
let locationCatalog = null;
let locationGroups = [];
let seedSettings = null;
let rawStateText = null;
let currentState = null;
let itemCountsLastTime = null;
let foundItemKeysLastTime = null;
let connectionSession = 0;
let localPollingIsRunning = false;
