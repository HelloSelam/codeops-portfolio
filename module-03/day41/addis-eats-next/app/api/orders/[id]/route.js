import { getOrder, getSession } from "../../../../db";

export async function GET(request, {params}) {
  const {id} = await params;

  const session = await getSession();
  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const order = await getOrder(id);
  if (!order) {
    return Response.json(
      { error: "Order not found"},
      { status: 404 }
    );
  }

  if (order.userId !== session.id) {
    return Response.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  return Response.json(order);
}
