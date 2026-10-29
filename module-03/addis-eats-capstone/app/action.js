"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../lib/session";
import { requireAuth } from "../lib/auth";
import { markCancelled } from "../db";

const mockUser = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
  role: "customer",
};

export async function signIn(formData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") || "");

  const customerEmail = process.env.DEMO_CUSTOMER_EMAIL?.toLowerCase();
  const customerPassword = process.env.DEMO_CUSTOMER_PASSWORD;

  const staffEmail = process.env.DEMO_STAFF_EMAIL?.toLowerCase();
  const staffPassword = process.env.DEMO_STAFF_PASSWORD;

  let user;

  if (
    customerEmail &&
    customerPassword &&
    email === customerEmail &&
    password === customerPassword
  ) {
    user = {
      id: "user_addis_101",
      name: "Abebe Bikila",
      email: customerEmail,
      role: "customer",
    };
  } else if (
    staffEmail &&
    staffPassword &&
    email === staffEmail &&
    password === staffPassword
  ) {
    user = {
      id: "user_addis_staff",
      name: "Addis Eats Staff",
      email: staffEmail,
      role: "staff",
    };
  }

  if (!user) {
    redirect("/signin?error=invalid");
  }

  await createSession(user);

  if (user.role === "staff") {
    redirect("/dashboard");
  }

  redirect("/orders");
}

export async function signOut() {
  await deleteSession();
  redirect("/signin");
}

export async function cancelOrder(orderId) {
  const session = await requireAuth();

  if (typeof orderId !== "string" || !orderId.startsWith("ord_")) {
    throw new Error("Invalid order ID");
  }

  return markCancelled(orderId, session.userId);
}