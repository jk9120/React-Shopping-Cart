import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronLeft,
  Sparkles
} from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist, clearWishlist, addToCart, wishlistCount } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => addToCart(item, 1));
    clearWishlist();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 min-h-[70vh] overflow-hidden">
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4 sm:pb-6 w-full">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-gray-400 hover:text-orange-400 transition mb-1 sm:mb-2"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Back to Store</span>
          </Link>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-red-500/10 text-red-400 rounded-xl sm:rounded-2xl border border-red-500/20 shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-red-500 text-red-500" />
            </div>
            <h1 className="text-xl sm:text-4xl font-black text-white">
              My Saved Wishlist ({wishlistCount})
            </h1>
          </div>
        </div>

        {wishlistCount > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleMoveAllToCart}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition"
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Move All to Cart</span>
            </button>

            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-900 hover:bg-red-950/60 text-gray-400 hover:text-red-400 border border-gray-800 text-xs sm:text-sm font-semibold rounded-xl transition"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Items or Empty State */}
      {wishlistCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6 w-full">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto my-8 sm:my-12 border border-gray-800 space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-900 rounded-full mx-auto flex items-center justify-center border border-gray-800 text-red-400">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">
            Found something you love? Tap the heart icon on any device to save it for later.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-orange-600/30 transition hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Tech Drops</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
