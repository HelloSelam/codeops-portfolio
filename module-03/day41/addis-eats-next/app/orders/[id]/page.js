import { notFound } from "next/navigation";
import { getOrder, getSession } from "../../../db";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const {id} = await params;
  const session = await getSession();

  if (!session) {
    notFound();
  }

  const order = await getOrder(id);

  if (!order || order.userId !== session.id) {
    notFound();
  }

  return <OrderStatus id={id} initial={order}/>
}