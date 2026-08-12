let items = [];

const form = document.querySelector("#form");
const input = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

function render() {
    list.innerHTML = "";
    items.forEach(function (item) {
        const li = document.createElement("li");
        li.dataset.id = item.id;

        if (item.done === true) {
            li.classList.add("done");
        }

        li.innerHTML = `
            ${item.name}
            <button class="del">Remove</button>
        `;

        list.appendChild(li);
    });

    const remainingItems = items.filter(function (item) {
        return item.done === false;
    });

    count.textContent = remainingItems.length + " items";
}


form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = input.value.trim();
    if (name === "") {
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        done: false
    };

    items.push(newItem);

    render();

    input.value = "";
});


list.addEventListener("click", function (event) {
    const row = event.target.closest("li");
    if (!row) {
        return;
    }

    const id = Number(row.dataset.id);

    if (event.target.classList.contains("del")) {
        items = items.filter(function (item) {
            return item.id !== id;
        });

        render();

        return;
    }

    const item = items.find(function (item) {
        return item.id === id;
    });

    if (item) {
        item.done = !item.done;
    }

    render();
});


render();