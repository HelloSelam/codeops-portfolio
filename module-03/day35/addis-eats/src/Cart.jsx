import { Link } from "react-router-dom";
import { useCart } from "./cart/CartProvider";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.priceETB * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <article key={item.id}>
          <h2>{item.nameEn}</h2>

          <p>{item.quantity} × {item.priceETB} ETB</p>
          <p>{item.priceETB * item.quantity} ETB</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </article>
      ))}

      <h2>Total: {total} ETB</h2>

      <button onClick={clearCart}>Clear cart</button>

      <Link to="/checkout">Proceed to checkout</Link>
    </section>
  );
}

export default Cart;