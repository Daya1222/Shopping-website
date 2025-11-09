import { Edit, Star, StarHalf, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useProducts from "../hooks/useProduct";
import UpdateProduct from "./updateProduct";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function ProductCard({
  _id,
  name,
  price,
  slug,
  image,
  rating,
  variant = "buyer",
}) {
  const { refetchProducts } = useProducts();
  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  async function deleteItem(_id) {
    try {
      const response = await axios.delete(`${API_BASE}/api/product/${_id}`, {
        withCredentials: true,
      });
      await refetchProducts();
      console.log("Success: ", response);
    } catch (e) {
      console.log("Error", e);
    }
  }

  function EditingView() {
    return (
      <>
        {/* Blurry blue overlay */}
        <div className="fixed inset-0 bg-gray-200/10 backdrop-blur-sm z-[999]"></div>

        {/* Centered editing view */}
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div className="flex w-10/12 max-h-10/12 items-center justify-center text-white font-bold rounded shadow-lg">
            <UpdateProduct setStatus={setIsEditing} productId={_id} />
          </div>
        </div>
      </>
    );
  }

  async function editItem(_id) {
    setIsEditing(true);
  }

  const getImage = (image) => {
    return image.startsWith("http") ? image : `${API_BASE}${image}`;
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
    <>
      <div className="relative flex flex-col w-full h-100 sm:h-100 md:h-100 lg:h-100 rounded-xl shadow-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl mt-2">
        {/* Skeleton*/}
        {isLoading && (
          <div className="flex flex-col w-full h-60 absolute top-0 left-0 bg-gray-300 animate-pulse rounded-t-2xl justify-center">
            <div className="h-3/4 w-full bg-gray-300 animate-pulse" />
            <div className="flex h-1/3 p-2 items-center justify-between bg-white">
              <div className=" flex flex-col justify-center items-center space-y-2 w-8/12">
                <div className="h-4 bg-gray-300 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>

              <div
                className={`${variant === "seller" ? "flex flex-col" : "hidden"} space-y-2 w-4/12`}
              >
                <div className="h-6 w-6 bg-gray-300 rounded" />
                <div className="h-6 w-6 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Actual content */}
        <Link
          to={`/product/${slug}`}
          className={`flex flex-col w-full min-h-full rounded-xl transition-opacity duration-300 ${
            isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Image */}
          <div className="relative h-3/4 w-full rounded-t-2xl overflow-hidden bg-gray-100">
            <img
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              src={getImage(image) || "https://placehold.co/600x400"}
              alt={name || "Unknown"}
              className="w-full min-h-full object-cover transition-opacity duration-300"
            />
          </div>

          {/* Info */}
          <div className="flex h-1/3 ">
            <div className="flex flex-col items-center font-medium w-full h-full">
              <span className="p-2">{name || "Name"}</span>
              <span>
                From{" "}
                <span className="text-orange-400">
                  &#x0930;&#x0941;{price || 500}
                </span>
              </span>
              <Rating rating={rating || 0} />
            </div>

            {variant === "seller" && (
              <div className="flex flex-col h-full w-4/12">
                <button
                  className="group flex flex-1 items-center justify-center bg-gray-200 rounded-sm m-1 mr-2 hover:bg-gray-300 transition duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteItem(_id);
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
                    editItem(_id);
                  }}
                >
                  <Edit
                    size={22}
                    className="text-blue-400 group-hover:text-blue-600 transition duration-200"
                  />
                </button>
              </div>
            )}
          </div>
        </Link>
      </div>
      {isEditing && <EditingView />}
    </>
  );
}

export default ProductCard;
