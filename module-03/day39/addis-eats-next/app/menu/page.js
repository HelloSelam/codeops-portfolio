import Link from "next/link";
import { getMenu } from "@/lib/menu";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

export default async function MenuPage() {
  const dishes = await getMenu();

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

      <CategoryBar>
        <DishList dishes={dishes} />
      </CategoryBar>
    </main>
  );
}