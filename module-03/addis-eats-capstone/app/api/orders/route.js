import { NextResponse } from "next/server";
import { orderSchema, orderItemsSchema } from "../../../schema";
import { createOrder, getDish } from "../../../db";
import { getSession } from "../../../lib/session";

export async function GET() {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({ 
    error: "Use the orders page to view your orders.", 
  }, { 
    status: 405, 
  }); 
}

export async function POST(request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const customerResult = orderSchema.safeParse({ 
    name: body.name, 
    phone: body.phone, 
    notes: body.notes ?? "", 
  }); 
  
  if (!customerResult.success) { 
    return NextResponse.json( 
      { 
        error: "Validation failed.", 
        fieldErrors: customerResult.error.flatten().fieldErrors, 
      }, 
      { status: 422 } 
    ); 
  } 
  
  const cartResult = orderItemsSchema.safeParse( 
    Array.isArray(body.items) 
      ? body.items.map((item) => ({ 
          id: item?.id, 
          quantity: item?.quantity, 
        })) 
      : body.items 
  ); 
  
  if (!cartResult.success) { 
    return NextResponse.json( 
      { 
        error: "Invalid order items.", 
        details: cartResult.error.issues, 
      }, 
      { status: 422 } 
    ); 
  } 
  
  const items = []; 
  let total = 0; 
  
  for (const cartItem of cartResult.data) { 
    const dish = await getDish(cartItem.id); 
    
    if (!dish || dish.available === false) { 
      return NextResponse.json( 
        { error: "One or more dishes are unavailable." }, 
        { status: 422 } 
      ); 
    } 
    
    const price = Number(dish.price ?? dish.priceETB); 
    
    if (!Number.isFinite(price) || price < 0) { 
      return NextResponse.json( 
        { error: "A dish price could not be verified." }, 
        { status: 500 } 
      ); 
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
        total, area: "Unspecified", 
      }, 
      session.userId 
    ); 
    
    return NextResponse.json(order, { status: 201 }); 
  } catch { 
    return NextResponse.json( 
      { error: "Unable to create the order." }, 
      { status: 500 }
    );
  }
}