const BASKET_KEY = 'basket_v1';
const DELIVERY_FEE = 2.5;

const CATALOG = [
  { key: 'dishes', title: 'Hauptgerichte', list: () => myDishes },
  { key: 'beilagen', title: 'Beilagen', list: () => myBeilages },
  { key: 'drinks', title: 'Getränke', list: () => myDrinks },
  { key: 'desserts', title: 'Desserts', list: () => myDesserts },
];

document.addEventListener('DOMContentLoaded', init);

function init() {
  normalizeLibrary();
  renderMenu();
  renderBasket();
}

function renderMenu() {
  const root = document.getElementById('menu-root');
  root.innerHTML = '';
  for (const cat of CATALOG) {
    const html = categorySectionHTML(cat.title, cat.key, cat.list());
    root.insertAdjacentHTML('beforeend', html);
  }
}

function loadBasket() {
  try { return JSON.parse(localStorage.getItem(BASKET_KEY)) ?? {}; }
  catch { return {}; }
}
function saveBasket(obj) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(obj));
}
function itemId(categoryKey, idx) { return `${categoryKey}:${idx}`; }
function itemFromCatalog(categoryKey, idx) {
  const cat = CATALOG.find(c => c.key === categoryKey);
  const list = cat?.list();
  return list?.[idx];
}

function addToBasket(categoryKey, idx) {
  const src = itemFromCatalog(categoryKey, idx);
  if (!src) return;
  const id = itemId(categoryKey, idx);

  const basket = loadBasket();
  const current = basket[id] || { id, name: src.name, price: asNumber(src.price), qty: 0 };
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

function renderBasket() {
  const root = document.getElementById('basket');
  const items = Object.values(loadBasket());
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const delivery = items.length ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  root.innerHTML = `
    <div class="basket">
      <h2>Warenkorb</h2>
      <div class="basket-list">${basketListHTML(items)}</div>
      ${basketSummaryHTML(subtotal, delivery, total)}
    </div>
  `;
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

let checkoutDialog, checkoutMsg, checkoutOkBtn;

document.addEventListener('DOMContentLoaded', () => {
  checkoutDialog = document.getElementById('checkoutDialog');
  checkoutMsg = document.getElementById('checkoutMessage');
  checkoutOkBtn = document.getElementById('checkoutOkBtn');


  checkoutOkBtn?.addEventListener('click', () => checkoutDialog.close());


  checkoutDialog?.addEventListener('click', (e) => {
    const r = checkoutDialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) checkoutDialog.close();
  });
});

function openCheckoutDialog(text) {
  if (window.HTMLDialogElement && checkoutDialog?.showModal) {
    if (text) checkoutMsg.textContent = text;
    checkoutDialog.showModal();
    checkoutOkBtn?.focus();
  } else {
    alert(text || 'Bezahlt! Danke für deine Bestellung, wir liefern bald! 🚚');
  }
}



function checkout() {
  const items = Object.values(loadBasket());
  if (!items.length) return;

  saveBasket({});
  renderBasket();

  openCheckoutDialog('Bezahlt! Danke für deine Bestellung, wir liefern bald! 🚚');
}
