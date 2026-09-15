import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Cart from "./Cart";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;