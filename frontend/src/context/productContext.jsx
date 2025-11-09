import { createContext, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const refetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/product`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      setIsHydrated(true);
    } catch (err) {
      console.error("Error refreshing products:", err);
    }
  };

  useEffect(() => {
    if (!isHydrated) {
      refetchProducts();
    }
  }, [isHydrated]);

  return (
    <ProductContext.Provider value={{ products, setProducts, refetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
