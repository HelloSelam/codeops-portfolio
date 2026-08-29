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

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		area: "",
	});

	const filteredDishes =
		selectedCategory === "All"
			? dishes
			: dishes.filter((dish) => dish.category === selectedCategory);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const isPhoneValid = /^09\d{8}$/.test(formData.phone);

	const handleSubmit = (event) => {
		event.preventDefault();

		alert("Order placed successfully!");
	};

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

			<div className="delivery-form">
				<h2>Delivery Details</h2>

				<form onSubmit={handleSubmit}>
					<label htmlFor="name">Full Name: </label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>

					<label htmlFor="phone">TeleBirr Number: </label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="0912345678"
						required
					/>

					{formData.phone && !isPhoneValid && (
						<small className="phone-error">
							Please enter a valid TeleBirr number (e.g. 0912345678).
						</small>
					)}

					<label htmlFor="area">Delivery Area: </label>
					<input
						type="text"
						id="area"
						name="area"
						value={formData.area}
						onChange={handleChange}
						required
					/>

					<button
						type="submit"
						disabled={!isPhoneValid}
					>
						Place Order
					</button>
				</form>
			</div>

		</div>
	);
}

export default Product;