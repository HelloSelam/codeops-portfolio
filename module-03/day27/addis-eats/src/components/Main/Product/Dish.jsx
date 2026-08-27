import PropTypes from "prop-types";
import "./Dish.css";

const Dish = ({ name, price, spicy, currency }) => {
  return (
    <article className="dish">
      <h3>{name}</h3>
      {spicy === true && (
        <span className="spicy-badge">Spicy 🌶️</span>
      )}
      <p>{price} {currency}</p>
    </article>
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