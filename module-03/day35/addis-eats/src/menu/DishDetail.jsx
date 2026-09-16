import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart/CartProvider";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/menu.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load the dish");
        }

        return response.json();
      })
      .then((data) => {
        const foundDish = data.data.find((item) => item.id === id);

        if (!foundDish) {
          throw new Error("Dish not found");
        }

        setDish(foundDish);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return (
      <section>
        <h1>Dish not found</h1>
        <p>Sorry, we couldn't find that dish.</p>
        <Link to="/menu">Back to menu</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/menu">← Back to menu</Link>

      <h1>{dish.nameEn}</h1>
      <p>{dish.nameAm}</p>

      <p>{dish.description}</p>

      <p>Price: {dish.priceETB} ETB</p>
      <p>Spice level: {dish.spiceLevel}</p>
      <p>{dish.servings}</p>

      <h2>Ingredients</h2>

      <ul>
        {dish.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <button onClick={() => addToCart(dish)}>
        Add to Cart
      </button>
    </section>
  );
}

export default DishDetail;