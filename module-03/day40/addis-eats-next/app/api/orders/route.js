import { orderSchema } from "../../../schema";
import { createOrder, getSession } from "../../../db";

export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Validation failed",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const order = await createOrder({
      ...result.data,
      userId: session.id,
    });

    return Response.json(order, { status: 201 });
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}