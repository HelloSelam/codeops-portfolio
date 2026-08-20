const state = {
    dishes: [],
    cart: [],
    searchTerm: "",
    category: "all"
};

const menuGrid = document.querySelector("#menu-grid");
const menuCount = document.querySelector("#menu-count");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

const searchInput = document.querySelector("#search");
const categoryButtons = document.querySelectorAll(".category-btn");

const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");

const checkoutForm = document.querySelector("#checkout-form");


async function loadMenu() {
    try {
        const response = await fetch("./data/menu.json");
        if (!response.ok) {
            throw new Error("Failed to load menu");
        }

        state.dishes = await response.json();
        renderMenu();

    } catch (error) {
        console.error("Menu loading error:", error);

        loadingMessage.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}

function renderMenu() {
    loadingMessage.classList.add("hidden");
    menuGrid.innerHTML = "";
    
    const filteredDishes = state.dishes.filter((dish) => {
        const matchesSearch =
            dish.name
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase());

        const matchesCategory =
            state.category === "all" ||
            dish.category === state.category;

        return matchesSearch && matchesCategory;
    });
    
    menuCount.textContent = `${filteredDishes.length} dishes`;

    if (filteredDishes.length === 0) {
        menuGrid.innerHTML = `
            <p class="status-message">
                No dishes found. Try another search.
            </p>
        `;
        return;
    }

    filteredDishes.forEach((dish) => {
        const card = document.createElement("article");
        card.className = "menu-card";

        card.innerHTML = `
            <div class="menu-card-top">
                <div>
                    <h3>${dish.name}</h3>
                    <p class="category">${dish.category}</p>
                </div>
                <p class="price">${dish.price} ETB</p>
            </div>

            ${dish.spicy ? `
                <span class="spicy">
                    🌶 Spicy
                </span>
            ` : ""}

            <button
                type="button"
                class="add-to-cart"
                data-id="${dish.id}"
            >
                Add to Cart
            </button>
        `;

        menuGrid.appendChild(card);
    });
}


function addToCart(dishId) {
    const existingItem = state.cart.find(
        (item) => item.id === dishId
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            id: dishId,
            quantity: 1
        });
    }

    renderCart();
}


function updateQuantity(dishId, change) {
    const item = state.cart.find(
        (item) => item.id === dishId
    );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        state.cart = state.cart.filter(
            (cartItem) => cartItem.id !== dishId
        );
    }

    renderCart();
}


function removeFromCart(dishId) {
    state.cart = state.cart.filter(
        (item) => item.id !== dishId
    );

    renderCart();
}


function calculateSubtotal() {
    return state.cart.reduce((total, cartItem) => {
        const dish = state.dishes.find(
            (item) => item.id === cartItem.id
        );

        if (!dish) {
            return total;
        }

        return total + dish.price * cartItem.quantity;
    }, 0);
}


function renderCart() {
    cartItems.innerHTML = "";

    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0 items";
        return;
    }

    let totalItems = 0;

    state.cart.forEach((cartItem) => {
        const dish = state.dishes.find(
            (item) => item.id === cartItem.id
        );

        if (!dish) {
            return;
        }

        totalItems += cartItem.quantity;

        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item-info">
                <h3>${dish.name}</h3>
                <p>${dish.price} ETB each</p>
            </div>

            <div class="cart-item-controls">
                <button
                    type="button"
                    class="quantity-btn"
                    data-action="decrease"
                    data-id="${dish.id}"
                >
                    −
                </button>

                <span>${cartItem.quantity}</span>

                <button
                    type="button"
                    class="quantity-btn"
                    data-action="increase"
                    data-id="${dish.id}"
                >
                    +
                </button>
            </div>

            <button
                type="button"
                class="remove-btn"
                data-action="remove"
                data-id="${dish.id}"
            >
                Remove
            </button>
        `;

        cartItems.appendChild(item);
    });

    cartCount.textContent =
        `${totalItems} ${totalItems === 1 ? "item" : "items"}`;

    const subtotal = calculateSubtotal();
    updateCartSummary(subtotal);
}


function updateCartSummary(subtotal) {
    const deliveryFee = state.cart.length > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;
    const summaryRows = document.querySelectorAll(
        ".cart-summary .summary-row"
    );

    if (summaryRows.length >= 2) {
        summaryRows[0].querySelector("strong").textContent =
            `${subtotal} ETB`;
        summaryRows[1].querySelector("strong").textContent =
            `${deliveryFee} ETB`;
    }

    const totalElement = document.querySelector(
        ".summary-total strong"
    );

    totalElement.textContent = `${total} ETB`;
}


searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value.trim();
    renderMenu();
});


categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        state.category = button.dataset.category;
        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        renderMenu();
    });
});


menuGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");

    if (!button) {
        return;
    }

    const dishId = Number(button.dataset.id);
    addToCart(dishId);

    renderCart();
});


cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const dishId = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") {
        updateQuantity(dishId, 1);
    } else if (action === "decrease") {
        updateQuantity(dishId, -1);
    } else if (action === "remove") {
        removeFromCart(dishId);
    }
});



loadMenu();