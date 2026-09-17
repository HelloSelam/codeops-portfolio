import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const {
    data: dishes,
    loading,
    error,
  } = useFetch("/menu.json");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  if (loading) {
    return <p className="status-message">Loading menu...</p>;
  }

  if (error) {
    return <p className="status-message">Sorry, we couldn't load the menu.</p>;
  }

  if (dishes.length === 0) {
    return <p className="status-message">No dishes available right now.</p>;
  }

  const categories = [
    "All",
    ...new Set(dishes.map((dish) => dish.category)),
  ];

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      selectedCategory === "All" ||
      dish.category === selectedCategory;

    const matchesSearch =
      dish.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.nameAm.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="menu-page">
      <div className="menu-intro">
        <p className="eyebrow">OUR MENU</p>

        <h1>
          A Taste of Addis,
          <br />
          Served With Heart.
        </h1>

        <p>
          Explore traditional Ethiopian dishes prepared with rich spices,
          slow-cooked flavors, and the warmth of Addis.
        </p>
      </div>

      {/* Search bar */}
      <div className="menu-search">
        <input
          type="search"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <CategoryBar categories={categories} />

      {filteredDishes.length === 0 ? (
        <p className="status-message">
          No dishes found in this category.
        </p>
      ) : (
        <DishList dishes={filteredDishes} />
      )}
    </section>
  );
}

export default Menu;