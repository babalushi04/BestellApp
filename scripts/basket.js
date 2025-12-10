const BASKET_KEY = 'basket_v1';
const DELIVERY_FEE = 2.5;

document.addEventListener('DOMContentLoaded', initBasket);

function initBasket(){
  renderBasket();
}

function loadBasket(){
  try { return JSON.parse(localStorage.getItem(BASKET_KEY)) ?? {}; }
  catch { return {}; }
}
function saveBasket(obj){
  localStorage.setItem(BASKET_KEY, JSON.stringify(obj));
}

function basketItems(){
  const obj = loadBasket();
  return Object.values(obj); // [{id,name,price,qty}, ...]
}

function renderBasket(){
  const list = basketItems().filter(it => it.qty > 0);
  const root = document.getElementById('basket-root');
  const sumRoot = document.getElementById('basket-summary');
  root.innerHTML = basketListHTML(list);

  const subtotal = list.reduce((acc,it)=> acc + it.price*it.qty, 0);
  const delivery = list.length ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;
  sumRoot.innerHTML = basketSummaryHTML(subtotal, delivery, total);
}

function incItem(id){
  const basket = loadBasket();
  if(!basket[id]) return;
  basket[id].qty += 1;
  saveBasket(basket);
  renderBasket();
}
function decItem(id){
  const basket = loadBasket();
  if(!basket[id]) return;
  basket[id].qty = Math.max(0, basket[id].qty - 1);
  if (basket[id].qty === 0) delete basket[id];
  saveBasket(basket);
  renderBasket();
}
function removeItem(id){
  const basket = loadBasket();
  delete basket[id];
  saveBasket(basket);
  renderBasket();
}
