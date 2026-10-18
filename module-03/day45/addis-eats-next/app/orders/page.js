import { requireAuth } from "../../lib/auth";
import { getOrdersFor } from "../../db";
import { signOut } from "../action";

export default async function OrdersPage() {
  const session = await requireAuth();
  const orders = await getOrdersFor(session.userId);

  return (
    <main>
      <h1>Your Orders</h1>

      <p>Signed in as {session.email}</p>

      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <article key={order.id}>
            <h2>Order {order.id}</h2>
            <p>Status: {order.status}</p>
          </article>
        ))
      )}
    </main>
  );
}