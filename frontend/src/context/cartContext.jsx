import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeItem = (id) => {
    setCartItems((prev) => {
      prev.filter((item) => item._id !== id);
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, CartContext };
