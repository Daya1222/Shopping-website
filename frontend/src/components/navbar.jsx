import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  X,
  Home,
  Package,
  ShoppingBag,
  Settings,
  Search,
  LogIn,
  LogInIcon,
} from "lucide-react";
import logo from "../assets/social.png";
import axios from "axios";
import UserProfileDropdown from "./userProfileDropdown.jsx";
import useUser from "../hooks/useUser";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [checkingUser, setCheckingUser] = useState(true);
  const [searchBar, setSearchBar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Global
  const { user, setUser } = useUser();

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Products", icon: Package },
    { name: "Orders", icon: ShoppingBag },
    user?._id && { name: "Setting", icon: Settings },
  ].filter(Boolean);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setCheckingUser(true);
        const res = await axios.get(
          `${API_BASE}/api/service/get-current-user`,
          {
            withCredentials: true,
          },
        );

        if (res.data.user) {
          setUser(res.data.user);

          // Redirect to home if on public routes
          if (["/", "/login", "/register"].includes(location.pathname)) {
            navigate("/home");
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setCheckingUser(false);
      }
    };

    fetchUser();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigation = (option) => {
    setMenuOpen(false);
    navigate(`/${option}`);
  };

  // Render auth button based on current page
  const renderAuthButton = () => {
    if (user) {
      return <UserProfileDropdown variant="concise" showChevron={true} />;
    }

    if (location.pathname === "/login") {
      return (
        <button
          className="text-blue-600 flex items-center font-medium text-sm hover:text-blue-700 transition-colors"
          onClick={() => handleNavigation("register")}
        >
          <LogIn className="size-4 mr-1" /> Sign Up
        </button>
      );
    }

    return (
      <button
        className="text-blue-600 font-medium flex items-center text-sm hover:text-blue-700 transition-colors"
        onClick={() => navigate("/login")}
      >
        <LogInIcon className="size-4 mr-1" /> Login
      </button>
    );
  };

  return (
    <div className="relative h-screen w-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="flex w-full h-14 md:h-16 bg-white items-center px-4 border-b border-gray-200">
        {/* Mobile Navbar */}
        <div className="flex md:hidden h-full w-full items-center justify-between">
          <button
            className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {!searchBar && (
            <div className="flex items-center cursor-pointer gap-2">
              <img src={logo} alt="logo" className="w-8" />
              <div
                className="text-xl font-bold text-gray-900 cursor-pointer"
                onClick={() => navigate("/home")}
              >
                QuickCart
              </div>
            </div>
          )}

          {/* Search Mobile */}

          {searchBar && (
            <input
              type="text"
              name="Search box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex items-center flex-grow max-w-sm px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition ml-4 mr-4 h-10"
            />
          )}

          {/* User Profile */}
          <div className="flex items-center justify-center gap-3 ">
            {!searchBar && (
              <div className="bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 ">
                <Search onClick={() => setSearchBar(true)} />
              </div>
            )}
            {renderAuthButton()}
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex h-full w-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer gap-4 mr-4">
            <img src={logo} alt="logo" className="w-8" />
            <div className="text-xl font-bold text-gray-900">QuickCart</div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 items-center mr-4">
            <button
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => handleNavigation("home")}
            >
              Home
            </button>
            <button
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => handleNavigation("products")}
            >
              Products
            </button>
            <button
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => handleNavigation("orders")}
            >
              Orders
            </button>
          </div>

          {/* Responsive Search Bar */}
          <div className="flex items-center flex-grow max-w-lg px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition mr-2">
            <Search className="text-gray-500 shrink-0" size={18} />
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0 ml-2"
            />
          </div>

          {/* Auth Section */}
          <div>
            {user ? (
              <UserProfileDropdown variant="full" showChevron={true} />
            ) : location.pathname === "/login" ? (
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/register")}
              >
                <LogIn className="size-4 mr-1" /> Sign Up
              </button>
            ) : (
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/login")}
              >
                <LogIn className="size-4 mr-1" /> Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        />
      )}

      {/* Sliding Menu */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-72 h-screen bg-white z-50 md:hidden shadow-xl"
          style={{ animation: "slideIn 0.3s ease-out" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-8" />
              <span className="font-bold text-gray-900">QuickCart</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name.toLocaleLowerCase())}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group"
              >
                <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            {user ? (
              <div
                className="flex items-center h-16 cursor-pointer gap-3 p-4 bg-gray-200 rounded-lg shadow-sm  border-gray-200 max-w-xs"
                onClick={() => handleNavigation("profile")}
              >
                <img
                  src={user.profilePicUrl}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-gray-100"
                />
                <span className="text-sm font-medium text-gray-900">
                  {user.name}
                </span>
              </div>
            ) : location.pathname === "/login" ? (
              <button
                onClick={() => {
                  handleNavigation("register");
                }}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            ) : (
              <button
                onClick={() => {
                  handleNavigation("login");
                }}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="h-full w-full overflow-auto">
        <Outlet context={{ checkingUser, setCheckingUser }} />
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Navbar;
