"use client";

import { useActionState, useEffect } from "react";
import { useCartStore } from "../lib/cartStore";
import { placeOrder } from "../app/actions";

const initialState = {
  success: false,
  error: null,
  fieldErrors: {},
};

export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(
    placeOrder,
    initialState
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (state.success) {
      clearCart();
    }
  }, [state.success, clearCart]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (state.success) {
    return (
      <section className="order-success">
        <h2>Order placed successfully!</h2>
        <p>Thank you for ordering with Addis Eats.</p>
        <p>Order ID: {state.order?.id}</p>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section>
        <p>Your cart is empty. Add some dishes before checking out.</p>
      </section>
    );
  }

  return (
    <form action={formAction} className="checkout-form">
      <h2>Your Order</h2>

      {cart.map((item) => (
        <div className="checkout-item" key={item.id}>
          <span>
            {item.name} × {item.quantity}
          </span>

          <span>{item.price * item.quantity} ETB</span>
        </div>
      ))}

      <input
        type="hidden"
        name="cart"
        value={JSON.stringify(cart)}
      />

      <h3>Total: {cartTotal} ETB</h3>

      <hr />

      <h2>Customer Details</h2>

      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}

      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        minLength={2}
      />
      {state.fieldErrors?.name?.map((error) => (
        <p className="form-error" key={error}>{error}</p>
      ))}

      <label htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        required
        placeholder="0912345678"
      />
      {state.fieldErrors?.phone?.map((error) => (
        <p className="form-error" key={error}>{error}</p>
      ))}

      <label htmlFor="notes">Order Notes (Optional)</label>
      <textarea
        id="notes"
        name="notes"
        maxLength={200}
      />
      {state.fieldErrors?.notes?.map((error) => (
        <p className="form-error" key={error}>{error}</p>
      ))}

      <button type="submit" disabled={isPending}>
        {isPending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}