import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./session";

export async function requireAuth() {
  const session = await getSession();

  if (!session?.userId) {
    redirect("/signin");
  }

  return session;
}

export async function requireStaff() {
  const session = await requireAuth();

  if (session.role !== "staff") {
    redirect("/orders");
  }

  return session;
}