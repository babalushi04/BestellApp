function asNumber(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }
function euro(n) { return n.toFixed(2).replace('.', ',') + ' €'; }

// Eine Speise-Kachel
function dishCardHTML(categoryKey, idx, item) {
  const price = asNumber(item.price);
  return `
    <article class="card" onclick="addToBasket('${categoryKey}', ${idx})">
      <div class="card__header">
        <h3 class="card__title">${item.name}</h3>
        <div class="card__price">${euro(price)}</div>
      </div>
      <p class="card__desc">${item.description}</p>
      <div class="card__actions">
        <button class="btn" onclick="event.stopPropagation(); addToBasket('${categoryKey}', ${idx})">+</button>
      </div>
    </article>
  `;
}

// Kategorie-Abschnitt
function categorySectionHTML(title, categoryKey, list) {
  const items = list.map((it, i) => dishCardHTML(categoryKey, i, it)).join('');
  return `
    <section class="category">
      <h2 class="category__title">${title}</h2>
      <div class="grid">${items}</div>
    </section>
  `;
}

// Warenkorb-Zeile
function basketRowHTML(item) {
  return `
    <div class="basket-row">
      <div class="basket-name">${item.name}</div>
      <div class="basket-controls">
        <button class="btn btn--ghost" onclick="decItem('${item.id}')">−</button>
        <span class="basket-qty">${item.qty}</span>
        <button class="btn" onclick="incItem('${item.id}')">+</button>
      </div>
      <div class="basket-sum">${euro(item.price * item.qty)}</div>
      <button class="btn btn--ghost" title="Entfernen" onclick="removeItem('${item.id}')">x</button>
    </div>
  `;
}

function basketListHTML(items) {
  if (!items.length) return `<p>Dein Warenkorb ist leer.</p>`;
  return items.map(basketRowHTML).join('');
}

function basketSummaryHTML(subtotal, delivery, total) {
  return `
    <div class="basket-summary">
      <div><span>Zwischensumme</span><span>${euro(subtotal)}</span></div>
      <div><span>Lieferung</span><span>${euro(delivery)}</span></div>
      <hr/>
      <div class="basket-total"><span>Gesamt</span><span>${euro(total)}</span></div>
      <button class="btn btn--primary" ${total === 0 ? 'disabled' : ''}>Zur Kasse</button>
    </div>
  `;
}
function dishCardHTML(categoryKey, idx, item) {
  const price = asNumber(item.price);
  const src = item.image || './assets/pics/placeholder.jpg';   // Fallback EINHEITLICH in /pics
  return `
    <article class="card" onclick="addToBasket('${categoryKey}', ${idx})">
      <img class="card__img"
           src="${src}"
           alt="${item.name}"
           loading="lazy"
            onerror="this.onerror=null;this.src='./assets/pics/placeholder.jpg';"/> 

      <div class="card__header">
        <h3 class="card__title">${item.name}</h3>
        <div class="card__price">${euro(price)}</div>
      </div>

      <p class="card__desc">${item.description}</p>

      <div class="card__actions">
        <button class="btn"
                onclick="event.stopPropagation(); addToBasket('${categoryKey}', ${idx})">+</button>
      </div>
    </article>
  `;
}
