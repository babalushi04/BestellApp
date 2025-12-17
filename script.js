let deliveryType = "delivery"; // Standard: Lieferung MIT 5 $ Versand

function setDelivery(type) {
    deliveryType = type;
    renderBasketCart();
}


function addArticle(category, name) {
    let item = myMenu[category].find(p => p.name === name);
    if (item) {
        item.amount++;
        renderBasketCart();
    }
}

function removeArticle(category, name) {
    let item = myMenu[category].find(p => p.name === name);
    if (item && item.amount > 0) {
        item.amount--;
        renderBasketCart();
    }
}

function clearProduct(category, name) {
    let item = myMenu[category].find(p => p.name === name);
    if (item) {
        item.amount = 0;
        renderBasketCart();
    }
}

function clearBasket() {
    for (let cat in myMenu) {
        myMenu[cat].forEach(item => item.amount = 0);
    }
    renderBasketCart();
}

function initBasketToggle() {
    const toggleBtn = document.getElementById("toggleBasketBtn");
    const basket = document.querySelector(".basket_wrapper");

    if (!toggleBtn || !basket) return;

    toggleBtn.addEventListener("click", () => {
        basket.classList.toggle("visible");

        const isVisible = basket.classList.contains("visible");
        toggleBtn.textContent = isVisible
            ? "🛒 Warenkorb verbergen"
            : "🛒 Warenkorb anzeigen";
    });
}


document.addEventListener("DOMContentLoaded", initBasketToggle);


window.setDelivery = setDelivery;
window.clearBasket = clearBasket;
window.clearProduct = clearProduct; // damit onclick funktioniert
window.addArticle = addArticle;
window.removeArticle = removeArticle;
window.initBasketToggle = initBasketToggle;