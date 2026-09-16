import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState("");
  const categories = [
    "All",
    ...new Set(dishes.map((dish) => dish.category)),
  ];

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  {filteredDishes.length === 0 ? (
    <p>No dishes found in this category.</p>
  ) : (
    <DishList dishes={filteredDishes} />
  )}

  useEffect(() => {
    fetch("/menu.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load the menu");
      }

      return response.json()
    })
    .then((data) => {
      setDishes(data.data);
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Sorry, we couldn't load the menu.</p>
  }

  if (dishes.length === 0) {
    return <p>No dishes available right now.</p>;
  }


  return (
    <section>
      <h1>Our Menu</h1>
      
      <CategoryBar categories={categories} />

      <DishList dishes={filteredDishes} />
    </section>
  );
}

export default Menu;