/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */

// Mock dish records
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

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
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  const dish = mockDishes.find((d) => d.id === id);
  return dish || null;
}

/**
 * Read current authenticated user session
 */
export async function getSession() {
  return mockSessionUser;
}