let cartButtons = document.querySelectorAll(".add-cart");

let cartItems = document.getElementById("cartItems");

let cartSidebar = document.getElementById("cartSidebar");

let closeCart = document.getElementById("closeCart");

let cartIcon = document.querySelector(".nav-actions a:nth-child(3)");

let cart = [];


cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let card = button.parentElement;

        let flowerName = card.querySelector("h3").innerText;

        let flowerPrice = parseInt(
            card.querySelector("h4").innerText.replace("₹", "")
        );

        let existingItem = cart.find(function(item) {
            return item.name === flowerName;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: flowerName,
                price: flowerPrice,
                quantity: 1
            });
        }

        displayCart();

    });

});


function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {

        total = total + (item.price * item.quantity);

        let cartItem = document.createElement("div");

        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>₹${item.price}</p>

            <button onclick="decreaseQuantity(${index})">-</button>

            <span>${item.quantity}</span>

            <button onclick="increaseQuantity(${index})">+</button>

            <button onclick="removeItem(${index})">Remove</button>

            <hr>
        `;

        cartItems.appendChild(cartItem);

    });

    document.getElementById("cartTotal").innerText = total;

}


function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();

}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    displayCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    displayCart();

}


cartIcon.addEventListener("click", function(event) {

    event.preventDefault();

    cartSidebar.style.right = "0";

});


closeCart.addEventListener("click", function() {

    cartSidebar.style.right = "-400px";

});