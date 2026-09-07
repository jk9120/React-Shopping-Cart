import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Search,
  X,
  Sparkles,
  Zap,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth, PRESET_AVATARS } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ProfileModal from "./ProfileModal";
import { Camera } from "lucide-react";

const Navbar = () => {
  const { cartCount, wishlistCount, products } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Search auto-suggest results
  const searchSuggestions = navSearch.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(navSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(navSearch.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSuggestionClick = (id) => {
    setNavSearch("");
    setIsSearchFocused(false);
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      setIsSearchFocused(false);
      navigate(`/?search=${encodeURIComponent(navSearch)}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 w-full max-w-full ${
        isDark
          ? "bg-gray-950/90 border-orange-500/20 text-white shadow-2xl"
          : "bg-white/90 border-orange-200 text-gray-900 shadow-lg shadow-orange-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-4 w-full">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-1.5 sm:space-x-3 group shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 p-0.5 shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div
                className={`w-full h-full rounded-[10px] sm:rounded-[14px] flex items-center justify-center ${
                  isDark ? "bg-gray-950" : "bg-white"
                }`}
              >
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500 fill-orange-500 group-hover:animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-base sm:text-2xl font-black tracking-wider uppercase flex items-center gap-0.5 sm:gap-1 shrink-0 ${
                  isDark ? "text-white" : "text-gray-950"
                }`}
              >
                JGN<span className="text-orange-500">STORE</span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 animate-ping"></span>
              </span>
              <span className="hidden sm:block text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">
                Premium Tech & Gear
              </span>
            </div>
          </Link>

          {/* Desktop Live Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search MacBook, iPhone, Sony, Watch..."
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                  className={`w-full pl-11 pr-10 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition duration-200 border ${
                    isDark
                      ? "bg-gray-900/90 border-gray-700/80 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-900"
                  }`}
                />
                {navSearch && (
                  <button
                    type="button"
                    onClick={() => setNavSearch("")}
                    className="absolute right-3.5 text-gray-400 hover:text-orange-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Instant Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div
                className={`absolute top-12 left-0 right-0 rounded-2xl p-2 shadow-2xl border border-orange-500/30 z-50 mt-1 backdrop-blur-xl ${
                  isDark ? "bg-gray-900/95" : "bg-white/95 shadow-orange-100"
                }`}
              >
                <div className="text-[11px] font-bold text-gray-400 uppercase px-3 py-1.5 flex items-center justify-between border-b border-gray-800">
                  <span>Quick Results</span>
                  <span className="text-orange-400">Press Enter for all</span>
                </div>
                <div className="mt-1 space-y-1">
                  {searchSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onMouseDown={() => handleSuggestionClick(item.id)}
                      className="flex items-center gap-3 p-2 hover:bg-orange-500/10 rounded-xl cursor-pointer transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg border border-gray-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-semibold truncate ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.name}
                        </p>
                        <p className="text-[11px] text-orange-500 font-bold">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full shrink-0">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-xl border transition flex items-center justify-center ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-amber-400 hover:bg-gray-800 hover:border-amber-500/40"
                  : "bg-gray-100 border-gray-300 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Desktop Explore Link */}
            <Link
              to="/"
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                location.pathname === "/"
                  ? "bg-orange-500/20 text-orange-500 border border-orange-500/40"
                  : isDark
                  ? "text-gray-300 hover:text-white hover:bg-gray-800/60"
                  : "text-gray-700 hover:text-black hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Explore</span>
            </Link>

            {/* Desktop Wishlist Link */}
            <Link
              to="/wishlist"
              className={`hidden sm:flex relative p-2 sm:px-3 sm:py-2 rounded-xl items-center space-x-1.5 text-xs sm:text-sm font-semibold transition ${
                location.pathname === "/wishlist"
                  ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : isDark
                  ? "text-gray-300 hover:text-white hover:bg-gray-800/60"
                  : "text-gray-700 hover:text-black hover:bg-gray-100"
              }`}
              title="Saved Wishlist"
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  wishlistCount > 0 ? "text-red-500 fill-red-500" : ""
                }`}
              />
              <span className="hidden lg:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="inline-flex items-center justify-center text-[10px] sm:text-[11px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full ml-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Desktop Cart Link with Badge */}
            <Link
              to="/cart"
              className={`hidden sm:flex relative p-2 sm:px-4 sm:py-2 rounded-xl items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold transition shadow-lg ${
                location.pathname === "/cart"
                  ? "bg-orange-600 text-white shadow-orange-600/30"
                  : "bg-orange-500/15 text-orange-500 border border-orange-500/40 hover:bg-orange-500/25"
              }`}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center text-[10px] sm:text-xs font-black min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-md ml-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Auth Profile / Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition cursor-pointer ${
                    isDark
                      ? "bg-gray-900 border-gray-800 text-white hover:border-orange-500/50"
                      : "bg-gray-100 border-gray-300 text-gray-900 hover:border-orange-500"
                  }`}
                  title="Account Menu"
                >
                  {/* User Avatar DP */}
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-orange-500/50 bg-gray-950 shrink-0">
                    <img
                      src={user?.avatar || PRESET_AVATARS[0].url}
                      alt={user?.name || "User DP"}
                      className="w-full h-full object-cover"
                    />
                    {/* Active Status Dot */}
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-gray-950" />
                </div>

                <span className="hidden sm:inline truncate max-w-[150px] font-black text-xs sm:text-sm text-white">
                  {user?.name || "Account"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </button>

                {/* User dropdown menu */}
                {userDropdownOpen && (
                  <div
                    className={`absolute right-0 top-12 w-60 rounded-2xl p-2 shadow-2xl border z-50 space-y-1 animate-fade-in ${
                      isDark
                        ? "bg-gray-900/95 border-gray-800 text-white backdrop-blur-xl"
                        : "bg-white/95 border-gray-200 text-gray-900 shadow-xl shadow-orange-100 backdrop-blur-xl"
                    }`}
                  >
                    {/* User Mini Info Header */}
                    <div className="p-2.5 border-b border-gray-800/80 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-orange-500/50 shrink-0 bg-gray-950">
                        <img
                          src={user?.avatar || PRESET_AVATARS[0].url}
                          alt={user?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black truncate">{user?.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>

                    {/* Manage Profile & DP Option */}
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold hover:bg-orange-500/10 text-orange-400 transition text-left cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>My Profile & Change Photo</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl text-xs hover:bg-orange-500/10 transition"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-400" />
                      <span>My Wishlist ({wishlistCount})</span>
                    </Link>

                    <Link
                      to="/cart"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl text-xs hover:bg-orange-500/10 transition"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-orange-500" />
                      <span>My Cart ({cartCount})</span>
                    </Link>

                    <div className="pt-1 border-t border-gray-800">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 transition text-left cursor-pointer font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold transition shadow-md shadow-orange-600/20"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Sign In / OTP</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* User Profile & DP Management Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;