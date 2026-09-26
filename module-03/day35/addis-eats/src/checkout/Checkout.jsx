import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../cart/cartStore";
import { checkoutSchema } from "./schema";

function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    name: "",
    telebirr: "",
    area: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    clearCart();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="order-success">
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>

        <h1>Order placed successfully!</h1>

        <p className="eyebrow">Thank you! Your order has been received.</p>

        <Link to="/menu" className="primary-button">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Complete your order.</h1>
        <p>
          Enter your delivery details and confirm your order.
        </p>
      </div>

      <div className="checkout-layout">

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full name </label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="telebirr">TeleBirr number </label>

            <input
              id="telebirr"
              name="telebirr"
              value={form.telebirr}
              onChange={handleChange}
              placeholder="09XXXXXXXX"
            />

            {errors.telebirr && <p className="field-error">{errors.telebirr}</p>}
          </div>

          <div>
            <label htmlFor="area">Delivery area </label>

            <textarea
              id="area"
              name="area"
              value={form.area}
              onChange={handleChange}
            />

            {errors.area && <p className="field-error">{errors.area}</p>}
          </div>

          <h2>Total: {total} ETB</h2>

          <button type="submit" className="primary-button checkout-submit">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <p className="eyebrow">YOUR ORDER</p>

          {cart.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              
              <div>
                <strong>{item.nameEn}</strong>
                <span>
                  {item.quantity} × {item.priceETB} ETB
                </span>
              </div>

              <strong>
                {item.priceETB * item.quantity} ETB
              </strong>
            </div>
          ))}

          <div className="summary-divider"></div>

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

          <div className="summary-total">
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;