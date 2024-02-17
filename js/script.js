//  cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
    updateCartSection();
};
//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
//Making function
function ready() {
    //Remove Items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    //quantity changes
    var quantityInput = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}
//buy button
function buyButtonClicked() {
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//Remove Items from Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
//Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsName = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerText === title) {
            // Product already exists in the cart, update quantity
            var quantityInput = cartItems.getElementsByClassName("cart-quantity")[i];
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updatetotal(); // Update the total after updating the quantity
            return;
        }
    }

    // Product is not in the cart, add a new item
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--Remove cart-->
        <i class="bi bi-trash-fill cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

    updatetotal(); // Update the total after adding a new item
}







// update total 
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var item = cartBoxes[i];
        var priceElement = item.getElementsByClassName('cart-price')[0];
        var quantityElement = item.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    // If price contain some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}


function updateCartSection() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var totalQuantity = 0;
    var totalPrice = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];

        var quantity = parseInt(quantityElement.value);
        var price = parseFloat(priceElement.innerText.replace("$", ""));

        totalQuantity += quantity;
        totalPrice += price * quantity;
    }

    // If price contains some cents value
     totalPrice = Math.round(totalPrice * 100) / 100;

    // Update the cart section with total quantity and total price
    var cartQuantityElement = document.getElementById('cart-quantity');
    var cartTotalPriceElement = document.getElementById('cart-total-price');

    cartQuantityElement.innerText = totalQuantity;
    cartTotalPriceElement.innerText = '$' + totalPrice;
}

function updateQuantity(input) {
    // Get the current value of the input
    let currentValue = parseInt(input.value);

    // Check if the value is less than 1, set it to 1
    if (currentValue < 1 || isNaN(currentValue)) {
        input.value = 1;
    }
}






// script.js

// script.js

// script.js

let cartData = [];
let total = 0;

function addToCart(productTitle, productPrice) {
    const existingProductIndex = cartData.findIndex(item => item.title === productTitle);

    if (existingProductIndex !== -1) {
        // Product already exists in the cart, increment quantity
        cartData[existingProductIndex].quantity++;
    } else {
        // Product is not in the cart, add a new item
        cartData.push({
            title: productTitle,
            price: productPrice,
            quantity: 1
        });
    }

    updateCartContent();
}

function updateCartContent() {
    const cartContentElement = document.getElementById('cart-content');
    const totalPriceElement = document.getElementById('total-price');

    // cartContentElement.innerHTML = ''; 

    total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // totalPriceElement.textContent = `$${total.toFixed(2)}`;

    cartData.forEach(item => {
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');

        cartBox.innerHTML = `
                <div class="detail-box">
                    <div class="cart-product-title">${item.title}</div>
                    <input type="number" value="${item.quantity}" class="cart-quantity" oninput="updateQuantity(this, '${item.title}')">
                </div>
                <i class="bi bi-trash-fill cart-remove" onclick="removeFromCart('${item.title}')"></i>
            `;

        // cartContentElement.appendChild(cartBox);
    });
}




