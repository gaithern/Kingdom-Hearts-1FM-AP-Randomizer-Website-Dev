const trackerChoicesStorageKey = "kh1TrackerChoices";

let trackerChoices = loadStartingChoices();

function getAllChoices() {
  return trackerConfig.importantCheckOptions.concat(trackerConfig.itemGroups, trackerConfig.cornerIconOptions, trackerConfig.broadcastOptions);
}

function getKeysOfChoicesTurnedOn() {
  const keys = [];
  for (const choice of getAllChoices()) {
    if (isChoiceTurnedOn(choice)) {
      keys.push(choice.key);
    }
  }
  return keys;
}

function makeChoicesFromKeysTurnedOn(keysTurnedOnText) {
  const keysTurnedOn = keysTurnedOnText.split(",");
  const choices = {};
  for (const choice of getAllChoices()) {
    choices[choice.key] = keysTurnedOn.includes(choice.key);
  }
  return choices;
}

function loadStartingChoices() {
  if (urlParameters.has("on")) {
    return makeChoicesFromKeysTurnedOn(urlParameters.get("on"));
  }
  return loadTrackerChoices();
}

function loadTrackerChoices() {
  try {
    const savedText = localStorage.getItem(trackerChoicesStorageKey);
    if (savedText) {
      return JSON.parse(savedText);
    }
  } catch (error) {
    return {};
  }
  return {};
}

function saveTrackerChoices() {
  try {
    localStorage.setItem(trackerChoicesStorageKey, JSON.stringify(trackerChoices));
  } catch (error) {
    return;
  }
}

function isChoiceUnavailable(choice) {
  if (!choice.unavailableWhenSettingIs || seedSettings === null) {
    return false;
  }
  for (const [settingName, settingValue] of Object.entries(choice.unavailableWhenSettingIs)) {
    if (seedSettings[settingName] === settingValue) {
      return true;
    }
  }
  return false;
}

function isChoiceTurnedOn(choice) {
  if (isChoiceUnavailable(choice)) {
    return false;
  }
  const savedChoice = trackerChoices[choice.key];
  if (savedChoice === undefined) {
    return choice.isOnByDefault;
  }
  return savedChoice;
}

function getItemGroupsTurnedOn() {
  return trackerConfig.itemGroups.filter(itemGroup => isChoiceTurnedOn(itemGroup));
}

function isOptionTurnedOn(optionKey) {
  for (const choice of getAllChoices()) {
    if (choice.key === optionKey) {
      return isChoiceTurnedOn(choice);
    }
  }
  return false;
}

function makeCheckboxHtml(choice) {
  let checkedText = "";
  if (isChoiceTurnedOn(choice)) {
    checkedText = " checked";
  }
  const isUnavailable = isChoiceUnavailable(choice);
  let labelClasses = "tracker-option";
  let disabledText = "";
  if (isUnavailable) {
    labelClasses += " unavailable";
    disabledText = " disabled";
  }
  let html = '<label class="' + labelClasses + '">';
  html += '<input type="checkbox" data-choice-key="' + escapeHtml(choice.key) + '"' + checkedText + disabledText + ">";
  html += escapeHtml(choice.name);
  html += "</label>";
  if (isUnavailable) {
    html += '<div class="tracker-option-note">' + escapeHtml(choice.unavailableNote) + "</div>";
  }
  return html;
}

function drawTrackerOptions() {
  let importantCheckOptionsHtml = "";
  for (const option of trackerConfig.importantCheckOptions) {
    importantCheckOptionsHtml += makeCheckboxHtml(option);
  }
  document.getElementById("important-check-options").innerHTML = importantCheckOptionsHtml;

  let itemGroupTogglesHtml = "";
  for (const itemGroup of trackerConfig.itemGroups) {
    itemGroupTogglesHtml += makeCheckboxHtml(itemGroup);
  }
  for (const cornerIconOption of trackerConfig.cornerIconOptions) {
    itemGroupTogglesHtml += makeCheckboxHtml(cornerIconOption);
  }
  document.getElementById("item-group-toggles").innerHTML = itemGroupTogglesHtml;

  let broadcastOptionsHtml = "";
  for (const broadcastOption of trackerConfig.broadcastOptions) {
    broadcastOptionsHtml += makeCheckboxHtml(broadcastOption);
  }
  document.getElementById("broadcast-options").innerHTML = broadcastOptionsHtml;
}

function redrawIfConnected() {
  if (currentState !== null) {
    drawEverything();
  }
}

function handleTrackerOptionClicked(event) {
  const checkbox = event.target;
  const choiceKey = checkbox.dataset.choiceKey;
  if (!choiceKey) {
    return;
  }
  trackerChoices[choiceKey] = checkbox.checked;
  saveTrackerChoices();
  redrawIfConnected();
}

function handleTrackerChoicesChangedInAnotherWindow(event) {
  if (event.key !== trackerChoicesStorageKey) {
    return;
  }
  trackerChoices = loadTrackerChoices();
  drawTrackerOptions();
  redrawIfConnected();
  if (isBroadcastView) {
    applyBroadcastBackground();
    history.replaceState(null, "", makeBroadcastAddress());
  }
}

function setUpTrackerOptions() {
  drawTrackerOptions();
  document.getElementById("tracker-options").addEventListener("change", handleTrackerOptionClicked);
  window.addEventListener("storage", handleTrackerChoicesChangedInAnotherWindow);
}
