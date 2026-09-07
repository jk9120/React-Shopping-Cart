import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Heart,
  ShoppingCart,
  User,
  LogIn,
  Camera
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth, PRESET_AVATARS } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ProfileModal from "./ProfileModal";

const BottomNav = () => {
  const location = useLocation();
  const { cartCount, wishlistCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const currentPath = location.pathname;

  return (
    <>
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 w-full max-w-full z-50 border-t backdrop-blur-2xl transition-all duration-300 flex items-center justify-around py-2 px-1 sm:px-2 shadow-2xl overflow-hidden ${
          isDark
            ? "bg-gray-950/95 border-orange-500/30 text-gray-300"
            : "bg-white/95 border-orange-200 text-gray-700 shadow-orange-100"
        }`}
      >
        {/* Home Link */}
        <Link
          to="/"
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
            currentPath === "/"
              ? isDark
                ? "text-orange-400 font-extrabold scale-105"
                : "text-orange-600 font-extrabold scale-105"
              : isDark
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {currentPath === "/" && (
            <span className="absolute -top-2.5 w-6 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-sm shadow-orange-500" />
          )}
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1 font-semibold">Home</span>
        </Link>

        {/* Wishlist Link */}
        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
            currentPath === "/wishlist"
              ? isDark
                ? "text-orange-400 font-extrabold scale-105"
                : "text-orange-600 font-extrabold scale-105"
              : isDark
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {currentPath === "/wishlist" && (
            <span className="absolute -top-2.5 w-6 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-sm shadow-orange-500" />
          )}
          <div className="relative">
            <Heart
              className={`w-5 h-5 ${
                currentPath === "/wishlist" ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center text-white bg-red-500 shadow-md">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 font-semibold">Wishlist</span>
        </Link>

        {/* Cart Link */}
        <Link
          to="/cart"
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
            currentPath === "/cart"
              ? isDark
                ? "text-orange-400 font-extrabold scale-105"
                : "text-orange-600 font-extrabold scale-105"
              : isDark
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {currentPath === "/cart" && (
            <span className="absolute -top-2.5 w-6 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-sm shadow-orange-500" />
          )}
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center text-white bg-orange-500 shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 font-semibold">Cart</span>
        </Link>

        {/* User Profile DP / Login Button */}
        {isAuthenticated ? (
          <button
            type="button"
            onClick={() => setIsProfileModalOpen(true)}
            className="relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 cursor-pointer"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-orange-500/60 bg-gray-900">
              <img
                src={user?.avatar || PRESET_AVATARS[0].url}
                alt={user?.name || "Profile DP"}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-bold text-orange-400 truncate max-w-[70px]">
              {user?.name || "Profile"}
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
              currentPath === "/login" || currentPath === "/register"
                ? isDark
                  ? "text-orange-400 font-extrabold scale-105"
                  : "text-orange-600 font-extrabold scale-105"
                : isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1 font-semibold">Sign In</span>
          </Link>
        )}
      </nav>

      {/* User Profile Modal on Mobile */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default BottomNav;
