import { useState } from 'react';
import './Product.css';
import Dish from './Dish';

const dishes = [
	{ id: 1, name: "Doro Wat", price: 350, category: "Main", spicy: true },
	{ id: 2, name: "Shiro", price: 180, category: "Main", spicy: false },
	{ id: 3, name: "Kitfo", price: 450, category: "Main", spicy: false },
	{ id: 4, name: "Tibs", price: 400, category: "Main", spicy: true },
	{ id: 5, name: "Beyaynetu", price: 300, category: "Vegetarian", spicy: false },
];

function Product() {
	const [selectedCategory, setSelectedCategory] = useState("All");

	const filteredDishes =
		selectedCategory === "All"
			? dishes
			: dishes.filter((dish) => dish.category === selectedCategory);

	return (
		<div className="menu">
			<h2>Menu</h2>

			<div className="filters">
				<button onClick={() => setSelectedCategory("All")}>All</button>
				<button onClick={() => setSelectedCategory("Main")}>Main</button>
				<button onClick={() => setSelectedCategory("Vegetarian")}>Vegetarian</button>
				<button onClick={() => setSelectedCategory("Dessert")}>Dessert</button>
			</div>

			{filteredDishes.length === 0 ? (
    			<p className="empty-state">
					No dishes found in this category.
				</p>
			) : (
        		<div className="dish-list">
        			{filteredDishes.map((dish) => (
						<Dish
							spicy={dish.spicy}
							key={dish.id}
							name={dish.name}
							price={dish.price}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default Product;