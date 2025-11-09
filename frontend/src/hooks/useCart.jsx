import { useContext } from "react";
import { CartContext } from "../context/cartContext";

function useCart() {
  const context = useContext(CartContext);

  if (!context) throw new Error("UseCart must beused within CartProvider");
  return context;
}

export default useCart;
