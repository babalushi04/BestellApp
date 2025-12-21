function asNumber(x) {
  var n = parseFloat(x);
  return isNaN(n) ? 0 : n;
}

function euro(n) {
  return asNumber(n).toFixed(2).replace('.', ',') + ' €';
}

function dishCardHTML(cat, i, it) {
  return getDishCardTemplate(cat, i, it);
}

function categorySectionHTML(title, categoryKey, list) {
  list = Array.isArray(list) ? list : [];
  var items = '';
  for (var i = 0; i < list.length; i++) {
    items += dishCardHTML(categoryKey, i, list[i]);
  }
  return ''
    + '<section class="category">'
    + '<h2 class="category__title">' + title + '</h2>'
    + '<div class="grid">' + items + '</div>'
    + '</section>';
}

function basketRowHTML(item) {
  return getBasketRowTemplate(item);
}

function basketListHTML(items) {
  if (!items.length) return `<p>Dein Warenkorb ist leer.</p>`;
  return items.map(basketRowHTML).join('');
}

function basketSummaryHTML(subtotal, delivery, total) {
  return getBasketSummaryTemplate(subtotal, delivery, total);
}