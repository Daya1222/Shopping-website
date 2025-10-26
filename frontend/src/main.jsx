import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <UserProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </UserProvider>
    </CartProvider>
  </StrictMode>,
);
