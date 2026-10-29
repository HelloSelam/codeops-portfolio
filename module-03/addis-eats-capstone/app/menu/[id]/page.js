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
      <Link href="/menu" className="dish-back-link">
        ← Back to Menu
      </Link>

      <div className="dish-details-layout">
        <div className="dish-details-image">
          {dish.image && (
            <Image
              src={dish.image}
              alt={name}
              width={800}
              height={600}
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        <section className="dish-details-info">
          <span className="dish-category">
            {dish.category || "Ethiopian cuisine"}
          </span>

          <h1>{name}</h1>

          {dish.nameAm && (
            <p className="dish-amharic-name">{dish.nameAm}</p>
          )}

          <p className="dish-details-description">
            {dish.description || "Discover this Ethiopian favourite."}
          </p>

          <p className="dish-details-price">
            {Number(price).toLocaleString()} {dish.currency || "ETB"}
          </p>

          <p className={dish.available === false ? "availability-unavailable" : "availability-available"}>
            {dish.available === false
              ? "Currently unavailable"
              : "Available to order"}
          </p>

          {dish.available !== false && (
            <AddToCartButton dish={dish} />
          )}

          <div className="dish-extra-details">
            {dish.spiceLevel && (
              <p>
                <strong>Spice level:</strong> {dish.spiceLevel}
              </p>
            )}

            {dish.servings && (
              <p>
                <strong>Servings:</strong> {dish.servings}
              </p>
            )}
          </div>
        </section>
      </div>

      {dish.ingredients?.length > 0 && (
        <section className="dish-ingredients">
          <h2>Ingredients</h2>
          <ul>
            {dish.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}