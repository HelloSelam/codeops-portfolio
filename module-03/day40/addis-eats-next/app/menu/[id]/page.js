import { notFound } from "next/navigation";
import { db } from "../../../db";
import AddToCartButton from "../../../components/AddToCartButton";

export async function generateStaticParams() {
  const dishes = await db.dish.findMany();
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await db.dish.findUnique({
    where: { id },
  });

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p>{dish.price} {dish.currency}</p>
      <p>Category: {dish.category}</p>
      <p>
        {dish.available ? "Available" : "Currently unavailable"}
      </p>

      {dish.available && <AddToCartButton dish={dish} />}
    </main>
  );
}