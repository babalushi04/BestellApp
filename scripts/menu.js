const BASKET_KEY = 'basket_v1';

// Katalog-Konfiguration
const CATALOG = [
  { key:'dishes',   title:'Hauptgerichte', data: () => myDishes },
  { key:'beilagen', title:'Beilagen',      data: () => myBeilages },
  { key:'drinks',   title:'Getränke',      data: () => myDrinks },
  { key:'desserts', title:'Desserts',      data: () => myDesserts }
];

document.addEventListener('DOMContentLoaded', initMenu);

function initMenu(){
  normalizeLibrary();
  renderMenu();
}

function renderMenu(){
  const root = document.getElementById('menu-root');
  root.innerHTML = '';
  for(const cat of CATALOG){
    const list = cat.data();
    const html = categorySectionHTML(cat.title, cat.key, list);
    root.insertAdjacentHTML('beforeend', html);
  }
}

function normalizeLibrary(){
  // Stelle sicher: price=Number, amount=Number
  const lists = [myDishes, myBeilages, myDrinks, myDesserts];
  for(const list of lists){
    list.forEach(it => {
      it.price = asNumber(it.price);
      it.amount = asNumber(it.amount);
    });
  }
}

// ---- Warenkorb (shared with basket.js) ----
function loadBasket(){
  try { return JSON.parse(localStorage.getItem(BASKET_KEY)) ?? {}; }
  catch { return {}; }
}
function saveBasket(obj){
  localStorage.setItem(BASKET_KEY, JSON.stringify(obj));
}
function itemId(categoryKey, idx){
  return `${categoryKey}:${idx}`;
}

function addToBasket(categoryKey, idx){
  const cat = CATALOG.find(c => c.key === categoryKey);
  if(!cat) return;
  const list = cat.data();
  const src = list[idx];
  if(!src) return;

  const id = itemId(categoryKey, idx);
  const basket = loadBasket();
  const existing = basket[id] || { id, name: src.name, price: asNumber(src.price), qty: 0 };
  existing.qty += 1;
  basket[id] = existing;
  saveBasket(basket);
  // optional: kleines Feedback
  console.log(`+1 ${existing.name} (jetzt ${existing.qty})`);
}
