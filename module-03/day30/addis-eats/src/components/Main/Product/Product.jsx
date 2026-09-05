import { useContext, useEffect, useRef, useState, useMemo } from "react";
import "./Product.css";
import Dish from "./Dish";
import useFetch from "../../../hooks/useFetch";
import { CartContext } from "../../../context/CartContext";


function Product() {
	const { items, total, dispatch } = useContext(CartContext);
	const [selectedCategory, setSelectedCategory] = useState("All");

	const { data: dishes, loading, error } = useFetch(
		"/menu.json",
		selectedCategory
	);

	// Search state
	const [searchTerm, setSearchTerm] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		area: "",
	});

	const searchInputRef = useRef(null);


	useEffect(() => {
			if (!loading && searchInputRef.current) {
					searchInputRef.current.focus();
			}
	}, [loading]);


	const categories = [
		"All",
		...new Set(dishes.map((dish) => dish.category)),
	];


	const filteredDishes = useMemo(() => {
		const categoryFiltered =
			selectedCategory === "All"
				? dishes
				: dishes.filter(
						(dish) => dish.category === selectedCategory
					);

		return categoryFiltered.filter((dish) =>
			dish.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		);
	}, [dishes, selectedCategory, searchTerm]);

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

	if (loading) {
		return <p className="loading">Loading Addis Eats menu...</p>;
	}

	if (error) {
		return <p className="error">Error: {error}</p>;
	}

	return (
		<div className="menu">
			<h2>Menu</h2>

			{/* Search */}
			<div className="search">
				<input
					ref={searchInputRef}
					type="text"
					placeholder="Search dishes..."
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
			</div>

			{/* Category filters */}
			<div className="filters">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => setSelectedCategory(category)}
						className={
							selectedCategory === category
								? "active"
								: ""
						}
					>
						{category}
					</button>
				))}
			</div>

			{/* Dishes */}
			{filteredDishes.length === 0 ? (
				<p className="empty-state">
					No dishes found.
				</p>
			) : (
				<div className="dish-list">
					{filteredDishes.map((dish) => (
						<Dish
							key={dish.id}
							dish={dish}
						/>
					))}
				</div>
			)}

			<div className="cart">
				<h2>Your Cart</h2>

				{items.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<>
						{items.map((item) => (
							<div key={item.id} className="cart-item">
								<span>
									{item.name} × {item.quantity}
								</span>

								<span>
									{item.price * item.quantity} ETB
								</span>

								<button
									onClick={() =>
										dispatch({
											type: "REMOVE",
											payload: item.id,
										})}>
									Remove
								</button>
							</div>
						))}

						<button onClick={() => dispatch({ type: "CLEAR" })}>
							Clear Cart
						</button>
					</>
				)}
			</div>

			{/* Order total */}
			<div className="order-total">
				<p>Order Total: {total} ETB</p>
			</div>

			{/* Delivery form */}
			<div className="delivery-form">
				<h2>Delivery Details</h2>

				<form onSubmit={handleSubmit}>
					<label htmlFor="name">
						Full Name:
					</label>

					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>

					<label htmlFor="phone">
						TeleBirr Number:
					</label>

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
							Please enter a valid TeleBirr number
							(e.g. 0912345678).
						</small>
					)}

					<label htmlFor="area">
						Delivery Area:
					</label>

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