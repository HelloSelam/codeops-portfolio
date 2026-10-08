import Link from "next/link";
import { db } from "../../db";

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await db.dish.findMany();
  return (
    <main>
      <h1>Our Menu</h1>

      <div>
        {dishes.map((dish) => (
          <article key={dish.id}>
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p>{dish.price} {dish.currency}</p>

            <Link href={`/menu/${dish.id}`}>
              View dish
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}