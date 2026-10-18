"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

const categories = ["All", "Main", "Vegetarian"];

export default function DishGrid({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(dishes.map((dish) => dish.category)),
  ];

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
              {dish.image && ( 
                <div className="dish-image"> 
                  <Image 
                    src={dish.image} 
                    alt={dish.nameEn || dish.name} 
                    width={400} 
                    height={260} 
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" style={{ 
                      width: "100%", 
                      height: "220px", 
                      objectFit: "cover", 
                    }} 
                  /> 
                </div>
              )}

              <div className="dish-card-content"> 
                <h2>{dish.nameEn || dish.name}</h2> 
                {dish.nameAm && ( 
                  <p className="dish-name-am"> 
                    {dish.nameAm} 
                  </p> 
                )} 
                
                <p>{dish.description}</p> 
                
                {dish.spiceLevel && ( 
                  <p className="dish-spice"> 
                    Spice: {dish.spiceLevel} 
                  </p> 
                )} 
                
                {dish.isFasting && ( 
                  <span className="dish-tag"> 
                    Fasting 
                  </span> 
                )} 
                
                {dish.isSpecial && ( 
                  <span className="dish-tag"> 
                    Special 
                  </span> 
                )} 
                
                <p className="dish-price"> 
                  {dish.priceETB ?? dish.price}{" "} 
                  {dish.currency || "ETB"} 
                </p> 
                
                <div className="dish-actions"> 
                  <Link 
                    href={`/menu/${dish.slug || dish.id}`} 
                  > 
                    View Details 
                  </Link> 
                  
                  {dish.available !== false && ( 
                    <AddToCartButton dish={dish} /> 
                  )} 
                </div>

              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}