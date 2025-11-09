import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (newItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product._id === newItem.product._id,
      );

      if (existing) {
        return prev.map((item) =>
          item.product._id === newItem.product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product: newItem.product, quantity: 1 }];
    });
  };

  const decrementItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.product._id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, decrementItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, CartContext };
