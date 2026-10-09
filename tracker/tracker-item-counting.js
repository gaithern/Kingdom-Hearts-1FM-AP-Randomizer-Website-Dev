function getGroupOfLocation(locationId) {
  const location = locationCatalog[locationId];
  if (location) {
    return location.group;
  }
  return null;
}

function getWorldConfig(groupKey) {
  return trackerConfig.worlds[groupKey] || {};
}

function isSettingOn(settingName, settingIsOnWhenMissing) {
  const settingValue = seedSettings[settingName];
  if (settingValue === undefined) {
    return settingIsOnWhenMissing === true;
  }
  return settingValue === true;
}

function doesRuleApply(rule) {
  if (rule.onlyWhenSettingIs) {
    return Object.entries(rule.onlyWhenSettingIs).every(([settingName, value]) => seedSettings[settingName] === value);
  }
  return isSettingOn(rule.onlyWhenSettingIsOn, rule.settingIsOnWhenMissing);
}

function howManyYouHave(itemCounts, itemName) {
  return itemCounts[itemName] || 0;
}

function countItemsYouHave() {
  const itemCounts = {};
  const allItems = currentState.items.concat(currentState.starting_items);
  for (const item of allItems) {
    itemCounts[item.name] = howManyYouHave(itemCounts, item.name) + 1;
  }
  for (const rule of trackerConfig.itemsTheGameGivesYou) {
    const ruleApplies = doesRuleApply(rule);
    const howManyYouNeed = rule.howManyFromSetting ? seedSettings[rule.howManyFromSetting] : rule.howMany;
    const youHaveEnough = howManyYouHave(itemCounts, rule.whenYouHave) >= howManyYouNeed;
    if (ruleApplies && youHaveEnough) {
      for (const itemName of rule.youAlsoGet) {
        if (howManyYouHave(itemCounts, itemName) === 0) {
          itemCounts[itemName] = 1;
        }
      }
    }
  }
  return itemCounts;
}

function getCombinationIcon(trackedItem, ownedItemNames) {
  let combination = 0;
  trackedItem.countsItems.forEach((itemName, position) => {
    if (ownedItemNames.includes(itemName)) {
      combination += 2 ** position;
    }
  });
  return trackedItem.iconForEachCombination.replace("{combination}", combination);
}

function getIconForItem(itemName) {
  for (const row of trackerConfig.itemRows) {
    for (const trackedItem of row) {
      if (trackedItem.countsItems.includes(itemName)) {
        if (trackedItem.iconForEachCombination) {
          return getCombinationIcon(trackedItem, [itemName]);
        }
        return trackedItem.icon;
      }
    }
  }
  for (const worldConfig of Object.values(trackerConfig.worlds)) {
    if (worldConfig.unlockedByItem === itemName) {
      return worldConfig.icon;
    }
  }
  return null;
}

function countItemsFromSource(source) {
  let count = 0;
  for (const item of currentState.items) {
    if (item.source === source) {
      count += 1;
    }
  }
  return count;
}
