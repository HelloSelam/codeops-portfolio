const MENU_API = "https://addis-eats-backend.onrender.com/menu";

export async function getMenu() {
  const response = await fetch(MENU_API, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }

  const result = await response.json();

  return result.data;
}