import { notFound } from "next/navigation";
import { getOrderFor } from "../../../db";
import { requireAuth } from "../../../lib/auth";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const session = await requireAuth();

  const order = await getOrderFor(id, session.userId);

  if (!order) {
    notFound();
  }

  return <OrderStatus id={id} initial={order} />;
}