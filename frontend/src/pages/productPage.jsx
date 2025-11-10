import { useParams } from "react-router-dom";
import { useState } from "react";
import useProducts from "../hooks/useProduct";
import { Star, Package, Tag, ShoppingCart } from "lucide-react";
import useCart from "../hooks/useCart";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ProductPage() {
  const { _id } = useParams();
  const { products } = useProducts();
  const { cartItems, addItem, removeItem, clearCart } = useCart();

  const product = products.find((product) => product._id === _id);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (stars) => {
    alert(`You clicked ${stars} stars!`); // Alert to confirm it's working
    console.log(`User rated ${stars} stars for product ${_id}`);

    try {
      const response = await axios.post(
        `${API_BASE}/review/rating/${_id}`,
        { rating: stars },
        { withCredentials: true },
      );
      console.log(response);
    } catch (err) {
      console.log("Error while rating the product", err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Image Section */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg object-cover aspect-square"
            />
            {product.stock < 10 && product.stock > 0 && (
              <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                <Tag className="w-3.5 h-3.5" />
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled =
                    starValue <= (hoverRating || Math.floor(product.rating));

                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => handleRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0 border-0 bg-transparent cursor-pointer"
                    >
                      <Star
                        size={20}
                        fill={isFilled ? "#79B259" : "transparent"}
                        stroke={isFilled ? "#79B259" : "#d1d5db"}
                        className="transition-transform hover:scale-110"
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-8">
              <Package className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">
                {product.stock > 0 ? (
                  <span className="text-[#79B259] font-medium">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </span>
            </div>

            <div className="mt-auto">
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  &#x0930;&#x0941;{product.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => addItem({ product })}
                disabled={product.stock === 0}
                className="w-full bg-[#79B259] hover:bg-[#6a9d4d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
