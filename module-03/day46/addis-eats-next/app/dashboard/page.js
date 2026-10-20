import { db } from "../../db";
import RevenueChart from "./RevenueChart";

export const metadata = {
  title: "Dashboard | Addis Eats",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const areas = ["Bole", "Kazanchis", "Megenagna"];

  const revenueData = areas.map((area) => ({
    area,
    revenue: orders
    .filter((order) => order.area === area)
    .reduce((sum, order) => sum + Number(order.total || 0), 0),
  }));

  const dailyCounts = {};

  for (const order of orders) {
    if (!order.createdAt) continue;
    const day = order.createdAt.slice(0, 10);
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  }

  const dailyOrders = Object.entries(dailyCounts)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([day, count]) => ({ day, count }));

  return ( 
    <main> 
      <h1>Addis Eats Dashboard</h1>

      <section> 
        <h2>Revenue by neighbourhood</h2> 
        <RevenueChart 
          revenueData={revenueData} 
          dailyOrders={dailyOrders} 
        /> 
      </section>
    </main>
  );
}
