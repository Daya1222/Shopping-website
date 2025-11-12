import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const refetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/product`, {
        withCredentials: true,
      });
      setProducts(res.data);
      setIsHydrated(true);
    } catch (err) {
      console.error("Error refreshing products:", err);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/product/${id}`, {
        withCredentials: true,
      });

      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === id ? res.data : p)),
      );

      return res.data;
    } catch (error) {
      console.error("Error while fetching product:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!isHydrated) {
      refetchProducts();
    }
  }, [isHydrated]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, refetchProducts, fetchProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
