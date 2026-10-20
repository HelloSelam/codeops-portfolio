import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMenu } from "../../../lib/menu";
import AddToCartButton from "../../../components/AddToCartButton";

async function findDish(identifier) {
  const dishes = await getMenu();

  return (
    dishes.find(
      (dish) =>
        dish.id === identifier || dish.slug === identifier
    ) || null
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await findDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish could not be found on Addis Eats.",
    };
  }

  return {
    title: dish.nameEn || dish.name,
    description: dish.description,
    openGraph: {
      title: dish.nameEn || dish.name,
      description: dish.description,
      images: dish.image ? [dish.image] : [],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await findDish(id);

  if (!dish) {
    notFound();
  }

  const name = dish.nameEn || dish.name;
  const price = dish.priceETB ?? dish.price;

  return (
    <main className="dish-details">
      <Link href="/menu">← Back to Menu</Link>

      {dish.image && (
        <Image
          src={dish.image}
          alt={name}
          width={800}
          height={500}
          priority
          style={{
            width: "100%",
            maxWidth: "700px",
            height: "auto",
            objectFit: "cover",
          }}
        />
      )}

      <h1>{name}</h1>

      {dish.nameAm && <p>{dish.nameAm}</p>}

      <p>{dish.description}</p>

      <h2>
        {price} {dish.currency || "ETB"}
      </h2>

      <p>Category: {dish.category}</p>

      {dish.spiceLevel && <p>Spice level: {dish.spiceLevel}</p>}

      {dish.servings && <p>Servings: {dish.servings}</p>}

      {dish.ingredients?.length > 0 && (
        <>
          <h2>Ingredients</h2>
          <ul>
            {dish.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}

      <p>
        {dish.available === false
          ? "Currently unavailable"
          : "Available"}
      </p>

      {dish.available !== false && (
        <AddToCartButton dish={dish} />
      )}
    </main>
  );
}