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