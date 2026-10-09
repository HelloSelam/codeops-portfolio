"use client";

import { useState } from "react";
import { useCartStore } from "../lib/cartStore";

export default function AddToCartButton({ dish }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(dish);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      className="add-to-cart-button"
      onClick={handleAddToCart}
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}