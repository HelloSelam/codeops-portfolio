const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

function addRow(name, price) {
    const li = document.createElement("li");
    li.dataset.price = price;

    const itemInfo = document.createElement("span");
    itemInfo.textContent = `${name} - ${price} ETB`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("del");

    li.append(itemInfo, deleteButton);
    list.append(li);
}

function updateTotal() {
    let total = 0;

    const items = list.querySelectorAll("li");
    items.forEach(item => {
        total += Number(item.dataset.price);
    });

    totalEl.textContent = total;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || !price || price <= 0) {
        return;
    }

    addRow(name, price);
    form.reset();
    updateTotal();
});


list.addEventListener("click", (e) => {

    if (e.target.matches(".del")) {
        e.target.closest("li").remove();
        updateTotal();
    }

    else if (e.target.matches("li")) {
        e.target.classList.toggle("bought");
    }
});