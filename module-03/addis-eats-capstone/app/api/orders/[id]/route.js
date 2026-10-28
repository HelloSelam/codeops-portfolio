import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/session";
import { getOrderFor } from "../../../../db";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = await getOrderFor(id, session.userId);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}