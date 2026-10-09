"use client";

import { useState } from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

const categories = ["All", "Main", "Vegetarian"];

export default function DishGrid({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

  return (
    <div className="menu-content">
      <nav className="category-bar" aria-label="Filter dishes by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category ? "active" : ""
            }
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="menu-grid">
        {filteredDishes.length === 0 ? (
          <p>No dishes found in this category.</p>
        ) : (
          filteredDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <h2>{dish.name}</h2>

              <p>{dish.description}</p>

              <p className="dish-price">
                {dish.price} {dish.currency}
              </p>

              <div className="dish-actions">
                <Link href={`/menu/${dish.id}`}>
                  View Details
                </Link>

                {dish.available && (
                  <AddToCartButton dish={dish} />
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}