import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../cart/cartStore"; 

function DishCard({ dish }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(dish);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <article className="dish-card">
      <div className="dish-image">
        <span>Food Image</span>

        {dish.isSpecial && (
          <span className="special-badge">Special</span>
        )}
      </div>

      <div className="dish-content">
        <div className="dish-heading">
          <div>
            <h2>{dish.nameEn}</h2>
            <p className="dish-name-am">{dish.nameAm}</p>
          </div>

          <span className="dish-price">
            {dish.priceETB} ETB
          </span>
        </div>

        <p className="dish-description">
          {dish.description}
        </p>

        <div className="dish-footer">
          <div className="dish-footer-top">
            {dish.isFasting && (
              <span className="dish-tag">Fasting</span>
            )}

            <Link to={`/menu/${dish.id}`}>
              View dish →
            </Link>
          </div>

          <button
            className="primary-button card-cart-button"
            onClick={handleAddToCart}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;