import { Edit, Star, StarHalf, Trash } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ name, price, slug, image, rating, variant = "buyer" }) {
  function handleClick(action) {
    if (action === "delete") {
      alert(action);
    } else if (action === "edit") {
      alert(action);
    }
  }

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
      className="flex flex-col w-full h-full  rounded-xl shadow-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="h-3/4 w-full rounded-t-2xl overflow-hidden bg-gray-100">
        <img
          src={image || "https://placehold.net/default.png"}
          alt={name || "Unknown"}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Info */}
      <div className="flex h-1/3">
        <div className="flex flex-col items-center font-medium w-full h-full">
          <span>{name || "Name"}</span>
          <span>
            From{" "}
            <span className="text-orange-400">
              &#x0930;&#x0941;{price || 500}
            </span>
          </span>
          <Rating rating={rating || 3} />
        </div>
        {variant == "seller" && (
          <div className="flex flex-col h-full w-4/12">
            <button
              className="group flex flex-1 items-center justify-center bg-gray-200 rounded-sm m-1 mr-2 hover:bg-gray-300 transition duration-200"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClick("delete");
              }}
            >
              <Trash
                size={22}
                className="text-red-400 group-hover:text-red-600 transition duration-200"
              />
            </button>
            <button
              className="group flex flex-1 items-center justify-center bg-gray-200 rounded-sm m-1 mr-2 hover:bg-gray-300 transition duration-200"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClick("edit");
              }}
            >
              <Edit
                size={22}
                className="text-blue-400 group-hover:text-blue-600 transition duration-200"
              />
            </button>{" "}
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
