import Link from "next/link";
import { Suspense } from "react";
import DishList from "./DishList";

export default function MenuPage() {
  return (
    <main>
      <h1>Our Menu</h1>
      <p>Explore our Ethiopian dishes</p>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>

      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList />
      </Suspense>
    </main>
  );
}