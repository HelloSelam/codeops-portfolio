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
        `;

        menuGrid.appendChild(card);
    });
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

loadMenu();