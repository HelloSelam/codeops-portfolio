"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

const initialState = {
  fieldErrors: {},
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
        />

        {state?.fieldErrors?.name && (
          <p role="alert">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>

        <input
          id="phone"
          name="phone"
        />

        {state?.fieldErrors?.phone && (
          <p role="alert">
            {state.fieldErrors.phone[0]}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Place Order"}
      </button>

      {state?.success && (
        <p>
          Order {state.order.id} created successfully!
        </p>
      )}
    </form>
  );
}