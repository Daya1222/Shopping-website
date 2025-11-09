import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard";
import { Plus } from "lucide-react";
import useProducts from "../hooks/useProduct";
import useUser from "../hooks/useUser.jsx";
import Footer from "../components/footer.jsx";

function Product() {
  const navigate = useNavigate();

  const { products } = useProducts();
  const { user } = useUser();

  return (
    <div className="w-full h-full">
      {/* Add Product  */}
      {(user.role === "seller" || user.role === "admin") && (
        <div
          className="flex justify-center items-center m-2 p-0 border-2 border-gray-300 hover:text-gray-800 rounded-4xl bg-gray-300 hover:bg-gray-400 text-3xl  active:bg-gray-400 text-gray-800 font-bold cursor-pointer transition duration-200"
          onClick={() => navigate("/seller/add-product")}
        >
          <span className="m-2">Add Product </span>
          <Plus size={40} />
        </div>
      )}
      {/* Product list */}
      <div className="grid place-items-center grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 pl-2 pr-2 pb-2 gap-2">
        {products
          .filter((item) => item.sellerId === user._id)
          .map((item) => {
            return (
              <ProductCard
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                rating={item.rating}
                slug={item.slug}
                variant={
                  user.role === "seller" || user.role === "admin"
                    ? "seller"
                    : "buyer"
                }
              />
            );
          })}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
