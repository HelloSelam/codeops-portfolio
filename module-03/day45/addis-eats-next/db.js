/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */
import { getMenu } from "./lib/menu";



// In-memory orders store
const mockOrders = [];

export async function createOrder(data, userId) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const newOrder = {
    id: `ord_${crypto.randomUUID()}`,
    ...data,
    status: "PENDING",
    userId,
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);

  return newOrder;
}

export async function getOrdersFor(userId) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return mockOrders.filter((order) => order.userId === userId);
}

export async function getOrderFor(id, userId) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return mockOrders.find(
    (order) => order.id === id && order.userId === userId
  ) || null;
}

export async function markCancelled(id, userId) {
  const order = await getOrderFor(id, userId);

  if (!order) {
    throw new Error("Order not found or access denied");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();

  return order;
}

// Mock authenticated user session
const mockSessionUser = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
};

/**
 * ORM-style database query interface
 */
export const db = {
  dish: {
    findMany: async () => getMenu(),

    findUnique: async ({ where }) => getDish(where.id),
  },

  order: {
    findMany: async () => [...mockOrders],
  },
};

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  const dishes = await getMenu();

  return dishes.find((dish) => dish.id === id) || null;
}

/**
 * Read current authenticated user session
 */
export async function getSession() {
  return mockSessionUser;
}