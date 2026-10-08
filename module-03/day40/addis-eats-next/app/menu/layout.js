export default function MenuLayout({ children }) {
  return (
    <section>
      <aside>
        <p>Categories</p>
      </aside>

      <div>{children}</div>
    </section>
  );
}