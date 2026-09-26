import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCartStore from "../cart/cartStore";
import useFetch from "../hooks/useFetch";

function DishDetail() {
  const { id } = useParams();

  const { data: dishes, loading, error } =
    useFetch("/menu.json");
  
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const dish = dishes?.find((item) => item.id === id);

  function handleAddToCart() {
    addToCart(dish);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }


  if (loading) {
    return (
      <p className="status-message">
        Loading dish...
      </p>
    );
  }

  if (error || !dish) {
    return (
      <section className="status-message">
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
          <img
            src={dish.image}
            alt={dish.nameEn}
          />
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
            type="button"
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