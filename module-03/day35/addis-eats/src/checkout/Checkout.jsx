import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartProvider";
import { validateCheckout } from "./validate";

function Checkout() {
  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    telebirr: "",
    area: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.priceETB * item.quantity,
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

    const validationErrors = validateCheckout(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (cart.length === 0) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section>
        <h1>Order received!</h1>
        <p>Thank you, {form.name}.</p>
        <p>Your order total is {total} ETB.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full name</label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="telebirr">TeleBirr number</label>

          <input
            id="telebirr"
            name="telebirr"
            value={form.telebirr}
            onChange={handleChange}
            placeholder="09XXXXXXXX"
          />

          {errors.telebirr && <p>{errors.telebirr}</p>}
        </div>

        <div>
          <label htmlFor="area">Delivery area</label>

          <input
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
          />

          {errors.area && <p>{errors.area}</p>}
        </div>

        <h2>Total: {total} ETB</h2>

        <button type="submit">Place order</button>
      </form>
    </section>
  );
}

export default Checkout;