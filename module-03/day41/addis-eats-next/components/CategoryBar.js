"use client";

import { useState } from "react";

const categories = ["All", "Main", "Vegetarian"];

export default function CategoryBar() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <nav>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}