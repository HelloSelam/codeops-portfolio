import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import Cart from "./Cart";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:id" element={<DishDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;