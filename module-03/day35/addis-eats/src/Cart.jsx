import { Link } from "react-router-dom";
import useCartStore from "./cart/cartStore";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const subtotal = cart.reduce(
    (sum, item) => sum + item.priceETB * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 80 : 0;

  const total = subtotal + deliveryFee;

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <p className="eyebrow">YOUR ORDER</p>
        <h1>Your Cart</h1>
        <p>
          Looks like you haven't added anything yet.
          Explore our menu and find something delicious.
        </p>
        <Link to="/menu" className="primary-button">Browse the menu</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div>
          <p className="eyebrow">YOUR ORDER</p>
          <h1>Your Cart</h1>
          <p className="cart-item-count">
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        <button onClick={clearCart} className="clear-cart-button">Clear cart</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">

          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <span>Food Image</span>
              </div>

              <div className="cart-item-info">
                <p className="eyebrow">
                  {item.category}
                </p>

                <h2>{item.nameEn}</h2>

                <p className="cart-item-price">
                  {item.priceETB} ETB each
                </p>

                <button onClick={() => removeFromCart(item.id)} className="remove-button">
                  Remove
                </button>
              </div>

              <div className="cart-item-actions">

                <div className="quantity-control">
                  <button
                    onClick={() =>
                      decreaseItem(item.id)
                    }
                    aria-label={`Decrease ${item.nameEn} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseItem(item.id)
                    }
                    aria-label={`Increase ${item.nameEn} quantity`}
                  >
                    +
                  </button>
                </div>

                <strong>
                  {item.priceETB * item.quantity} ETB
                </strong>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <p className="eyebrow">ORDER SUMMARY</p>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{subtotal} ETB</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee} ETB</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>

          <Link to="/checkout" className="primary-button">
            Proceed to checkout
          </Link>

          <Link
            to="/menu"
            className="continue-shopping"
          >
            ← Continue shopping
          </Link>

        </aside>
      </div>
    </section>
  );
}

export default Cart;