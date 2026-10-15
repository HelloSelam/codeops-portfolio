"use client";

import Link from "next/link";
import { useCartStore } from "../../lib/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <h2>{item.name}</h2>
              <p>
                {item.quantity} × {item.price} {item.currency}
              </p>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </article>
          ))}

          <h2>Total: {total} ETB</h2>

          <Link href="/checkout">
            Checkout
          </Link>
        </>
      )}
    </main>
  );
}