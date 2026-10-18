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
  const email = formData.get("email");

  if (email !== mockUser.email) {
    redirect("/signin?error=invalid");
  }

  await createSession(mockUser);
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