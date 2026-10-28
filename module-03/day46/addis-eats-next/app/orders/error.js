"use client";

export default function OrdersError({ error, reset }) {
  return (
    <main>
      <h1>Unable to load orders</h1>
      <p role="alert">
        Something went wrong while loading your orders. Please try again.
      </p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
