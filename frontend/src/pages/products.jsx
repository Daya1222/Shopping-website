import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/producCard";
import { Plus } from "lucide-react";
import { useState } from "react";

function Product() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Add Product  */}
      <div
        className="flex justify-center items-center m-2 p-0 border-2 border-gray-300 hover:text-gray-800 rounded-4xl bg-gray-300 hover:bg-gray-400 text-3xl  active:bg-gray-400 text-gray-800 font-bold cursor-pointer transition duration-200"
        onClick={() => navigate("/seller/add-product")}
      >
        <span className="m-2">Add Product </span>
        <Plus size={40} />
      </div>
      {/* Product list */}
      <div className="grid place-items-center lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 pl-2 pr-2 pb-2 gap-2">
        <ProductCard
          name="book"
          price={45}
          image={
            "https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg?cs=srgb&dl=antique-book-book-bindings-1005324.jpg&fm=jpg"
          }
          rating={4}
          variant={"seller"}
        />
        <ProductCard variant="seller" />
      </div>
    </div>
  );
}

export default Product;
