import Link from "next/link";
import { notFound } from "next/navigation";

const dishes = ["kitfo", "doro-wat", "shiro"];

export default async function DishPage({ params }) {
  const { id } = await params;

  if (!dishes.includes(id)) {
    notFound();
  }

  return (
    <main>
      <h1>Dish Details</h1>
      <p>You are viewing dish: {id}</p>

      <nav>
        <Link href="/menu">Back to Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}