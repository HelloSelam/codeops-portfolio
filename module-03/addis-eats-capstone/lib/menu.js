import localMenu from "../data/menu.json";
import localSpecials from "../data/specials.json";

const MENU_API = "https://addis-eats-backend.onrender.com/menu/";
const SPECIALS_API =
"https://addis-eats-backend.onrender.com/menu/specials";

function normalizeDishes(dishes) {
  return dishes.map((dish) => ({
    ...dish,


    // Keep compatibility with the existing app.
    name: dish.nameEn,
    price: dish.priceETB,
    currency: "ETB",
    available: dish.available ?? true,


  }));
}

async function fetchDishes(url, fallback) {
  try {
    const response = await fetch(url, {
    next: { revalidate: 3600 },
  });


  if (!response.ok) {
    throw new Error(`Menu API returned ${response.status}`);
  }

  const result = await response.json();

  if (result.status !== "ok" || !Array.isArray(result.data)) {
    throw new Error("Invalid menu API response");
  }

  // Keep local image paths when the API doesn't provide them.
  const localById = new Map(
    fallback.map((dish) => [dish.id, dish])
  );

  const dishes = result.data.map((dish) => {
    const localDish = localById.get(dish.id);

    return {
      ...localDish,
      ...dish,
      image: dish.image ?? localDish?.image,
    };
  });

  return normalizeDishes(dishes);


  } catch (error) {
  console.error("Could not fetch menu data; using local JSON:", error);

  return normalizeDishes(fallback);

  }
}

export async function getMenu() {
  return fetchDishes(MENU_API, localMenu.data);
}

export async function getSpecials() {
  return fetchDishes(SPECIALS_API, localSpecials.data);
}
