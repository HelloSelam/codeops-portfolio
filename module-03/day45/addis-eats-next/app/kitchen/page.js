import { requireStaff } from "../../lib/auth";

export default async function KitchenPage() {
  const session = await requireStaff();

  return (
    <main>
      <h1>Kitchen Dashboard</h1>
      <p>Welcome, {session.email}</p>
    </main>
  );
}