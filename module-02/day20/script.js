const refreshBtn = document.querySelector("#refreshBtn");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const postList = document.querySelector("#postList");

async function load() {
    loading.textContent = "Loading…";
    error.textContent = "";
    postList.innerHTML = "";

    try {
        const res = await fetch(
          "https://fakestoreapi.com/products"
        );
        
        if (!res.ok) {
            throw new Error("Request failed");
        }

        const data = await res.json();

        data.forEach((post) => {
            const li = document.createElement("li");
            li.textContent = post.title;
            postList.appendChild(li);
        });

    } catch (err) {
        error.textContent = "Sorry, we couldn't load the data. Please try again.";
    } finally {
        loading.textContent = "";
    }
}

refreshBtn.addEventListener("click", load);

load();