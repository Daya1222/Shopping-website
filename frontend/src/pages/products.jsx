import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard";
import { Plus } from "lucide-react";
import useProducts from "../hooks/useProduct";
import useUser from "../hooks/useUser.jsx";
import Footer from "../components/footer.jsx";
import { useState } from "react";
import Fuse from "fuse.js";

function Product() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const fuse = new Fuse(products, {
    keys: ["name", "category", "description"],
    threshold: 0.3,
  });

  const filteredProducts = search.trim()
    ? fuse.search(search).map((result) => result.item)
    : products;

  return (
    <div className="w-full h-full">
      {(user.role === "seller" || user.role === "admin") && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-gray-100 rounded-md shadow-sm">
          {/* Search Bar */}
          <div className="flex-grow">
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search my products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              autoFocus
            />
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => navigate("/seller/add-product")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-full border border-gray-400 transition duration-200"
          >
            <Plus size={24} />
            <span>Add Product</span>
          </button>
        </div>
      )}

      {/* Product list */}
      <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 px-2 pb-2">
        {filteredProducts
          .filter((item) => item.sellerId === user._id)
          .map((item) => (
            <ProductCard
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              rating={item.rating}
              slug={item.slug}
              variant={
                ["seller", "admin"].includes(user.role) ? "seller" : "buyer"
              }
            />
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default Product;
