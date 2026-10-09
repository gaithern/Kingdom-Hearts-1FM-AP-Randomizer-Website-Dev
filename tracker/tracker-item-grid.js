function drawItemGrid(itemCounts) {
  let html = "";
  for (const row of trackerConfig.itemRows) {
    html += '<div class="item-row">';
    for (const trackedItem of row) {
      html += makeTrackedItemHtml(trackedItem, itemCounts);
    }
    html += "</div>";
  }
  document.getElementById("item-grid").innerHTML = html;
}

function makeTrackedItemHtml(trackedItem, itemCounts) {
  let count = 0;
  let countGrewSinceLastTime = false;
  for (const itemName of trackedItem.countsItems) {
    count += howManyYouHave(itemCounts, itemName);
    if (itemCountsLastTime !== null && howManyYouHave(itemCounts, itemName) > howManyYouHave(itemCountsLastTime, itemName)) {
      countGrewSinceLastTime = true;
    }
  }
  if (trackedItem.multiplyCountBySetting && seedSettings[trackedItem.multiplyCountBySetting]) {
    count = count * seedSettings[trackedItem.multiplyCountBySetting];
  }

  let classes = "item";
  if (count === 0) {
    classes += " not-owned";
  }
  if (countGrewSinceLastTime) {
    classes += " just-received";
  }

  let icon = trackedItem.icon;
  if (trackedItem.iconForEachCombination) {
    const ownedItemNames = trackedItem.countsItems.filter(itemName => howManyYouHave(itemCounts, itemName) > 0);
    icon = getCombinationIcon(trackedItem, ownedItemNames);
  }

  let html = '<span class="item-cell"><span class="' + classes + '">';
  html += makeImageHtml(icon, trackedItem.label);
  if (count > 1 && !trackedItem.iconForEachCombination) {
    html += '<span class="item-count gummi-font">' + count + "</span>";
  }
  html += "</span></span>";
  return html;
}
