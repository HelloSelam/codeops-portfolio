"use server";

import { orderSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function placeOrder(previousState, formData) {
  const result = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
  });

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const order = {
    id: `ord_${Date.now()}`,
    name: result.data.name,
    phone: result.data.phone,
    total: 0,
    currency: "ETB",
  };

  revalidatePath("/orders");

  return {
    success: true,
    order,
  };
}

export async function cancelOrder(orderId) {
  // Check who is signed in
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  // Look up the order
  const order = await getOrder(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  // Check ownership 
  if (order.userId !== user.id) {
    throw new Error("Not yours");
  }

  // Cancel the order
  await markCancelled(orderId);

  revalidatePath("/orders");
}