let roomSocket = null;
let roomReconnectTimer = null;
let roomConnectionIsOn = false;
let catalogs = null;
let roomData = null;

function makeEmptyRoomData() {
  return {
    slot: null,
    team: null,
    slotName: "",
    slotData: null,
    checkedLocations: new Set(),
    receivedItems: [],
    victory: false,
  };
}

function getRoomAddress() {
  return document.getElementById("room-address").value.trim();
}

function getRoomSlotName() {
  return document.getElementById("room-slot").value.trim();
}

function getRoomPassword() {
  return document.getElementById("room-password").value;
}

function updateRoomConnectButton() {
  const connectButton = document.getElementById("room-connect-button");
  if (roomConnectionIsOn) {
    connectButton.textContent = "Disconnect";
  } else {
    connectButton.textContent = "Connect";
  }
}

function makeRoomAddressesToTry(address) {
  if (address.startsWith("ws://") || address.startsWith("wss://")) {
    return [address];
  }
  return ["wss://" + address, "ws://" + address];
}

async function loadCatalogsIfNeeded() {
  if (catalogs !== null) {
    return;
  }
  const catalogFiles = trackerConfig.catalogFiles;
  const locationsResponse = await fetch(catalogFiles.locations);
  const itemsResponse = await fetch(catalogFiles.items);
  if (!locationsResponse.ok || !itemsResponse.ok) {
    throw new Error("Couldn't load the location and item catalogs");
  }
  const locations = await locationsResponse.json();
  const items = await itemsResponse.json();
  catalogs = { locations: locations, items: items };
}

function handleRoomConnectButtonClicked() {
  if (roomConnectionIsOn) {
    stopRoomConnection();
    showConnectionStatus("Not connected", "disconnected");
  } else {
    connectToRoom();
  }
}

function connectToRoom() {
  stopRoomConnection();
  saveConnectionFields();
  if (getRoomAddress() === "" || getRoomSlotName() === "") {
    showConnectionStatus("Enter room and slot", "disconnected");
    return;
  }
  roomConnectionIsOn = true;
  updateRoomConnectButton();
  startRoomSocket();
}

function stopRoomConnection() {
  roomConnectionIsOn = false;
  updateRoomConnectButton();
  if (roomReconnectTimer !== null) {
    clearTimeout(roomReconnectTimer);
    roomReconnectTimer = null;
  }
  const socketToClose = roomSocket;
  roomSocket = null;
  roomData = null;
  forgetEverything();
  if (socketToClose !== null) {
    socketToClose.close();
  }
}

async function startRoomSocket() {
  roomReconnectTimer = null;
  forgetEverything();
  const session = connectionSession;
  roomData = makeEmptyRoomData();
  roomData.slotName = getRoomSlotName();
  showConnectionStatus("Connecting", "waiting");
  try {
    await loadCatalogsIfNeeded();
  } catch (error) {
    if (session === connectionSession) {
      stopRoomConnection();
      showConnectionStatus("Catalogs missing", "disconnected");
    }
    return;
  }
  if (session !== connectionSession) {
    return;
  }
  openRoomSocket(makeRoomAddressesToTry(getRoomAddress()), session);
}

function openRoomSocket(addressesToTry, session) {
  const address = addressesToTry[0];
  const addressesLeft = addressesToTry.slice(1);
  let socket = null;
  try {
    socket = new WebSocket(address);
  } catch (error) {
    handleRoomSocketFailed(addressesLeft, session, false);
    return;
  }
  roomSocket = socket;
  let socketOpened = false;
  socket.addEventListener("open", () => {
    socketOpened = true;
  });
  socket.addEventListener("message", event => {
    handleRoomMessage(event.data, session);
  });
  socket.addEventListener("close", () => {
    if (session === connectionSession) {
      roomSocket = null;
      handleRoomSocketFailed(addressesLeft, session, socketOpened);
    }
  });
}

function handleRoomSocketFailed(addressesLeft, session, socketHadOpened) {
  if (!socketHadOpened && addressesLeft.length > 0) {
    openRoomSocket(addressesLeft, session);
    return;
  }
  if (socketHadOpened) {
    showConnectionStatus("Reconnecting", "waiting");
  } else {
    showConnectionStatus("Can't reach room", "disconnected");
  }
  roomReconnectTimer = setTimeout(startRoomSocket, trackerConfig.roomReconnectAfterMilliseconds);
}

function sendToRoom(packets) {
  if (roomSocket !== null && roomSocket.readyState === WebSocket.OPEN) {
    roomSocket.send(JSON.stringify(packets));
  }
}

function handleRoomMessage(messageText, session) {
  const packets = JSON.parse(messageText);
  for (const packet of packets) {
    if (session !== connectionSession) {
      return;
    }
    handleRoomPacket(packet);
  }
}

function handleRoomPacket(packet) {
  if (packet.cmd === "RoomInfo") {
    sendConnectPacket();
  } else if (packet.cmd === "ConnectionRefused") {
    handleConnectionRefused(packet);
  } else if (packet.cmd === "Connected") {
    handleConnected(packet);
  } else if (packet.cmd === "LocationInfo") {
    handleLocationInfo(packet);
  } else if (packet.cmd === "ReceivedItems") {
    handleReceivedItems(packet);
  } else if (packet.cmd === "RoomUpdate") {
    handleRoomUpdate(packet);
  } else if (packet.cmd === "Retrieved") {
    handleRetrieved(packet);
  } else if (packet.cmd === "SetReply") {
    handleSetReply(packet);
  }
}

