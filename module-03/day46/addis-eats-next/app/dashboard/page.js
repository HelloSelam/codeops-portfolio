import { db } from "../../db";
import RevenueChart from "./RevenueChart";

export const metadata = {
  title: "Dashboard | Addis Eats",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const orders = await db.order.findMany();


  const revenueByNeighborhood = {};
  const ordersByDay = {};

  for (const order of orders) {
    const neighborhood = order.neighborhood || order.address?.neighborhood || "Unknown";

    const total = Number(order.total ?? order.totalETB ?? 0);

    revenueByNeighborhood[neighborhood] = (revenueByNeighborhood[neighborhood] || 0) + total;

    const day = order.createdAt
      ? new Date(order.createdAt).toISOString().slice(0, 10)
      : "Unknown";

    ordersByDay[day] = (ordersByDay[day] || 0) + 1;
  }

  const revenueData = Object.entries(revenueByNeighborhood).map(
    ([neighborhood, revenue]) => ({
      neighborhood,
      revenue,
    })
  );

  const dailyOrders = Object.entries(ordersByDay)
  .filter(([day]) => day !== "Unknown")
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([day, count]) => ({
    day,
    count,
  }));

return ( 
  <main> 
    <h1>Addis Eats Dashboard</h1>

    <p>Revenue and order activity across neighbourhoods.</p>

    <RevenueChart
      revenueData={revenueData}
      dailyOrders={dailyOrders}
    />
  </main>
  );
}
