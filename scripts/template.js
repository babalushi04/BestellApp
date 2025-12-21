
function getDishCardTemplate(cat, i, it) {
  var src = it.image ? it.image : './assets/pics/placeholder.jpg';
  var priceText = euro(asNumber(it.price));

  return `
  <article class="card" onclick="addToBasket('${cat}', ${i})">
    <img class="card__img"
         src="${src}" alt="${it.name}" loading="lazy"
         onerror="this.onerror=null;this.src='./assets/pics/placeholder.jpg'">
    <div class="card__header">
      <h3 class="card__title">${it.name}</h3>
      <div class="card__price">${priceText}</div>
    </div>
    <p class="card__desc">${it.description}</p>
    <div class="card__actions">
      <button class="btn"
              onclick="event.stopPropagation(); addToBasket('${cat}', ${i})">+</button>
    </div>
  </article>`;
}

function getBasketRowTemplate(it) {
  var qty  = it.qty;
  var sum  = euro(asNumber(it.price) * qty);

  return `
    <div class="basket-row">
      <div class="basket-name">${it.name}</div>

      <div class="basket-controls">
        <button class="btn btn--ghost" onclick="decItem('${it.id}')">−</button>
        <span class="basket-qty">${qty}</span>
        <button class="btn" onclick="incItem('${it.id}')">+</button>
      </div>

      <div class="basket-sum">${sum}</div>
      <button class="btn btn--ghost" title="Entfernen" onclick="removeItem('${it.id}')">x</button>
    </div>`;
}

function getBasketSummaryTemplate(s, d, t){
  return `
    <div class="basket-summary">
      <div><span>Zwischensumme</span><span>${euro(s)}</span></div>
      <div><span>Lieferung</span><span>${euro(d)}</span></div>
      <hr/>
      <div class="basket-total"><span>Gesamt</span><span>${euro(t)}</span></div>
      <button class="btn btn--primary" ${t ? '' : 'disabled'} onclick="checkout()">Zur Kasse</button>
    </div>`;
}
