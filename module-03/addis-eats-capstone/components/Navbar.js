"use client";

import Link from "next/link";
import { useCartStore } from "../lib/cartStore";
import { signOut } from "../app/action";

export default function Navbar({ session }) {
  const cart = useCartStore((state) => state.cart);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isSignedIn = Boolean(session?.userId); 
  const isStaff = session?.role === "staff";

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        Addis Eats
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        
        {!isStaff && (
          <Link href="/cart" className="cart-link">
            Cart <span className="cart-count">{cartCount}</span>
          </Link>
        )}

        {isSignedIn ? ( 
          <> 
            {isStaff ? ( 
              <Link href="/dashboard">Dashboard</Link> 
            ) : ( 
            <Link href="/orders">My Orders</Link> 
            )} 
            
            <span className="account-label"> 
              {session.name || session.email} 
            </span> 
            
            <form action={signOut}> 
              <button type="submit" className="signout-button"> 
                Sign Out 
              </button> 
            </form> 
          </> 
        ) : ( 
          <Link href="/signin" className="signin-link"> 
            Sign In 
          </Link> 
        )} 
      </nav>
    </header>
  );
}