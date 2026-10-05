import Link from "next/link";

const categories = [
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Raw & Cured Delicacies / Kitfo",
  "Fasting & Vegan / Tsom",
  "Beverages & Tej",
];

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <h2>Categories</h2>

        <nav>
          <ul>
            <li>
              <Link href="/menu">All</Link>
            </li>

            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/menu?category=${encodeURIComponent(category)}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}