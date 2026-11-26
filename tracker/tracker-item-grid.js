function makeRow(trackedItems) {
  return { pieces: [trackedItems], itemCount: trackedItems.length };
}

function placeGroupTooBigForOneRow(rows, trackedItems) {
  const mostItemsInARow = trackerConfig.mostItemsInARow;
  let itemsLeftToPlace = trackedItems;
  while (itemsLeftToPlace.length > mostItemsInARow) {
    rows.push(makeRow(itemsLeftToPlace.slice(0, mostItemsInARow)));
    itemsLeftToPlace = itemsLeftToPlace.slice(mostItemsInARow);
  }
  rows.push(makeRow(itemsLeftToPlace));
}

function placeGroupAfterThePreviousOne(rows, trackedItems) {
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    const roomLeftInLastRow = trackerConfig.mostItemsInARow - lastRow.itemCount;
    if (trackedItems.length <= roomLeftInLastRow) {
      lastRow.pieces.push(trackedItems);
      lastRow.itemCount += trackedItems.length;
      return;
    }
  }
  rows.push(makeRow(trackedItems));
}

function placeItemGroupsIntoRows(itemGroups) {
  const rows = [];
  for (const itemGroup of itemGroups) {
    if (itemGroup.items.length > trackerConfig.mostItemsInARow) {
      placeGroupTooBigForOneRow(rows, itemGroup.items);
    } else {
      placeGroupAfterThePreviousOne(rows, itemGroup.items);
    }
  }
  return rows;
}

function drawItemGrid(itemCounts) {
  const rows = placeItemGroupsIntoRows(getItemGroupsTurnedOn());
  let html = "";
  for (const row of rows) {
    html += '<div class="item-row">';
    for (const trackedItems of row.pieces) {
      html += '<span class="item-group">';
      for (const trackedItem of trackedItems) {
        html += makeTrackedItemHtml(trackedItem, itemCounts);
      }
      html += "</span>";
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
  let youHaveTheCornerItem = false;
  if (isCornerIconTurnedOn(trackedItem)) {
    youHaveTheCornerItem = howManyYouHave(itemCounts, trackedItem.cornerIconItem) > 0;
    if (itemCountsLastTime !== null && howManyYouHave(itemCounts, trackedItem.cornerIconItem) > howManyYouHave(itemCountsLastTime, trackedItem.cornerIconItem)) {
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

  const ownedItemNames = trackedItem.countsItems.filter(itemName => howManyYouHave(itemCounts, itemName) > 0);
  const icon = getTrackedItemIcon(trackedItem, ownedItemNames);

  let html = '<span class="item-cell"><span class="' + classes + '">';
  html += makeImageHtml(icon, trackedItem.label);
  if (youHaveTheCornerItem) {
    html += makeCornerIconHtml(trackedItem.cornerIcon, trackedItem.cornerIconItem);
  }
  if (count > 1 && !trackedItem.iconForEachCombination) {
    html += '<span class="item-count gummi-font">' + count + "</span>";
  }
  html += "</span></span>";
  return html;
}
