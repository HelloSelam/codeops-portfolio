import { z } from "zod";
export const orderSchema = z.object({
    name: z
        .string() 
        .trim() 
        .min(2, "Name must be at least 2 characters."),
    phone: z
        .string() 
        .trim() 
        .regex( 
            /^(09|\+2519)\d{8}$/, 
            "Enter a valid Ethiopian phone number." 
        ),
    notes: z
        .string() 
        .max(200, "Notes cannot exceed 200 characters.") 
        .optional() 
        .default(""),
});

export const orderItemsSchema = z 
    .array( 
        z.object({ 
            id: z.string().min(1, "Invalid dish."), 
            quantity: z 
                .number() 
                .int("Quantity must be a whole number.") 
                .min(1, "Quantity must be at least 1.") 
                .max(20, "Maximum quantity per dish is 20."), 
            }) 
        ) 
        .min(1, "Your cart is empty.") 
        .max(30, "Your order contains too many items.");