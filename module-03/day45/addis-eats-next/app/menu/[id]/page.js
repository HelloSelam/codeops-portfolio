import { notFound } from "next/navigation";
import { db } from "../../../db";
import AddToCartButton from "../../../components/AddToCartButton";
import { getDish } from "../../../db";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish could not be found on Addis Eats.",
    };
  }

  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: dish.name,
      description: dish.description,
      images: dish.image ? [dish.image] : [],
    },
  };
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