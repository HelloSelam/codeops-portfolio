import Link from "next/link";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

export default async function MenuPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

      <CategoryBar />

      <DishList />
      
    </main>
  );
}