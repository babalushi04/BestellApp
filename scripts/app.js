const BASKET_KEY = 'basket_v1';
const DELIVERY_FEE = 2.5;

const CATALOG = [
  { key: 'dishes', title: 'Hauptgerichte', list: function () { return myDishes; } },
  { key: 'beilagen', title: 'Beilagen', list: function () { return myBeilages; } },
  { key: 'drinks', title: 'Getränke', list: function () { return myDrinks; } },
  { key: 'desserts', title: 'Desserts', list: function () { return myDesserts; } }
];

window.onload = init;

let checkoutDialog, checkoutMsg, checkoutOkBtn;

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
  const root = document.getElementById('menu-root');
  root.innerHTML = '';
  for (let i = 0; i < CATALOG.length; i++) {
    const cat = CATALOG[i];
    const html = categorySectionHTML(cat.title, cat.key, cat.list());
    root.insertAdjacentHTML('beforeend', html);
  }
}

function categorySectionHTML(title, categoryKey, list) {
  const safeList = Array.isArray(list) ? list : [];
  let items = '';

  for (let i = 0; i < safeList.length; i++) {
    items += dishCardHTML(categoryKey, i, safeList[i]);
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
    const txt = localStorage.getItem(BASKET_KEY);
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
  for (let i = 0; i < CATALOG.length; i++) {
    const cat = CATALOG[i];
    if (cat.key === key) return cat.list();
  }
  return [];
}

function itemFromCatalog(categoryKey, idx) {
  const list = getListByKey(categoryKey);
  return list[idx];
}

function addToBasket(categoryKey, idx) {
  const src = itemFromCatalog(categoryKey, idx);
  if (!src) return;

  const id = itemId(categoryKey, idx);
  const basket = loadBasket();

  let current = basket[id];
  if (!current) {
    current = { id: id, name: src.name, price: asNumber(src.price), qty: 0 };
  }
  current.qty += 1;

  basket[id] = current;
  saveBasket(basket);
  renderBasket();
}

function incItem(id) {
  const basket = loadBasket();
  if (!basket[id]) return;

  basket[id].qty += 1;
  saveBasket(basket);
  renderBasket();
}

function decItem(id) {
  const basket = loadBasket();
  if (!basket[id]) return;
  basket[id].qty = Math.max(0, basket[id].qty - 1);
  if (basket[id].qty === 0) delete basket[id];
  saveBasket(basket);
  renderBasket();
}

function removeItem(id) {
  const basket = loadBasket();
  delete basket[id];
  saveBasket(basket);
  renderBasket();
}

function basketItemsArray() {
  const obj = loadBasket();
  const arr = [];
  for (const id in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, id)) {
      arr.push(obj[id]);
    }
  }
  return arr;
}

function calcSubtotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += asNumber(items[i].price) * asNumber(items[i].qty);
  }
  return sum;
}

function renderBasket() {
  const root = document.getElementById('basket');
  const items = basketItemsArray();

  const subtotal = calcSubtotal(items);
  const delivery = items.length ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  root.innerHTML = ''
    + '<div class="basket">'
    + '  <div class="basket-head">'
    + '    <h2>Warenkorb</h2>'
    + '    <button type="button" class="basket-close" aria-label="Warenkorb schließen" onclick="closeBasket()">×</button>'
    + '  </div>'
    + '  <div class="basket-list">' + basketListHTML(items) + '</div>'
    + basketSummaryHTML(subtotal, delivery, total)
    + '</div>';

  updateBasketFabCount();
}

function basketRowHTML(item) { return getBasketRowTemplate(item); }

function basketListHTML(items) {
  if (!items || !items.length) return '<p>Dein Warenkorb ist leer.</p>';
  let html = '';
  for (let i = 0; i < items.length; i++) html += basketRowHTML(items[i]);
  return html;
}

function basketSummaryHTML(s, d, t) {
  return getBasketSummaryTemplate(s, d, t);
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
  const items = basketItemsArray();
  if (!items.length) return;
  saveBasket({});
  renderBasket();
  openCheckoutDialog('Bezahlt! Danke für deine Bestellung, wir liefern bald! 🚚');
}

function getBasketCount() {
  const obj = loadBasket();
  let count = 0;

  for (const id in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, id)) {
      count += parseFloat(obj[id].qty) || 0;
    }
  }
  return count;
}

function updateBasketFabCount() {
   const btn = document.getElementById('basketFab');
  if (!btn) return;
  const c = getBasketCount();
  btn.textContent = 'Warenkorb (' + c + ')';
}

function setBasketOpen(isOpen) {
  const basketElement = document.getElementById('basket');
  const backdropElement = document.getElementById('basketBackdrop');

  if (!basketElement || !backdropElement) return;

  if (isOpen) {
    basketElement.classList.add('basket--open');
    backdropElement.classList.add('is-open');
  } else {
    basketElement.classList.remove('basket--open');
    backdropElement.classList.remove('is-open');
  }
}

function openBasket() {
  setBasketOpen(true);
}

function closeBasket() {
  setBasketOpen(false);
}

function toggleBasket() {
  const basketElement = document.getElementById('basket');
  const isOpen = basketElement && basketElement.classList.contains('basket--open');
  setBasketOpen(!isOpen);
}


