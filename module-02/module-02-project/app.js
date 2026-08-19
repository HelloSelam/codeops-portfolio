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
    menuCount.textContent = `${state.dishes.length} dishes`;

    state.dishes.forEach((dish) => {
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
        `;

        menuGrid.appendChild(card);
    });
}

loadMenu();