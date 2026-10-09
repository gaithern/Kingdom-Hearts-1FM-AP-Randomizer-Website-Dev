const urlParameters = new URLSearchParams(window.location.search);
const isBroadcastView = urlParameters.has("broadcast");

let locationCatalog = null;
let locationGroups = [];
let seedSettings = null;
let currentState = null;
let previousState = null;
let itemCountsLastTime = null;
let foundLocationsLastTime = null;
