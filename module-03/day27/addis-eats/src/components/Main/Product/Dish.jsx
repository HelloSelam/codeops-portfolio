import PropTypes from "prop-types";
import Card from './Card';
import "./Dish.css";

function Dish ({ name, price, spicy, currency }) {
  return (
    <Card>
      <div className="dish">
        <h3>{name}</h3>
        {spicy === true && (
          <span className="spicy-badge">Spicy 🌶️</span>
        )}
        <p>{price} {currency}</p>
      </div>
    </Card>
  );
};

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;