import CheckoutForm from "../../components/CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <main className="checkout-page">
      <h1>Checkout</h1>
      <p>Review your order and enter your contact details.</p>

      <CheckoutForm />
    </main>
  );
}