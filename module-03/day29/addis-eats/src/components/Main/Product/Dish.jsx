import { useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./Dish.css";

function Dish({ name, price, spicy, currency, setOrderTotal }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    setOrderTotal((total) => total + price);
  };

  return (
    <Card>
      <div className="dish">
        <h3>{name}</h3>

        {spicy === true && (
          <span className="spicy-badge">Spicy 🌶️</span>
        )}

        <p>
          {price} {currency}
        </p>

        <p>Quantity: {count}</p>

        <button onClick={handleAdd}>
          Add
        </button>
      </div>
    </Card>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  setOrderTotal: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;