"use client";

import Link from "next/link";
import { useCartStore } from "../lib/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        Addis Eats
      </Link>

      <nav className="main-nav">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart" className="cart-link">
          Cart
          <span className="cart-count">{cartCount}</span>
        </Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}