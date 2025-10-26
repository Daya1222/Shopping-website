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
  ShoppingCart,
} from "lucide-react";
import logo from "../assets/social.png";
import UserProfileDropdown from "./userProfileDropdown.jsx";
import useUser from "../hooks/useUser";
import useCart from "../hooks/useCart.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [checkingUser, setCheckingUser] = useState(true);
  const [searchBar, setSearchBar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, setLoading } = useUser();

  const { cartItems } = useCart();
  const itemCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  const cartVisibleRoutes = ["/home", "/profile", "/seller/add"];
  const showCart = cartVisibleRoutes.includes(location.pathname);

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Products", icon: Package },
    { name: "Orders", icon: ShoppingBag },
    ...(user?._id ? [{ name: "Setting", icon: Settings }] : []),
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigation = (option) => {
    setMenuOpen(false);
    navigate(`/${option}`);
  };

  // Render profile based on auth state
  const renderAuthButton = () => {
    if (user) {
      return <UserProfileDropdown variant="concise" showChevron={true} />;
    }

    return <></>;
  };

  const renderAuthButtonDesktop = () => {
    if (user) {
      return <UserProfileDropdown variant="full" showChevron={true} />;
    }

    if (location.pathname === "/login") {
      return (
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/register")}
        >
          <LogIn className="size-4 mr-1" /> Sign Up
        </button>
      );
    }

    return (
      <button
        className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => navigate("/login")}
      >
        <LogIn className="size-4 mr-1" /> Login
      </button>
    );
  };

  return (
    <div className="relative h-screen w-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="flex w-full h-14 md:h-16 bg-gray-200 items-center px-4 border-b border-gray-300">
        {/* Mobile Navbar */}
        <div className="flex md:hidden h-full w-full items-center justify-between">
          <button
            className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-300 transition"
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

          <div className="flex items-center cursor-pointer gap-2">
            <img src={logo} alt="logo" className="w-8" />
            <div
              className="text-xl font-bold text-gray-900 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              QuickCart
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center justify-center gap-3">
            <button
              className=" h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-400 bg-gray-300 transition"
              onClick={() => setSearchBar(!searchBar)}
            >
              <Search className="w-5 h-5" />
            </button>
            {renderAuthButton()}
          </div>
        </div>
        {/* Desktop Navbar */}
        <div className="hidden md:flex h-full w-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer gap-4 mr-4">
            <img src={logo} alt="logo" className="w-8" />
            <div
              className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition"
              onClick={() => navigate("/home")}
            >
              QuickCart
            </div>
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

          {/* Search Bar */}
          <div className="flex items-center flex-grow max-w-lg px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition mr-4">
            <Search className="text-gray-500 shrink-0" size={18} />
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0 ml-2"
            />
          </div>

          {/* Auth Section */}
          <div>{renderAuthButtonDesktop()}</div>
        </div>
        {/* Floating Cart */}
        {showCart && (
          <div className="absolute flex justify-center items-center bottom-12 right-8 h-12 w-12">
            <button
              onClick={() => navigate("/cart")}
              className="relative p-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white transition-all duration-200 hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-8 h-8" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Search Bar */}
      {searchBar && (
        <div className="md:hidden px-4 py-2 bg-gray-200 border-gray-100">
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 transition h-10"
            autoFocus
          />
        </div>
      )}

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
          className="fixed top-0 left-0 w-72 h-screen bg-white z-50 md:hidden shadow-xl flex flex-col"
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
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name.toLowerCase())}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors group"
              >
                <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="border-t border-gray-200 p-4">
            {user ? (
              <div
                className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                onClick={() => {
                  setMenuOpen(false);
                  handleNavigation("profile");
                }}
              >
                <img
                  src={
                    user.profilePicUrl ||
                    "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </span>
              </div>
            ) : location.pathname === "/login" ? (
              <button
                onClick={() => handleNavigation("register")}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            ) : (
              <button
                onClick={() => handleNavigation("login")}
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
