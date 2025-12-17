function renderAllItems(containerId, itemsArray, templateFunction) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let allIndex = 0; allIndex < itemsArray.length; allIndex++) {
        container.innerHTML += templateFunction(itemsArray[allIndex]);
    }
}


function renderBasketCart() {
    const basket = document.getElementById("img_price_amount_items");
    basket.innerHTML = "";
    let subtotal = 0;
    for (let cat in myMenu) {
        myMenu[cat].forEach(item => {
            if (item.amount > 0) {
                subtotal += item.price * item.amount;
                basket.innerHTML += getBasketItemTemplate(cat, item);
            }
        });
    }
    basket.innerHTML += getBasketSummaryTemplate(subtotal);
}



window.addEventListener("load", () => {
    renderAllItems("article_container_all", myMenu.products, getRandomProductsItems);
    renderAllItems("drink_container_all", myMenu.drinks, getRandomDrinksItems);
    renderAllItems("beilage_container_all", myMenu.supplements, getRandomSubbTemplate);
    renderBasketCart();
});



//ALte Version
/* function renderShopItems(){
 let menuContainer = document.getElementById("article_container_all");
 menuContainer.innerHTML = "";
 for (let productsIndex = 0; productsIndex < myMenu.products.length; productsIndex++) {
    const productArr = myMenu.products[productsIndex];
    menuContainer.innerHTML += getRandomProductsItems(productArr);
 }
}

function renderDrinksItems(){
let drinksItems = document.getElementById("drink_container_all");
drinksItems.innerHTML = "";
for (let drinksIndex = 0; drinksIndex < myMenu.drinks.length; drinksIndex++) {
    const drinksArr = myMenu.drinks[drinksIndex];
    drinksItems.innerHTML+= getRandomDrinksItems(drinksArr);
    
}
}

function renderSuppleItems(){
let suppItems = document.getElementById("beilage_container_all");
suppItems.innerHTML = "";
for (let suppIndex = 0; suppIndex < myMenu.supplements.length; suppIndex++) {
    const subbArr = myMenu.supplements[suppIndex];
    suppItems.innerHTML += getRandomSubbTemplate(subbArr);
}
}

window.addEventListener("load", () => {
    renderShopItems();
     renderDrinksItems();
     renderSuppleItems()
    renderBasketCart()
});
 */