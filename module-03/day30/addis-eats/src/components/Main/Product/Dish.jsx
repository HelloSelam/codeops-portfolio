import PropTypes from "prop-types";
import { useContext } from "react";
import Card from "./Card";
import { CartContext } from "../../../context/CartContext";
import "./Dish.css";

function Dish({ dish }) {
	const { items, dispatch } = useContext(CartContext);

	const cartItem = items.find((item) => item.id === dish.id);

	const handleAdd = () => {
		dispatch({
			type: "ADD",
			payload: dish,
		});
	};

	return (
		<Card>
			<div className="dish">
				<h3>{dish.name}</h3>

				{dish.spicy === true && (
					<span className="spicy-badge">
						Spicy 🌶️
					</span>
				)}

				<p>
					{dish.price} ETB
				</p>

				<p>
					Quantity: {cartItem ? cartItem.quantity : 0}
				</p>

				<button onClick={handleAdd}>
					Add
				</button>
			</div>
		</Card>
	);
}

Dish.propTypes = {
	dish: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		spicy: PropTypes.bool,
	}).isRequired,
};

export default Dish;