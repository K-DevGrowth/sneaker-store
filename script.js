const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

const productCards = document.querySelectorAll(".product-card");

const cartDrawer = document.getElementById("cartDrawer");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

document.querySelectorAll(".add-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const product = {
      name: card.dataset.name,
      price: Number(card.dataset.price),
    };

    cart.push(product);
    updateCart();

    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 900);
  });
});

openCart.addEventListener("click", () => {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
});

closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
}

function updateCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>${formatCurrency(item.price)}</p>
      </div>
      <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
    `;

    cartItems.appendChild(cartItem);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent = cart.length;
  cartTotal.textContent = formatCurrency(total);
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function formatCurrency(number) {
  return number.toLocaleString("vi-VN") + " VND";
}

updateCart();
