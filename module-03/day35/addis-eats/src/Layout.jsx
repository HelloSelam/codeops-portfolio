import { Link, Outlet } from "react-router-dom";
import { useCart } from "./cart/CartProvider";
import { useAuth } from "./auth/AuthProvider";


function Layout() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="site-header">
        <Link to="/" className="logo">
          Addis Eats
        </Link>

        <nav>
          <Link to="/">Home</Link>

          <Link to="/menu">Menu</Link>

          <Link to="/cart">
            Cart
            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="account-area">
              <span>
                Hi, {user.name}
              </span>

              <button
                onClick={signOut}
                className="logout-button"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link to="/signin">
              Sign in
            </Link>
          )}
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