import { Link } from "react-router-dom";

function DishCard({ dish }) {
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
          {dish.isFasting && (
            <span className="dish-tag">Fasting</span>
          )}

          <Link to={`/menu/${dish.id}`}>
            View dish →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DishCard;