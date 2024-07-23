

const cart_icon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cart_close = document.querySelector("#cart-close");
// console.log(cart);

// to open cart box
cart_icon.addEventListener("click", ()=>{
    cart.classList.add("active");
});

// to close cart box
cart_close.addEventListener("click", ()=>{
    cart.classList.remove("active");
});

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", start);
}else{
    start();
}

function start(){
   addEvent();
}
function update(){
   addEvent();
   updateTotal();
}


function addEvent(){

     // remove items from cart
     let remove_btn = document.querySelectorAll(".cart-remove");
     remove_btn.forEach((btn) =>{
         btn.addEventListener("click", handleRemove_items);
     });

     // change quantity
     let element_quantity = document.querySelectorAll(".cart-quantity");
     element_quantity.forEach((btn) =>{
        btn.addEventListener("change", change_quantityItem);
     });

     // add items to cart
     let product_boxs = document.querySelectorAll(".cart-added");
     product_boxs.forEach((box) =>{
        box.addEventListener("click", handle_addItems);
     });

     // get buy button
    let buy_btn = document.querySelector(".buy_btn");
    buy_btn.addEventListener("click", handleBuy_order);
}
let item_add = [];
function handle_addItems(){
    let product_box = this.parentElement;
    // document.querySelector(".product-box");
    let product_title = product_box.querySelector(".product-title").innerHTML;
    let product_price = product_box.querySelector(".product-price").innerHTML;
    let product_imgsrc = product_box.querySelector(".product-img").src;

    let newTO_ADD = {
        product_title,
        product_price,
        product_imgsrc,
    }
    if(item_add.find((el) => el.product_title === newTO_ADD.product_title)){

        alert("this is aready found .");
        return;
    }else{
        item_add.push(newTO_ADD);
    }

    let cart_box = component(product_title, product_price, product_imgsrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cart_box;
    let cart_content = document.querySelector(".cart-content");
    cart_content.appendChild(newNode);
    update();
}
function handleRemove_items(){
    this.parentElement.remove();

   item_add = item_add.filter((el) =>{
        el.product_title != this.parentElement.querySelector(".cart-product-title").innerHTML
    });
    update();

}


function change_quantityItem(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
}

function handleBuy_order(){
    if(item_add.length <= 0){
        alert("there is not cart exist. \n pleese make an order firest.");
        return;
    }
    let cart_content = document.querySelector(".cart-content");
       cart_content.innerHTML = "";
       alert("your order is placed successfuly.")
       item_add = [];
       update();
}

function updateTotal(){
  let cardboxs = document.querySelectorAll(".cart-box");
  let totale_price = cart.querySelector(".total-price");
  let total = 0;
  cardboxs.forEach((cardbox) =>{
       let price_card = cardbox.querySelector(".price");
       let price = parseFloat(price_card.innerHTML.replace("$", ""));
       let quantity = document.querySelector(".cart-quantity").value;
       total += price * quantity;
  });

  total = total.toFixed(2);

  totale_price.innerHTML = "$" + total

}

  
function component(product_title, product_price, product_imgsrc){
    return `
      <div class="cart-box">
                        <img src= ${product_imgsrc} alt="" class="cart-img">
                        <div class="datails">
                            <div class="cart-product-title">${product_title}</div>
                            <div class="price">${product_price}</div>
                            <input type="number" name="" id="" value="1" class="cart-quantity">
                        </div>
                         <!-- REMOVE CART  -->
                      <i class='bx bxs-trash-alt cart-remove'></i>
                    </div>
    `
}