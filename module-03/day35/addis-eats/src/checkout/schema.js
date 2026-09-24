import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  telebirr: z
    .string()
    .trim()
    .regex(/^09\d{8}$/, "Enter a valid TeleBirr number"),

  area: z
    .string()
    .trim()
    .min(1, "Delivery area is required"),
});