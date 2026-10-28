"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const etb = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);

export default function RevenueChart({
  revenueData,
  dailyOrders,
}) {
  const firstDay = dailyOrders[0]?.day;
  const lastDay = dailyOrders[dailyOrders.length - 1]?.day;

  const range = 
  firstDay && lastDay 
  ? `${firstDay} to ${lastDay}` 
  : "No recorded dates";

return ( 
  <div> 
    <section aria-labelledby="revenue-title"> <h2 id="revenue-title">Revenue by neighbourhood</h2>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueData}
            margin={{ top: 20, right: 20, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="area" />
            <YAxis
              width={100}
              tickFormatter={etb}
            />
            <Tooltip
              formatter={(value) => [etb(value), "Revenue"]}
            />
            <Bar
              dataKey="revenue"
              fill="#1B4D8E"
              name="Revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>

    <section aria-labelledby="daily-orders-title">
      <h2 id="daily-orders-title">
        Orders per day: {range}
      </h2>

      <p>Unit: number of orders per day.</p>

      {dailyOrders.length === 0 ? (
        <p>No order activity is available for this period.</p>
      ) : (
        <>
          <div
            style={{ width: "100%", height: 320 }}
            role="img"
            aria-label={`Line chart showing orders per day from ${range}. The table below provides the same data.`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1B4D8E"
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <table>
            <caption>Daily order counts for {range}</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Number of orders</th>
              </tr>
            </thead>
            <tbody>
              {dailyOrders.map((item) => (
                <tr key={item.day}>
                  <td>{item.day}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  </div>
  );
}
