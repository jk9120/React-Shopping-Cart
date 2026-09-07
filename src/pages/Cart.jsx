import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChevronLeft,
  Trash2,
  Tag,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Check,
  X,
  Lock
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { PROMO_CODES } from "../data/product";

const Cart = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput("");
    }
  };

  const handleProceedCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", {
        state: {
          from: { pathname: "/checkout" },
          message: "Please Sign In or Register with OTP before placing your order! 🔒",
        },
      });
    }
  };

  const freeShippingThreshold = 5000;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingProgress = Math.min(
    100,
    (cartSubtotal / freeShippingThreshold) * 100
  );

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center">
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-14 text-center max-w-lg mx-auto border border-gray-800 space-y-4 sm:space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-900 rounded-full mx-auto flex items-center justify-center border border-gray-800 text-orange-400">
            <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-3xl font-black text-white">
              Your Cart is Currently Empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Looks like you haven't added any gear yet. Check out our latest flagship drops!
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-orange-600/30 transition hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Shopping Now</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 min-h-[80vh] overflow-hidden">
      {/* Top Breadcrumb & Clear Action */}
      <div className="flex items-center justify-between w-full">
        <Link
          to="/"
          className="inline-flex items-center text-xs sm:text-sm font-bold text-gray-400 hover:text-orange-400 transition"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Continue Browsing</span>
        </Link>

        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-red-950/50 text-gray-400 hover:text-red-400 border border-gray-800 text-[11px] sm:text-xs font-semibold transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Cart</span>
        </button>
      </div>

      {/* Cart Page Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full">
        <div className="p-2 sm:p-2.5 bg-orange-500/10 text-orange-400 rounded-xl sm:rounded-2xl border border-orange-500/20 shrink-0">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-xl sm:text-4xl font-black text-white truncate">
          Shopping Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
        </h1>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-900/90 border border-gray-800 space-y-2 w-full">
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-white truncate">
            <Truck className="w-4 h-4 text-orange-400 shrink-0" />
            {isFreeShipping ? (
              <span className="text-emerald-400 truncate">
                🎉 FREE Express Delivery unlocked!
              </span>
            ) : (
              <span className="truncate">
                Add{" "}
                <span className="text-orange-400 font-mono">
                  ₹{(freeShippingThreshold - cartSubtotal).toLocaleString()}
                </span>{" "}
                more for Free Express Shipping
              </span>
            )}
          </div>
          <span className="text-gray-400 font-mono shrink-0">
            {Math.round(shippingProgress)}%
          </span>
        </div>
        <div className="w-full h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-3 sm:space-y-4 w-full min-w-0">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* Promo Codes box */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-gray-800 space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-400">
              <Tag className="w-4 h-4" />
              <span>Available Coupons & Offers</span>
            </div>

            {/* Promo Code Input Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code (e.g. SAVE10)..."
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm uppercase tracking-wider font-mono focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition shrink-0"
              >
                Apply
              </button>
            </form>

            {/* Clickable Quick Coupon Chips */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {Object.values(PROMO_CODES).map((promo) => (
                <button
                  key={promo.code}
                  type="button"
                  onClick={() => applyCoupon(promo.code)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 transition ${
                    appliedCoupon?.code === promo.code
                      ? "bg-emerald-950/60 border-emerald-500 text-emerald-400"
                      : "bg-gray-900 border-gray-700 text-gray-300 hover:border-orange-500"
                  }`}
                >
                  <span>{promo.code}</span>
                  {appliedCoupon?.code === promo.code && (
                    <Check className="w-3 h-3 text-emerald-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Applied Coupon Display */}
            {appliedCoupon && (
              <div className="flex items-center justify-between p-2.5 sm:p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    Coupon <strong>"{appliedCoupon.code}"</strong> applied (-₹
                    {discountAmount.toLocaleString()})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-gray-400 hover:text-red-400 p-1 shrink-0"
                  title="Remove coupon"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-800 shadow-2xl space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl font-black text-white border-b border-gray-800 pb-3 sm:pb-4">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Items Subtotal:</span>
                <span className="font-bold text-white font-mono">
                  ₹{cartSubtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Savings:</span>
                  <span className="font-mono">- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-300">
                <span>Express Shipping:</span>
                <span className="font-bold text-emerald-400 font-mono">FREE</span>
              </div>

              <div className="flex justify-between text-gray-400 text-[11px] sm:text-xs">
                <span>GST & Taxes:</span>
                <span>Included</span>
              </div>

              <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
                <span className="text-sm sm:text-base font-bold text-white">Grand Total:</span>
                <span className="text-xl sm:text-3xl font-black text-orange-400 font-mono">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition transform active:scale-98 cursor-pointer"
            >
              {!isAuthenticated && <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-200" />}
              <span>{isAuthenticated ? "Proceed to Checkout" : "Sign In & Checkout"}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {!isAuthenticated && (
              <p className="text-[11px] text-amber-400 text-center font-semibold">
                🔒 You must sign in or register before completing your purchase.
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
