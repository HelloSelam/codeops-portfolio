/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */
import { getMenu } from "./lib/menu";



// In-memory orders store

const mockOrders = [
  {
    id: "ord_demo_001",
    userId: "user_addis_101",
    area: "Bole",
    total: 850,
    status: "DELIVERED",
    createdAt: "2026-10-20T09:30:00.000Z",
  },
  {
    id: "ord_demo_002",
    userId: "user_addis_101",
    area: "Kazanchis",
    total: 1200,
    status: "CONFIRMED",
    createdAt: "2026-10-21T11:15:00.000Z",
  },
  {
    id: "ord_demo_003",
    userId: "user_addis_101",
    area: "Megenagna",
    total: 650,
    status: "PENDING",
    createdAt: "2026-10-21T13:45:00.000Z",
  },
  {
    id: "ord_demo_004",
    userId: "user_addis_101",
    area: "Bole",
    total: 1450,
    status: "DELIVERED",
    createdAt: "2026-10-22T08:20:00.000Z",
  },
  {
    id: "ord_demo_005",
    userId: "user_addis_101",
    area: "Kazanchis",
    total: 950,
    status: "CONFIRMED",
    createdAt: "2026-10-23T12:10:00.000Z",
  },
  {
    id: "ord_demo_006",
    userId: "user_addis_101",
    area: "Megenagna",
    total: 1750,
    status: "DELIVERED",
    createdAt: "2026-10-24T14:00:00.000Z",
  },
  {
    id: "ord_demo_007",
    userId: "user_addis_101",
    area: "Bole",
    total: 1100,
    status: "PENDING",
    createdAt: "2026-10-25T10:40:00.000Z",
  },
  {
    id: "ord_demo_008",
    userId: "user_addis_101",
    area: "Kazanchis",
    total: 720,
    status: "DELIVERED",
    createdAt: "2026-10-26T09:00:00.000Z",
  },
  {
    id: "ord_demo_009",
    userId: "user_addis_101",
    area: "Megenagna",
    total: 1350,
    status: "CONFIRMED",
    createdAt: "2026-10-27T15:30:00.000Z",
  },
  {
    id: "ord_demo_010",
    userId: "user_addis_101",
    area: "Kazanchis",
    total: 980,
    status: "DELIVERED",
    createdAt: "2026-10-28T08:45:00.000Z",
  },
  {
    id: "ord_demo_011",
    userId: "user_addis_101",
    area: "Kazanchis",
    total: 1600,
    status: "PENDING",
    createdAt: "2026-10-28T09:15:00.000Z",
  },
  {
    id: "ord_demo_012",
    userId: "user_addis_101",
    area: "Megenagna",
    total: 890,
    status: "DELIVERED",
    createdAt: "2026-10-28T10:00:00.000Z",
  },
];


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