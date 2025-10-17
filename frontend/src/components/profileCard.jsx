import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ChevronDown } from "lucide-react";

function ProfileCard({ variant = "concise", showChevron = false }) {
  const navigate = useNavigate(null);
  const { user } = useUser();
  console.log(user);

  function handleClick() {
    alert("clicked");
  }

  if (variant === "concise") {
    return (
      <div
        className="relative cursor-pointer group"
        onClick={() => handleClick()}
      >
        <img
          src={user?.profilePicUrl || "https://placehold.co/150x150"}
          alt={user?.name || "User"}
          className="w-10 h-10 border-2 border-gray-200 object-cover rounded-full transition-all duration-200 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-100"
          onError={(e) => {
            e.target.src = "https://placehold.co/150x150";
          }}
        />
        {showChevron && (
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-200 shadow-sm group-hover:border-blue-400 transition-colors duration-200">
            <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3 cursor-pointer rounded-xl p-2.5 transition-all duration-200 hover:bg-gray-50 group"
      onClick={() => handleClick()}
    >
      <div className="relative">
        <img
          src={user?.profilePicUrl || "https://placehold.co/150x150"}
          alt={user?.name || "User"}
          className="w-10 h-10 border-2 border-gray-200 object-cover rounded-full transition-all duration-200 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-100"
          onError={(e) => {
            e.target.src = "https://placehold.co/150x150";
          }}
        />
        {showChevron && (
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-200 shadow-sm group-hover:border-blue-400 transition-colors duration-200">
            <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
        {user?.name}
      </span>
    </div>
  );
}

export default ProfileCard;
