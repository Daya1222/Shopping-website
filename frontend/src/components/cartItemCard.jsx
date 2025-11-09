import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBigLeft, Star } from "lucide-react";
import useCart from "../hooks/useCart";

const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || "";

function CartItemCard({ item }) {
  const { addItem, decrementItem, removeItem } = useCart();
  const [stockError, setStockError] = useState(false);

  const { product, quantity } = item;
  const { _id, name, price, stock, rating, image, slug } = product;

  const getImage = (img) =>
    img.startsWith("http") ? img : `${IMAGE_BASE}${img}`;

  const handleClick = (task) => {
    setStockError(false);

    if (task === "INCREMENT") {
      if (quantity < stock) {
        addItem({ product });
      } else {
        setStockError(true);
      }
    }

    if (task === "DECREMENT") {
      if (quantity > 1) {
        decrementItem(_id);
      } else {
        removeItem(_id);
      }
    }
  };

  function Rating({ rating }) {
    return (
      <div className="flex items-center p-1">
        {[...Array(5)].map((_, i) => {
          if (i + 1 <= Math.floor(rating)) {
            return (
              <Star
                key={i}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            );
          } else if (i < rating) {
            return (
              <StarHalf
                key={i}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            );
          } else {
            return <Star key={i} size={16} className="text-gray-300" />;
          }
        })}
      </div>
    );
  }

  return (
    <Link
      to={`/product/${slug}`}
      className="flex items-center w-11/12 md:w-5/6 rounded-sm shadow-sm p-2 hover:bg-gray-50 transition bg-white"
    >
      {/* Image */}
      <img
        className="w-1/4 h-20 md:h-30 object-cover"
        src={getImage(image)}
        alt={name}
      />

      {/* Name */}
      <span className="flex flex-col items-center w-1/3 justify-center text-center">
        {name}
      </span>

      {/* Price and rating */}
      <div className="flex flex-col w-1/4 items-center">
        <div>₹{price}</div>
        <Rating rating={rating} />
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col w-1/3">
        <div className="grid grid-cols-3 justify-center items-center h-1/2 gap-1">
          <button
            className="bg-gray-200 hover:bg-gray-400 rounded-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick("DECREMENT");
            }}
          >
            -
          </button>

          <span className="text-center">{quantity}</span>

          <button
            className="bg-gray-200 hover:bg-gray-400 rounded-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick("INCREMENT");
            }}
          >
            +
          </button>
        </div>

        {/* Stock Error */}
        {stockError && (
          <div className="text-sm text-red-500 text-center mt-1">
            Out of stock.
          </div>
        )}
      </div>
    </Link>
  );
}

export default CartItemCard;
