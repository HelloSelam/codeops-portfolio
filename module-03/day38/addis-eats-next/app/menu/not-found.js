import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>Dish Not Found</h2>
      <p>Sorry, we couldn't find that dish.</p>

      <Link href="/menu">Back to Menu</Link>
    </main>
  );
}
