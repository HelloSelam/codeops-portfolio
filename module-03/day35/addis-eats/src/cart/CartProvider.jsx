import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "INCREASE_ITEM":
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    case "DECREASE_ITEM":
      return state
        .map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [],
    () => {
      const savedCart =
        localStorage.getItem("addis-eats-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "addis-eats-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  function addToCart(dish) {
    dispatch({
      type: "ADD_ITEM",
      payload: dish,
    });
  }

  function increaseItem(id) {
    dispatch({
      type: "INCREASE_ITEM",
      payload: id,
    });
  }

  function decreaseItem(id) {
    dispatch({
      type: "DECREASE_ITEM",
      payload: id,
    });
  }

  function removeFromCart(id) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseItem,
        decreaseItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}