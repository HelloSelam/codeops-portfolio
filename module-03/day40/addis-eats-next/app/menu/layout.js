import CategoryBar from "../../components/CategoryBar";

export default function MenuLayout({ children }) {
  return (
    <section>
      <aside>
        <p>Categories</p>
        <CategoryBar />
      </aside>

      <div>{children}</div>
    </section>
  );
}