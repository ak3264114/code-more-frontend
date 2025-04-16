import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { Menu, X } from "lucide-react";

function Header() {
  const { isLoggedIn } = useContext(DataContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    console.log("clicked");
    window.location.reload();
  };

  return (
    <div className="relative">
      {/* Main navbar */}
      <nav className="bg-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <button
                  onClick={handleDrawerToggle}
                  className="text-white hover:text-gray-200 focus:outline-none"
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </div>
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center ml-4 sm:ml-0">
                <Link to="/" className="text-white font-bold text-xl">
                  Code More
                </Link>
              </div>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex sm:items-center">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white hover:bg-indigo-700 rounded-md transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-white hover:bg-indigo-700 rounded-md transition-colors mr-2"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-white text-indigo-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute w-full z-50">
          <div className="bg-white shadow-lg rounded-b-lg">
            <div className="flex justify-end p-4">
              <button 
                onClick={handleDrawerToggle}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;