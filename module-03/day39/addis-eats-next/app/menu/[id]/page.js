import Link from "next/link";
import { notFound } from "next/navigation";
import { getMenu } from "@/lib/menu";

export async function generateStaticParams() {
  const dishes = await getMenu();

  return dishes.map((dish) => ({
    id: dish.slug,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dishes = await getMenu();

  const dish = dishes.find((dish) => dish.slug === id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.nameEn}</h1>

      <p>{dish.nameAm}</p>

      <p>{dish.description}</p>

      <p>Price: {dish.priceETB} ETB</p>

      <p>Category: {dish.category}</p>

      <p>Spice level: {dish.spiceLevel}</p>

      <p>Servings: {dish.servings}</p>

      <h2>Ingredients</h2>

      <ul>
        {dish.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

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