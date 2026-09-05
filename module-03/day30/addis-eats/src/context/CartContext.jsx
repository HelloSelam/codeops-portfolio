import { createContext, useMemo, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

const CartContext = createContext();

function CartProvider({ children }) {
	const [items, dispatch] = useReducer(cartReducer, []);

	// We'll calculate total here
	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const value = useMemo(
		() => ({
			items,
			dispatch,
			total,
		}),
		[items, total]
	);

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	);
}

export { CartContext, CartProvider };