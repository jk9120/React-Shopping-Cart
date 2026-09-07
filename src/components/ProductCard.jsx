import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Star,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col h-full w-full max-w-full bg-gray-900/90 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-800 hover:border-orange-500/50 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-1 min-w-0">
      {/* Top Floating Badges & Wishlist Button */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          {product.badge && (
            <span
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-black uppercase tracking-wider rounded-md sm:rounded-lg shadow-md ${
                product.badge === "Best Seller"
                  ? "bg-amber-500 text-black font-extrabold"
                  : product.badge === "Hot Deal"
                  ? "bg-red-600 text-white font-extrabold"
                  : "bg-orange-600 text-white font-bold"
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discountPercent && (
            <span className="px-1.5 sm:px-2 py-0.5 bg-emerald-600/95 text-white text-[9px] sm:text-[10px] font-extrabold rounded-md shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md transition shadow-lg pointer-events-auto ${
            wishlisted
              ? "bg-red-500/20 text-red-500 border border-red-500/40"
              : "bg-gray-950/60 text-gray-300 hover:text-red-400 hover:bg-gray-900 border border-white/10"
          }`}
          title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label="Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110 ${
              wishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        to={`/product/${product.id}`}
        className="relative block h-44 sm:h-56 lg:h-60 overflow-hidden bg-gray-950/80 w-full"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
      </Link>

      {/* Product Details Body */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between gap-3 sm:gap-4 min-w-0 w-full">
        <div className="min-w-0">
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs mb-1.5 sm:mb-2">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-gray-800 text-orange-400 border border-gray-700 font-semibold text-[10px] sm:text-xs truncate">
              {product.category}
            </span>

            <div className="flex items-center gap-1 bg-amber-500/10 px-1.5 sm:px-2 py-0.5 rounded-md border border-amber-500/20 text-amber-400 shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-[11px] sm:text-xs">{product.rating || 4.8}</span>
              <span className="text-[9px] sm:text-[10px] text-gray-400">
                ({product.reviewCount || 42})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block group/title">
            <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-white group-hover/title:text-orange-400 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-gray-400 text-[11px] sm:text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-2 border-t border-gray-800/80 space-y-2 sm:space-y-3 w-full">
          <div className="flex items-baseline justify-between">
            <div className="truncate">
              <span className="text-base sm:text-xl lg:text-2xl font-black text-white">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="ml-1.5 text-[10px] sm:text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            <div className="text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shrink-0">
              {product.stockCount && product.stockCount < 6 ? (
                <span className="text-amber-400 flex items-center gap-0.5">
                  <AlertCircle className="w-3 h-3" />
                  Only {product.stockCount} left
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  In Stock
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full">
            <button
              onClick={() => addToCart(product)}
              className="col-span-4 py-2 sm:py-2.5 px-2 sm:px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md sm:shadow-lg shadow-orange-600/30 flex items-center justify-center gap-1.5 sm:gap-2 transition transform active:scale-95 cursor-pointer min-w-0"
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Add to Cart</span>
            </button>

            <Link
              to={`/product/${product.id}`}
              className="col-span-1 py-2 sm:py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl border border-gray-700 flex items-center justify-center transition"
              title="View Specifications"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;