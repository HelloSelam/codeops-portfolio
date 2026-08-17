const API = "https://open.er-api.com/v6/latest/ETB";


const state = {
    base: "ETB",
    rates: {},
    watchlist: [],
    amount: 100,
    currency: "USD"
};

const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const watchUl = document.querySelector("#watchlist");

// Fetch live exchange rates
async function loadRates() {
    status.textContent = "Loading rates…";

    try {
        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        const data = await res.json();

        state.rates = data.rates;

        status.textContent = "";

        render();

    } catch (err) {
        status.textContent = "Could not load rates.";
    }
}

// Render the currency dropdown
function render() {
    const codes = Object.keys(state.rates);

    select.innerHTML = codes
        .map(code => `<option value="${code}">${code}</option>`)
        .join("");

    select.value = state.currency;
}


loadRates();