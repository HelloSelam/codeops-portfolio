import { requireStaff } from "../../lib/auth";
import { db } from "../../db";
import RevenueChart from "./RevenueChart";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  await requireStaff();

  const orders = await db.order.findMany();
  
  const revenueByArea = {}; 
  const ordersByDate = {}; 
  
  for (const order of orders) { 
    const area = order.area || "Unspecified"; 
    const revenue = Number(order.total) || 0; 
    
    revenueByArea[area] = (revenueByArea[area] || 0) + revenue; 
    
    if (order.createdAt) { 
      const date = new Date(order.createdAt); 
      
      if (!Number.isNaN(date.getTime())) { 
        const dateLabel = date.toISOString().slice(0, 10); 
        ordersByDate[dateLabel] = (ordersByDate[dateLabel] || 0) + 1; 
      } 
    } 
  } 

  const recordedDates = Object.keys(ordersByDate).sort();

  let ordersData = [];

  if (recordedDates.length > 0) {
    const firstDate = new Date(`${recordedDates[0]}T00:00:00Z`);
    const lastDate = new Date(
      `${recordedDates[recordedDates.length - 1]}T00:00:00Z`
    );

    const currentDate = new Date(firstDate);

    while (currentDate <= lastDate) {
      const dateLabel = currentDate.toISOString().slice(0, 10);

      ordersData.push({
        date: dateLabel,
        count: ordersByDate[dateLabel] || 0,
      });

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
  }
  
  const revenueData = Object.entries(revenueByArea).map( 
    ([area, revenue]) => ({ 
      area, 
      revenue, 
    }) 
  ); 
  
  const totalRevenue = orders.reduce( 
    (sum, order) => sum + (Number(order.total) || 0), 
    0 
  ); 
  
  return ( 
  <main> 
    <h1>Management Dashboard</h1> 
    <section aria-labelledby="summary-heading"> 
      <h2 id="summary-heading">Order Summary</h2> 
      <p>Total orders: {orders.length}</p> 
      <p> 
        Total recorded revenue:{" "} 
        {new Intl.NumberFormat("en-ET", { 
          style: "currency", 
          currency: "ETB", 
          maximumFractionDigits: 2, 
          }).format(totalRevenue)} 
      </p> 
    </section> 
    
    {orders.length === 0 ? ( 
      <section> 
        <h2>No orders yet</h2> 
        <p> 
          Order and revenue charts will appear when customers place orders. 
        </p> 
      </section> 
    ) : ( 
      <RevenueChart 
        revenueData={revenueData} 
        ordersData={ordersData} 
      /> 
    )} 
  </main> 
  ); 
}
