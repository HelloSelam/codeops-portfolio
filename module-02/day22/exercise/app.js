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
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");


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

function render() {
    const codes = Object.keys(state.rates);

    select.innerHTML = codes
        .map(code => `<option value="${code}">${code}</option>`)
        .join("");

    select.value = state.currency;
}

// Handle conversion
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amt = Number(amount.value);

    if (!amt || amt <= 0) {
        result.textContent = "Enter a valid amount.";
        return;
    }

    state.amount = amt;
    state.currency = select.value;

    const rate = state.rates[state.currency];

    const out = (amt * rate).toFixed(2);

    result.textContent =
        `${amt} ETB = ${out} ${state.currency}`;

    save();
});


loadRates();