function makeTrackerUuid() {
  return "kh1-tracker-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function sendConnectPacket() {
  sendToRoom([{
    cmd: "Connect",
    password: getRoomPassword(),
    game: trackerConfig.roomGameName,
    name: roomData.slotName,
    uuid: makeTrackerUuid(),
    version: trackerConfig.archipelagoVersion,
    items_handling: trackerConfig.roomItemsHandling,
    tags: ["Tracker"],
    slot_data: true,
  }]);
}

function getRefusalMessage(packet) {
  const errors = packet.errors || [];
  for (const error of errors) {
    const message = trackerConfig.roomRefusalMessages[error];
    if (message) {
      return message;
    }
  }
  return "Room refused";
}

function handleConnectionRefused(packet) {
  const message = getRefusalMessage(packet);
  stopRoomConnection();
  showConnectionStatus(message, "disconnected");
}

function getClientStatusKey() {
  return "_read_client_status_" + roomData.team + "_" + roomData.slot;
}

function handleConnected(packet) {
  roomData.slot = packet.slot;
  roomData.team = packet.team;
  roomData.slotData = packet.slot_data || {};
  const slotInfo = packet.slot_info ? packet.slot_info[String(packet.slot)] : null;
  if (slotInfo && slotInfo.name) {
    roomData.slotName = slotInfo.name;
  }
  roomData.checkedLocations = new Set(packet.checked_locations);
  const allLocations = packet.checked_locations.concat(packet.missing_locations);
  showConnectionStatus("Loading seed", "waiting");
  sendToRoom([
    { cmd: "LocationScouts", locations: allLocations, create_as_hint: 0 },
    { cmd: "Get", keys: [getClientStatusKey()] },
    { cmd: "SetNotify", keys: [getClientStatusKey()] },
  ]);
}

function handleLocationInfo(packet) {
  if (seedFiles !== null) {
    return;
  }
  const itemLocationMap = {};
  const progressionLocations = [];
  for (const networkItem of packet.locations) {
    if (networkItem.player === roomData.slot) {
      itemLocationMap[networkItem.location] = networkItem.item;
    } else {
      itemLocationMap[networkItem.location] = trackerConfig.apItemPlaceholder;
    }
    if ((networkItem.flags & progressionFlag) !== 0) {
      progressionLocations.push(networkItem.location);
    }
  }
  progressionLocations.sort((first, second) => first - second);

  const settings = Object.assign({}, roomData.slotData);
  settings.slot_name = roomData.slotName;

  useSeedFiles({
    settings: settings,
    locations: catalogs.locations,
    items: catalogs.items,
    item_location_map: itemLocationMap,
    progression_locations: progressionLocations,
  });
  drawRoomState();
}

function handleReceivedItems(packet) {
  if (packet.index === 0) {
    roomData.receivedItems = [];
  }
  if (packet.index !== roomData.receivedItems.length) {
    sendToRoom([{ cmd: "Sync" }]);
    return;
  }
  for (const networkItem of packet.items) {
    roomData.receivedItems.push({
      item: networkItem.item,
      location: networkItem.location,
      player: networkItem.player,
      flags: networkItem.flags,
      index: roomData.receivedItems.length,
    });
  }
  drawRoomState();
}

function handleRoomUpdate(packet) {
  if (!packet.checked_locations) {
    return;
  }
  for (const locationId of packet.checked_locations) {
    roomData.checkedLocations.add(locationId);
  }
  drawRoomState();
}

function updateVictory(clientStatus) {
  roomData.victory = clientStatus === clientGoalStatus;
  drawRoomState();
}

function handleRetrieved(packet) {
  const statusKey = getClientStatusKey();
  if (packet.keys && packet.keys[statusKey] !== undefined) {
    updateVictory(packet.keys[statusKey]);
  }
}

function handleSetReply(packet) {
  if (packet.key === getClientStatusKey()) {
    updateVictory(packet.value);
  }
}

function getItemsNotFoundInYourOwnGame(receivedItems, slot) {
  const remoteLocations = new Set(seedSettings.remote_location_ids || []);
  const items = [];
  for (const record of receivedItems) {
    const youFoundItInYourOwnGame = record.player === slot && !remoteLocations.has(record.location);
    if (!youFoundItInYourOwnGame) {
      items.push(record);
    }
  }
  return items;
}

function makeRoomRawState() {
  return {
    connected: true,
    player: roomData.slot,
    world: null,
    in_gummi: false,
    victory: roomData.victory,
    checked_locations: Array.from(roomData.checkedLocations),
    server_checked_locations: [],
    items: getItemsNotFoundInYourOwnGame(roomData.receivedItems, roomData.slot),
  };
}

function drawRoomState() {
  if (seedFiles === null) {
    return;
  }
  showConnectionStatus("Connected", "connected");
  const rawState = makeRoomRawState();
  handleNewState(JSON.stringify(rawState), rawState);
}
