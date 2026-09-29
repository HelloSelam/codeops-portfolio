import Link from "next/link";

export default function CheckoutPage() {
  return(
    <main>
      <h1>Checkout</h1>
      <p>Complete your order here.</p>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/menu">Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
      </nav>
    </main>
  );
}