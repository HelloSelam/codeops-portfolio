"use client";

import { useCartStore } from "../lib/cartStore";

export default function AddToCartButton({ dish }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button onClick={() => addToCart(dish)}>
      Add to order
    </button>
  );
}