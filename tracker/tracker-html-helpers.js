function escapeHtml(text) {
  let safeText = String(text);
  safeText = safeText.replaceAll("&", "&amp;");
  safeText = safeText.replaceAll("<", "&lt;");
  safeText = safeText.replaceAll(">", "&gt;");
  safeText = safeText.replaceAll('"', "&quot;");
  return safeText;
}

function makeImageHtml(iconPath, hoverText) {
  return '<img src="' + escapeHtml(encodeURI(iconPath)) + '" alt="' + escapeHtml(hoverText) + '" title="' + escapeHtml(hoverText) + '">';
}

function makeTableRowHtml(name, value) {
  return "<tr><td>" + escapeHtml(name) + "</td><td>" + escapeHtml(value) + "</td></tr>";
}
