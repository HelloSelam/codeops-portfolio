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
      <div className="cart-header">
        <div>
          <p className="eyebrow">YOUR ORDER</p>
          <h1>Your Cart</h1>
        </div>

        <button onClick={clearCart}>Clear cart</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">

          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <div>
                <h2>{item.nameEn}</h2>
                <p>{item.priceETB} ETB each</p>
              </div>

              <div className="cart-item-right">
                
                <strong>
                  {item.quantity} ×
                </strong>

                <strong>
                  {item.priceETB * item.quantity} ETB
                </strong>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>

              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <p>Total</p>
          <h2>{total} ETB</h2>

          <Link to="/checkout" className="primary-button">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default Cart;