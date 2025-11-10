import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Landing from "./pages/landing.jsx";
import NotFound from "./pages/NotFound.jsx";

import ProtectedRoutes from "./components/protectedRoutes.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Profile from "./pages/profile.jsx";
import AddProduct from "./pages/addProduct.jsx";
import Products from "./pages/products.jsx";
import Help from "./pages/help.jsx";
import Cart from "./pages/cart.jsx";
import ProductPage from "./pages/productPage.jsx";
import Checkout from "./pages/checkout.jsx";
import SearchPage from "./pages/searchPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/seller/add-product"
            element={
              <ProtectedRoutes>
                <AddProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoutes>
                <Products />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoutes>
                <Checkout />
              </ProtectedRoutes>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:slug/:_id" element={<ProductPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
