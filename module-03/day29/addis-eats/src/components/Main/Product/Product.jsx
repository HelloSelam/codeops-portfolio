import { useEffect, useRef, useState } from "react";
import "./Product.css";
import Dish from "./Dish";

function Product() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [orderTotal, setOrderTotal] = useState(0);

	// Day 29: API data states
	const [dishes, setDishes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Search state
	const [searchTerm, setSearchTerm] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		area: "",
	});

	// Ref for auto-focusing search input
	const searchInputRef = useRef(null);

	// Fetch menu
	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);
		setError("");

		fetch("/menu.json", {
			signal: controller.signal,
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to load the Addis Eats menu.");
				}

				return res.json();
			})
			.then((data) => {
				setDishes(data);
				setLoading(false);
			})
			.catch((err) => {
				if (err.name !== "AbortError") {
					setError(err.message);
					setLoading(false);
				}
			});

		// Cleanup: cancel previous request
		return () => {
			controller.abort();
		};
	}, [selectedCategory]);

	// Auto-focus search field when Product mounts
	useEffect(() => {
			if (!loading && searchInputRef.current) {
					searchInputRef.current.focus();
			}
	}, [loading]);

	// Create categories from fetched dishes
	const categories = [
		"All",
		...new Set(dishes.map((dish) => dish.category)),
	];

	// Filter by category
	const categoryFilteredDishes =
		selectedCategory === "All"
			? dishes
			: dishes.filter(
					(dish) => dish.category === selectedCategory
			  );

	// Filter by search term
	const filteredDishes = categoryFilteredDishes.filter((dish) =>
		dish.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

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

	// Loading state
	if (loading) {
		return <p className="loading">Loading Addis Eats menu...</p>;
	}

	// Error state
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
							name={dish.name}
							price={dish.price}
							spicy={dish.spicy}
							setOrderTotal={setOrderTotal}
						/>
					))}
				</div>
			)}

			{/* Order total */}
			<div className="order-total">
				<h3>Order Total: {orderTotal} ETB</h3>
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