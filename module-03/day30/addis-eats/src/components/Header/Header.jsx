import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import './Header.css'

function Header() {
  const { items } = useContext(CartContext);
  const cartItemCount = items.reduce( (sum, item) => sum + item.quantity, 0 );

  return (
    <header>
      <div className="header-info">
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian Food</p>
      </div>

      <div className="cart-badge">
        🛒 Cart: {cartItemCount}
      </div>
    </header>
  )
}

export default Header
