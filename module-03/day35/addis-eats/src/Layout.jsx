import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Addis Eats</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Addis Eats</p>
      </footer>
    </>
  );
}

export default Layout;