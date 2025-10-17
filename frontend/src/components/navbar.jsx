import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { X, Home, Package, ShoppingBag } from "lucide-react";
import logo from "../assets/social.png";
import axios from "axios";
import ProfileCard from "./profileCard";
import useUser from "../hooks/useUser";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Navbar({}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Products", icon: Package },
    { name: "Orders", icon: ShoppingBag },
  ];

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/service/get-current-user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          navigate("/home");
        } else {
          setCheckingUser(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setCheckingUser(false);
      });
  }, []);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/*Navbar*/}
      <nav className="flex w-full h-14 md:h-16 bg-white items-center px-4 border-b border-gray-200">
        {/*Mobile Navbar*/}
        <div className="flex md:hidden h-full w-full items-center justify-between">
          <button
            className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => toggleMenu()}
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
            <div className="text-xl font-bold text-gray-900">QuickCart</div>
          </div>

          {user ? (
            <div>
              <ProfileCard variant="concise" showChevron={true} />
            </div>
          ) : location.pathname === "/login" ? (
            <button
              className="text-blue-600 font-medium text-sm hover:text-blue-700 cursor-pointer transition-colors"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          ) : (
            <button
              className="text-blue-600 font-medium text-sm hover:text-blue-700 cursor-pointer transition-colors"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>

        {/*Desktop Navbar*/}
        <div className="hidden md:flex h-full w-full items-center justify-between">
          {/* logo */}
          <div className="flex items-center cursor-pointer gap-2">
            <img src={logo} alt="logo" className="w-8" />
            <div className="text-xl font-bold text-gray-900">QuickCart</div>
          </div>

          {/* navigation */}
          <div className="flex gap-8">
            <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Home
            </button>
            <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Products
            </button>
            <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Orders
            </button>
          </div>

          {/* Profile Card */}
          <div>
            <ProfileCard variant="full" showChevron={true} />
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        />
      )}

      {/* Sliding Menu */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-72 h-screen bg-white z-50 md:hidden shadow-xl"
          style={{
            animation: "slideIn 0.3s ease-out",
          }}
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
                onClick={() => setMenuOpen(false)}
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
              <ProfileCard variant="full" showChevron={false} />
            ) : (
              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}

      {/* Page Content*/}
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
