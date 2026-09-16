import { Link } from "react-router-dom";

function DishCard({ dish }) {
  return (
    <article>
      <h2>{dish.nameEn}</h2>

      <p>{dish.nameAm}</p>

      <p>{dish.description}</p>

      <p>{dish.priceETB} ETB</p>

      {dish.isFasting && <span>Fasting</span>}

      {dish.isSpecial && <span>Today's Special</span>}

      <Link to={`/menu/${dish.id}`}>
        View dish
      </Link>
    </article>
  );
}

export default DishCard;