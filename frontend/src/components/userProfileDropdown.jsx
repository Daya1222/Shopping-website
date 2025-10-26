import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import {
  ChevronDown,
  HelpCircle,
  Settings,
  User2,
  LogOut,
  CircleAlert,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function ProfileCard({ variant = "concise" }) {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  console.log(user.profilePicUrl);

  const [profileMenu, setProfileMenu] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const menuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const isFull = variant === "full";

  const toggleMenu = () => {
    setProfileMenu(!profileMenu);
    setShowHover(false);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const navigateTo = (path) => {
    setProfileMenu(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Logout failed with status:", res.status);
      } else {
        const data = await res.json().catch(() => null);
        if (data?.msg) {
          console.log(data.msg);
        }
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      navigate("/");
    }
  };

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => setShowHover(true), 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowHover(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setProfileMenu(false);
      }
    };

    if (profileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileMenu]);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const ProfileImage = () => (
    <div className="relative">
      <img
        src={
          user?.profilePicUrl ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(user?.name || "User")
        }
        alt={user?.name}
        onError={(e) => {
          console.error("Image load error:", e);
          // Prevent infinite loop
          if (e.target.src !== "https://ui-avatars.com/api/?name=User") {
            e.target.src = "https://ui-avatars.com/api/?name=User";
          }
        }}
        className="w-10 h-10 border-2 border-gray-200 object-cover rounded-full transition-all duration-200 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-100"
      />
      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-200 shadow-sm group-hover:border-blue-400 transition-colors duration-200">
        <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
      </div>
    </div>
  );

  const HoverCard = () => {
    if (!showHover || profileMenu) return null;

    return (
      <div className="absolute top-full mt-2 right-0 w-64 rounded-xl bg-white shadow-lg border border-gray-200 p-4 z-50">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={
              user?.profilePicUrl ||
              "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
            }
            alt={user?.name || "User"}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => (e.target.src = "https://placehold.co/150x150")}
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {user?.name || "User"}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.email || "user@example.com"}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 border-t pt-2">
          Click to open menu
        </div>
      </div>
    );
  };

  const ProfileMenu = () => {
    if (!profileMenu) return null;

    return (
      <div className="absolute top-full mt-2 right-0 w-64 rounded-xl bg-white shadow-lg border border-gray-200 py-2 z-50">
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.profilePicUrl ||
                "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
              }
              alt={user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => (e.target.src = "https://placehold.co/150x150")}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.name || "User"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email || "user@example.com"}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <button
            className="w-full px-4 py-2 flex items-center text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => navigateTo("/profile")}
          >
            <User2 className="size-4 mr-1" /> Profile
            {!user?.isComplete && (
              <CircleAlert className="text-red-600 w-4 ml-3" />
            )}
          </button>
          <button
            className="w-full px-4 py-2 flex items-center text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => navigateTo("/settings")}
          >
            <Settings className="size-4 mr-1" /> Settings
          </button>
          <button
            className="w-full px-4 py-2 text-left flex items-center text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => navigateTo("/help")}
          >
            <HelpCircle className="size-4 mr-1" /> Help
          </button>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 py-1">
          <button
            className="w-full px-4 py-2 text-left flex items-center text-sm text-red-600 hover:bg-red-50 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="size-4 mr-1" /> Sign out
          </button>
        </div>
      </div>
    );
  };

  const containerClasses = isFull
    ? "relative flex items-center gap-3 cursor-pointer rounded-xl p-2.5 transition-all duration-200 hover:bg-gray-50 group"
    : "relative cursor-pointer group";

  return (
    <div
      className={containerClasses}
      onClick={toggleMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <ProfileImage />
      {isFull && (
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
          {user?.name}
        </span>
      )}
      <HoverCard />
      <ProfileMenu />
    </div>
  );
}

export default ProfileCard;
