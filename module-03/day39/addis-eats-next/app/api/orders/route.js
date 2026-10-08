import { orderSchema } from "@/lib/schema";

export async function POST(request) {
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

  const order = {
    id: `ord_${Date.now()}`,
    name: result.data.name,
    phone: result.data.phone,
    total: 0,
    currency: "ETB",
  };

  return Response.json(order, { status: 201 });
}