import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import Cart from "./Cart";
import NotFound from "./NotFound";
import SignIn from "./auth/SignIn";
import RequireAuth from "./auth/RequireAuth";
import { lazy, Suspense } from "react";

const Checkout = lazy(() => import("./checkout/Checkout"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:id" element={<DishDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <Suspense fallback={<p>Loading checkout...</p>}>
                <Checkout />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;