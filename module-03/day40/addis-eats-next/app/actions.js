"use server";

import { orderSchema } from "../schema";
import { createOrder, getDish, getSession } from "../db";

export async function placeOrder(previousState, formData) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to place an order.",
    };
  }

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    notes: formData.get("notes") || undefined,
  };

  const result = orderSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  let cart;

  try {
    cart = JSON.parse(formData.get("cart") || "[]");
  } catch {
    return {
      success: false,
      error: "Your cart is invalid. Please review your order.",
    };
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    return {
      success: false,
      error: "Your cart is empty.",
    };
  }

  const orders = [];

  for (const item of cart) {
    if (
      typeof item.id !== "string" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      return {
        success: false,
        error: "Your cart contains an invalid item.",
      };
    }

    const dish = await getDish(item.id);

    if (!dish || !dish.available) {
      return {
        success: false,
        error: "One of your selected dishes is unavailable.",
      };
    }

    const order = await createOrder({
      name: result.data.name,
      phone: result.data.phone,
      notes: result.data.notes,
      dishId: dish.id,
      quantity: item.quantity,
      userId: session.id,
    });

    orders.push(order);
  }

  return {
    success: true,
    order: orders[0],
    orderCount: orders.length,
  };
}