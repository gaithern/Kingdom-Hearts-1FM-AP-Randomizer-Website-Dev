const connectionFieldsStorageKey = "kh1TrackerConnection";
const connectionSources = ["local", "room"];
const clientGoalStatus = 30;
const progressionFlag = 1;

function getConnectionSource() {
  return document.getElementById("connection-source").value;
}

function loadSavedConnectionFields() {
  try {
    const savedText = localStorage.getItem(connectionFieldsStorageKey);
    if (savedText) {
      return JSON.parse(savedText);
    }
  } catch (error) {
    return {};
  }
  return {};
}

function saveConnectionFields() {
  const fields = {
    source: getConnectionSource(),
    roomAddress: getRoomAddress(),
    roomSlot: getRoomSlotName(),
  };
  try {
    localStorage.setItem(connectionFieldsStorageKey, JSON.stringify(fields));
  } catch (error) {
    return;
  }
}

function fillInConnectionFields() {
  const savedFields = loadSavedConnectionFields();
  let source = urlParameters.get("source") || savedFields.source || "local";
  if (!connectionSources.includes(source)) {
    source = "local";
  }
  document.getElementById("connection-source").value = source;
  document.getElementById("room-address").value = urlParameters.get("room") || savedFields.roomAddress || "";
  document.getElementById("room-slot").value = urlParameters.get("slot") || savedFields.roomSlot || "";
  document.getElementById("room-password").value = urlParameters.get("password") || "";
}

function showFieldsForConnectionSource() {
  const source = getConnectionSource();
  document.getElementById("api-address").hidden = source !== "local";
  document.getElementById("room-fields").hidden = source !== "room";
}

function handleConnectionSourceChanged() {
  stopRoomConnection();
  saveConnectionFields();
  showFieldsForConnectionSource();
  if (getConnectionSource() === "local") {
    startLocalPolling();
  } else {
    showConnectionStatus("Not connected", "disconnected");
  }
}

function startTheChosenConnection() {
  const source = getConnectionSource();
  if (source === "local") {
    startLocalPolling();
  } else if (source === "room") {
    if (getRoomAddress() !== "" && getRoomSlotName() !== "") {
      connectToRoom();
    }
  }
}

function setUpConnectionSource() {
  fillInConnectionFields();
  showFieldsForConnectionSource();
  document.getElementById("connection-source").addEventListener("change", handleConnectionSourceChanged);
  document.getElementById("room-connect-button").addEventListener("click", handleRoomConnectButtonClicked);
  startTheChosenConnection();
}
