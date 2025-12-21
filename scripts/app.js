var BASKET_KEY = 'basket_v1';
var DELIVERY_FEE = 2.5;

var CATALOG = [
  { key: 'dishes', title: 'Hauptgerichte', list: function () { return myDishes; } },
  { key: 'beilagen', title: 'Beilagen', list: function () { return myBeilages; } },
  { key: 'drinks', title: 'Getränke', list: function () { return myDrinks; } },
  { key: 'desserts', title: 'Desserts', list: function () { return myDesserts; } }
];

window.onload = init;

var checkoutDialog, checkoutMsg, checkoutOkBtn;

function init() {

  checkoutDialog = document.getElementById('checkoutDialog');
  checkoutMsg = document.getElementById('checkoutMessage');
  checkoutOkBtn = document.getElementById('checkoutOkBtn');

  if (checkoutOkBtn) {
    checkoutOkBtn.onclick = function () { checkoutDialog.close(); };
  }
  if (checkoutDialog) {
    checkoutDialog.addEventListener('click', function (e) {
      var r = checkoutDialog.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) checkoutDialog.close();
    });
  }

  normalizeLibrary();
  renderMenu();
  renderBasket();
}


function renderMenu() {
  var root = document.getElementById('menu-root');
  root.innerHTML = '';
  for (var i = 0; i < CATALOG.length; i++) {
    var cat = CATALOG[i];
    var html = categorySectionHTML(cat.title, cat.key, cat.list());
    root.insertAdjacentHTML('beforeend', html);
  }
}

function categorySectionHTML(title, categoryKey, list) {
  list = Array.isArray(list) ? list : [];
  var items = '';
  for (var i = 0; i < list.length; i++) {
    items += dishCardHTML(categoryKey, i, list[i]); 
  }
  return ''
    + '<section class="category" id="' + categoryKey + '">'
    + '<h2 class="category__title">' + title + '</h2>'
    + '<div class="grid">' + items + '</div>'
    + '</section>';
}


function dishCardHTML(cat, i, it) {
  return getDishCardTemplate(cat, i, it);
}


function loadBasket() {
  try {
    var txt = localStorage.getItem(BASKET_KEY);
    return txt ? JSON.parse(txt) : {};
  } catch (e) {
    return {};
  }
}
function saveBasket(obj) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(obj));
}

function itemId(categoryKey, idx) { return categoryKey + ':' + idx; }

function getListByKey(key) {
  for (var i = 0; i < CATALOG.length; i++) {
    if (CATALOG[i].key === key) return CATALOG[i].list();
  }
  return [];
}
function itemFromCatalog(categoryKey, idx) {
  var list = getListByKey(categoryKey);
  return list[idx];
}

function addToBasket(categoryKey, idx) {
  var src = itemFromCatalog(categoryKey, idx);
  if (!src) return;

  var id = itemId(categoryKey, idx);
  var basket = loadBasket();

  var current = basket[id];
  if (!current) {
    current = { id: id, name: src.name, price: asNumber(src.price), qty: 0 };
  }
  current.qty += 1;

  basket[id] = current;
  saveBasket(basket);
  renderBasket();
}

function incItem(id) {
  var basket = loadBasket();
  if (!basket[id]) return;
  basket[id].qty += 1;
  saveBasket(basket);
  renderBasket();
}
function decItem(id) {
  var basket = loadBasket();
  if (!basket[id]) return;
  basket[id].qty = Math.max(0, basket[id].qty - 1);
  if (basket[id].qty === 0) delete basket[id];
  saveBasket(basket);
  renderBasket();
}
function removeItem(id) {
  var basket = loadBasket();
  delete basket[id];
  saveBasket(basket);
  renderBasket();
}

function basketItemsArray() {
  var obj = loadBasket();
  var arr = [];
  for (var id in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, id)) {
      arr.push(obj[id]);
    }
  }
  return arr;
}
function renderBasket() {
  var root = document.getElementById('basket');
  var items = basketItemsArray();

  var subtotal = 0;
  for (var i = 0; i < items.length; i++) {
    subtotal += asNumber(items[i].price) * asNumber(items[i].qty);
  }
  var delivery = items.length ? DELIVERY_FEE : 0;
  var total = subtotal + delivery;

  root.innerHTML = ''
    + '<div class="basket">'
    + '<h2>Warenkorb</h2>'
    + '<div class="basket-list">' + basketListHTML(items) + '</div>'
    + basketSummaryHTML(subtotal, delivery, total)
    + '</div>';
}

function basketRowHTML(item) { return getBasketRowTemplate(item); }

function basketListHTML(items) {
  if (!items || !items.length) return '<p>Dein Warenkorb ist leer.</p>';
  var html = '';
  for (var i = 0; i < items.length; i++) { html += basketRowHTML(items[i]); }
  return html;
}
function basketSummaryHTML(s, d, t) {
  return getBasketSummaryTemplate(s, d, t);
}

function normalizeLibrary() {
  [myDishes, myBeilages, myDrinks, myDesserts].forEach(list => {
    list.forEach(it => {
      it.price = asNumber(it.price);
      it.amount = asNumber(it.amount);
      it.image = it.image || './assets/pics/placeholder.jpg';
    });
  });
}

function normalizeLibrary() {
  var lists = [myDishes, myBeilages, myDrinks, myDesserts];
  for (var li = 0; li < lists.length; li++) {
    var list = lists[li];
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      it.price = asNumber(it.price);
      it.amount = asNumber(it.amount);
      if (!it.image) it.image = './assets/pics/placeholder.jpg';
    }
  }
}

function openCheckoutDialog(text) {
  if (checkoutDialog && checkoutDialog.showModal) {
    if (text) checkoutMsg.textContent = text;
    checkoutDialog.showModal();
    if (checkoutOkBtn) checkoutOkBtn.focus();
  } else {
    alert(text || 'Bezahlt! Danke für deine Bestellung, wir liefern bald! 🚚');
  }
}
function checkout() {
  var items = basketItemsArray();
  if (!items.length) return;
  saveBasket({});
  renderBasket();
  openCheckoutDialog('Bezahlt! Danke für deine Bestellung, wir liefern bald! 🚚');
}

