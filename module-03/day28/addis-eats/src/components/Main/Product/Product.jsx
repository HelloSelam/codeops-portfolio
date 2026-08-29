import { useState } from 'react';
import './Product.css';
import Dish from './Dish';
import dishes from '../../../data/menu.json';


const categories = [
	"All",
	...new Set(dishes.map((dish) => dish.category))
];

function Product() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [orderTotal, setOrderTotal] = useState(0);

	const filteredDishes =
		selectedCategory === "All"
			? dishes
			: dishes.filter((dish) => dish.category === selectedCategory);

	return (
		<div className="menu">
			<h2>Menu</h2>

			<div className="filters">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => setSelectedCategory(category)}
						className={
							selectedCategory === category ? "active" : ""
						}
					>
						{category}
					</button>
				))}
			</div>

			{filteredDishes.length === 0 ? (
				<p className="empty-state">
					No dishes found in this category.
				</p>
			) : (
				<div className="dish-list">
					{filteredDishes.map((dish) => (
						<Dish
							key={dish.id}
							name={dish.name}
							price={dish.price}
							spicy={dish.spicy}
							setOrderTotal={setOrderTotal}
						/>
					))}
				</div>
			)}

			<div className="order-total">
				<h3>Order Total: {orderTotal} ETB</h3>
			</div>
		</div>
	);
}

export default Product;