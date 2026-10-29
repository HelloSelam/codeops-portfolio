"use server";

import { orderSchema, orderItemsSchema } from "../schema";
import { createOrder, getDish } from "../db";
import { getSession } from "../lib/session";

export async function placeOrder(previousState, formData) {
  const session = await getSession();

  if (!session?.userId) {
    return {
      success: false,
      error: "You must be logged in to place an order.",
      fieldErrors: {},
    };
  }

  const customerResult = orderSchema.safeParse({ 
    name: formData.get("name"), 
    phone: formData.get("phone"), 
    notes: formData.get("notes") || "", 
  }); 
  
  if (!customerResult.success) { 
    return { 
      success: false,
      error: null, 
      fieldErrors: customerResult.error.flatten().fieldErrors, 
    };
  } 
  
  let submittedCart; 
  
  try { 
    submittedCart = JSON.parse(formData.get("cart") || "[]"); 
  } catch { 
    return { 
      success: false, 
      error: "Your cart could not be read. Please review your order.", 
      fieldErrors: {}, 
    }; 
  }

  const cartResult = orderItemsSchema.safeParse( 
    Array.isArray(submittedCart) 
      ? submittedCart.map((item) => ({ 
          id: item?.id, 
          quantity: item?.quantity, 
        })) 
      : submittedCart 
  ); 
  
  if (!cartResult.success) { 
    return { 
      success: false, 
      error: cartResult.error.issues[0]?.message || "Your cart is invalid.", 
      fieldErrors: {}, 
    }; 
  } 
  
  const items = []; 
  let total = 0; 
  
  for (const cartItem of cartResult.data) { 
    const dish = await getDish(cartItem.id); 
    
    if (!dish || dish.available === false) { 
      return { 
        success: false, 
        error: "One or more dishes are unavailable. Please review your cart.", 
        fieldErrors: {}, 
      }; 
    } 
    
    const price = Number(dish.price ?? dish.priceETB); 
    
    if (!Number.isFinite(price) || price < 0) { 
      return { 
        success: false, 
        error: "We couldn't verify a dish price. Please try again later.", 
        fieldErrors: {}, 
      }; 
    } 
      
    items.push({ 
      dishId: dish.id, 
      name: dish.name ?? dish.nameEn, 
      quantity: cartItem.quantity, 
      price, 
      subtotal: price * cartItem.quantity, 
    }); 
    
    total += price * cartItem.quantity; 
  } 
    
  try { 
    const order = await createOrder( 
      { 
        name: customerResult.data.name, 
        phone: customerResult.data.phone, 
        notes: customerResult.data.notes, 
        items, 
        total, 
        area: "Unspecified", 
      }, 
      session.userId 
    ); 
      
    return { 
      success: true, 
      order, 
      fieldErrors: {}, 
    }; 
  } catch { 
    return { 
      success: false, 
      error: "We couldn't place your order. Please try again.", 
      fieldErrors: {}, 
    }; 
  } 
}