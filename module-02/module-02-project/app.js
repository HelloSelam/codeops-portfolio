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
        console.log("Menu loaded:", state.dishes);

    } catch (error) {
        console.error("Menu loading error:", error);

        loadingMessage.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}


loadMenu();