import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCartStore from "../cart/cartStore";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(dish);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

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
    <section className="dish-detail">
      <Link to="/menu" className="back-link">
        ← Back to menu
      </Link>

      <div className="dish-detail-layout">
        <div className="dish-detail-image">
          <span>Food Image</span>
        </div>

        <div className="dish-detail-content">
          <p className="eyebrow">{dish.category}</p>

          <h1>{dish.nameEn}</h1>

          <p className="dish-name-am">{dish.nameAm}</p>

          <p className="dish-detail-description">
            {dish.description}
          </p>

          <div className="dish-meta">
            <span>{dish.priceETB} ETB</span>
            <span>{dish.servings}</span>
          </div>

          <p>{dish.spiceLevel}</p>

          {dish.isFasting && (
            <span className="dish-tag">Fasting</span>
          )}

          <h2>Ingredients</h2>

          <ul>
            {dish.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>

          <button
            className="primary-button"
            onClick={handleAddToCart}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default DishDetail;