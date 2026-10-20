"use client";

import useSWR from "swr";
import fetcher from "../../../lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error, isLoading} = useSWR(
    `/api/orders/${id}`, 
    fetcher, {
      fallbackData: initial,
      refreshInterval: 5000,
    }
  );

  if (isLoading && !data) {
    return <p>Loading order...</p>
  }

  if (error && !data) {
    return <p>Could not load order. Please try again.</p>
  }

  if (!data) {
    return <p>Order not found.</p>
  }

  return (
    <main>
      <h1>Order Status</h1>
      <p> 
        <strong>Order ID:</strong> {data.id}
      </p>
      <p> 
        <strong>Status:</strong> {data.status}
      </p>
      <p> 
        <strong>Customer</strong> {data.name}
      </p>
    </main>
  );

}