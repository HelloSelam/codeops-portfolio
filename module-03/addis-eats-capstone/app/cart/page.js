"use client";

import Link from "next/link";
import { useCartStore } from "../../lib/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <span className="home-eyebrow">Your selection</span>
        <h1>Your Shopping Cart</h1>
        <p>Review your dishes before proceeding to checkout.</p>
      </div>

        {cart.length === 0 ? ( 
          <section className="empty-cart"> 
            <div className="empty-cart-icon" aria-hidden="true"> 
              🛒 
            </div> 
            <h2>Your cart is waiting for something delicious.</h2> 
            <p> 
              Explore our menu and add your favourite Ethiopian dishes. 
            </p> 
            <Link href="/menu" className="cart-primary-button"> 
              Explore the Menu 
            </Link> 
          </section> 
        ) : ( 
          <div className="cart-layout"> 
            <section className="cart-items" aria-label="Cart items"> 
              {cart.map((item) => ( 
                <article className="cart-item" key={item.id}> 
                  <div className="cart-item-info"> 
                    <h2>{item.name}</h2> 
                    <p> 
                      {item.quantity} ×{" "} 
                      {Number(item.price).toLocaleString()}{" "} 
                      {item.currency || "ETB"} 
                    </p> 
                  </div> 
                  
                  <div className="cart-item-actions"> 
                    <strong> 
                      {( 
                        Number(item.price) * item.quantity 
                      ).toLocaleString()}{" "} 
                      {item.currency || "ETB"} 
                    </strong> 
                    
                    <button 
                      type="button" 
                      className="remove-cart-button" 
                      onClick={() => removeFromCart(item.id)} 
                      aria-label={`Remove ${item.name} from cart`} 
                    > 
                      Remove 
                    </button> 
                  </div> 
                </article> 
              ))} 
            </section> 
            
            <aside className="cart-summary"> 
              <h2>Order Summary</h2> 
              
              <div className="cart-summary-line"> 
                <span>Items</span> 
                <span> 
                  {cart.reduce( 
                    (sum, item) => sum + item.quantity, 
                      0 
                  )} 
                </span> 
              </div> 
              
              <div className="cart-summary-line cart-total"> 
                <span>Total</span> 
                <span>{total.toLocaleString()} ETB</span> 
              </div> 
              
              <p className="cart-summary-note"> 
                Final order details will be reviewed at checkout. 
              </p> 
              
              <Link href="/checkout" className="cart-primary-button">   Proceed to Checkout 
              </Link> 
              
              <Link href="/menu" className="cart-continue-link"> 
                Continue Shopping 
              </Link> 
            </aside> 
          </div> 
        )}
    </main>
  );
}