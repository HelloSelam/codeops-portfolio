import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="logo">
          Addis Eats
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Made with love in Addis Ababa.</p>
      </footer>
    </>
  );
}

export default Layout;