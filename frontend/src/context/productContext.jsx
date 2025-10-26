import { createContext, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      fetch(`${API_BASE}/api/product`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setIsHydrated(true);
        });
    }
  }, [isHydrated]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
