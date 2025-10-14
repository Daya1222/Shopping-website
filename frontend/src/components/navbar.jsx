import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import logo from "../assets/social.png";

function Navbar({}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col">
      {/*Navbar*/}
      <nav className="flex w-full h-14 md:h-16 bg-white items-center px-4">
        {/*Mobile Navbar*/}

        <div className="flex md:hidden h-full w-full items-center justify-between   ">
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition">
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
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-900 to-emerald-600">
              QuickCart
            </div>
          </div>
          <a
            className=" text-cyan-800 font-medium text-sm hover:text-gray-900 cursor-pointer w-14 text-right"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </a>
        </div>

        {/*Desktop Navbar*/}

        <div className="hidden h-full w-full items-center justify-between  ">
          {/* logo */}
          <div className="flex items-center cursor-pointer gap-2">
            <img src={logo} alt="logo" className="w-8" />
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-900 to-emerald-600">
              QuickCart
            </div>
          </div>

          {/* navigation */}
          <div>
            <div>Home</div>
            <div>Products</div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Page Content*/}
      <div className="h-full w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
