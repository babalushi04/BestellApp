function getRandomProductsItems(productArr){
    return`
    <div class="container_article">
              <div class="article_img_box">
               <img class="img_article" src="assets/img/${productArr.image}" alt="">

                <div id="name_of_article" class="name_style_article">${productArr.name}</div>
                <div id="discription_of_article" class="description_style_article">${productArr.description}</div>
                <div id="price_of_article" class="article_price_style">Price: ${productArr.price.toFixed(2)} $</div>
                
                <button onclick="addArticle('products', '${productArr.name}')" id="counter_button_add" class="btn_counter">
                  <img src="assets/icons/add.svg" alt="Icon add Article" class="btn_counter_img">
                </button>
               
                 <button onclick="removeArticle('products', '${productArr.name}')" id="counter_button_remove" class="btn_counter_remove">
                  <img src="assets/icons/remove.svg" alt="Icon add Article" class="btn_counter_img">
                </button>
              </div>
            </div>`;
}

function getRandomDrinksItems(drinksArr){
    return `
    <div class="drinks_container" id="drinks_container_box">
      <div class="drinks_img_box">
     <img class="img_drink" src="assets/img/${drinksArr.image}" alt="">

        <div class="name_style_drink">${drinksArr.name}</div>
        <div class="description_style_drink">${drinksArr.description}</div>
        <div class="drink_price_style">Price: ${drinksArr.price.toFixed(2)} $</div>

        <button onclick="addArticle('drinks', '${drinksArr.name}')" class="btn_counter">
          <img src="assets/icons/add.svg" alt="Icon add Article" class="btn_counter_img">
        </button>

        <button onclick="removeArticle('drinks', '${drinksArr.name}')" class="btn_counter_remove">
          <img src="assets/icons/remove.svg" alt="Icon remove Article" class="btn_counter_img">
        </button>
      </div>
    </div>`;
}


function getRandomSubbTemplate(subbArr){
    return `
    <div class="beilage_container" id="beilage_container_box">
      <div class="beilage_img_box">
        <img class="img_beilage" src="assets/img/${subbArr.image}" alt="">

        <div class="name_style_drink">${subbArr.name}</div>
        <div class="description_style_drink">${subbArr.description}</div>
        <div class="beilage_price_style">Price: ${subbArr.price.toFixed(2)} $</div>

        <button onclick="addArticle('supplements', '${subbArr.name}')" class="btn_counter">
          <img src="assets/icons/add.svg" alt="Icon add Article" class="btn_counter_img">
        </button>

        <button onclick="removeArticle('supplements', '${subbArr.name}')" class="btn_counter_remove">
          <img src="assets/icons/remove.svg" alt="Icon remove Article" class="btn_counter_img">
        </button>
      </div>
    </div>`;
}

function getBasketItemTemplate(cat, item) {
    return `
    <div class="img_counter_price_trash">
      <div class="basket_tofu_img_style">
        <img class="basket_img_test standard_border_radius" src="assets/img/${item.image}" alt="">
      </div>
      <div class="name_price_container">
        <div class="name_of_tofu_style">${item.name}</div>
        <div class="price_total_style">${(item.price * item.amount).toFixed(2)} $</div>
      </div>
      
      <div class="plus_minus_amount">
        <button onclick="removeArticle('${cat}', '${item.name}')" class="btn_counter_commande">
          <img class="icon_commade_btn" src="./assets/icons/remove.svg" alt="">
        </button>

        <div class="amount_output_style">${item.amount}</div>
        <button onclick="addArticle('${cat}', '${item.name}')" class="btn_counter_commande">
          <img class="icon_commade_btn" src="./assets/icons/add.svg" alt="">
        </button>

        <button onclick="clearProduct('${cat}', '${item.name}')" class="btn_counter_commande">
          <img class="icon_commade_btn" src="assets/icons/trash.png" alt="Trash Icon">
        </button>
      </div>
    </div>`;
}

function getBasketSummaryTemplate(subtotal) {
    const shipping = deliveryType === "delivery" ? 5 : 0;
    const total = subtotal + shipping;
    return `
    <div class="total_cost_content" id="content_total_cost">
      <table class="summary_table">
        <tr><td>Subtotal:</td><td class="betrag" id="subtotal">${subtotal.toFixed(2)} $</td></tr>
        <tr><td>Shipping:</td><td class="betrag" id="shipping">${shipping.toFixed(2)} $</td></tr>
        <tr class="gesamt_row"><td><strong>Total</strong></td><td class="betrag" id="total">${total.toFixed(2)} $</td></tr>
      </table>
      <button onclick="clearBasket()" class="btn_counter_commande">
        <img class="icon_commade_btn" src="assets/icons/trash.png" alt="Trash Icon">
      </button>
    </div>`;
}


window.addEventListener("load", () => {
  renderAllItems("article_container_all", myMenu.products, getRandomProductsItems);
  renderAllItems("drink_container_all", myMenu.drinks, getRandomDrinksItems);
  renderAllItems("beilage_container_all", myMenu.supplements, getRandomSubbTemplate);
  renderBasketCart();
});