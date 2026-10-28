import CheckoutForm from "../../components/CheckoutForm";
import { requireAuth } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await requireAuth();

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>
      <p>Review your order and enter your contact details.</p>

      <CheckoutForm />
    </main>
  );
}