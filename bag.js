const CONVENIENCE_FEES = 99;

let bagItemObjects;
onLoad();

function onLoad(){
    loadBagItemsobjects();
    displayBagItems();
    displayBagSummry();
}

function displayBagSummry(){
    let bagsummryElment = document.querySelector(`.bag-summary`);
    let totalItem = bagItemObjects.length;
    let TotalMRP = 0;
    let totalDiscount = 0;
    let finalPayment = 0;

    bagItemObjects.forEach(bagItems => {
        TotalMRP += bagItems.original_price;
        totalDiscount += bagItems.original_price - bagItems.current_price;
    });
    finalPayment = TotalMRP - totalDiscount + CONVENIENCE_FEES;
    bagsummryElment.innerHTML = ` 
           <div class="bag-details-container">
                <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
                <div class="price-item">
                    <span class="price-item-tag">Total MRP</span>
                    <span class="price-item-value">₹ ${TotalMRP}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Discount on MRP</span>
                    <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Convenience Fee</span>
                    <span class="price-item-value">₹ 99</span>
                </div>
                <hr>
                <div class="price-footer">
                    <span class="price-item-tag">Total Amout</span>
                    <span class="price-item-value">₹ ${finalPayment}</span>
                </div>
            </div>
              <button class="btn-place-order">
                <div class="css-xjhrni">PLACE ORDER</div>
             </button>`;

}

function loadBagItemsobjects(){
    console.log(bagItems);
     bagItemObjects = bagItems.map(itemId => {
        for(let i = 0; i < items.length; i++){
            if(itemId == items[i].id){
                return items[i];

            }
        }

    });
    console.log(bagItemObjects);


}

function displayBagItems(){
    
    let containerElment = document.querySelector(`.bag-items-container`);

    let innerHTML = '';
    bagItemObjects.forEach(bagItems => {
        innerHTML += generateItemHTML(bagItems);
        
    });
    containerElment.innerHTML = innerHTML;
    
}

function removeFrombag(itemId){
    bagItems = bagItems.filter(bagItems => bagItems != itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemsobjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummry();
}

function generateItemHTML(item){
    return ` 
        <div class="bag-item-container">
                <div class="item-left-part">
                    <img class="bag-item-img" src="${item.image}">
                </div>
                <div class="item-right-part">
                    <div class="company">${item.company}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="price-container">
                        <span class="current-price">Rs ${item.current_price}</span>
                        <span class="original-price">Rs ${item.original_price}</span>
                        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                    </div>
                    <div class="return-period">
                        <span class="return-period-days">${item.return_period} days</span>
                        return available
                    </div>
                    <div class="delivery-details">
                        Delivery by
                        <span class="delivery-details-days">${item.delivery_date}</span>
                    </div>
                </div>
                <div class="remove-from-cart" onclick="removeFrombag(${item.id});">X</div>
        </div>`;

}