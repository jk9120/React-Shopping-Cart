import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  Printer,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  MapPin
} from "lucide-react";

const OrderConfirmation = ({ order }) => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 min-h-screen overflow-hidden">
      {/* Top Celebratory Header */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-emerald-500/30 text-center space-y-3 sm:space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 rounded-2xl sm:rounded-3xl mx-auto flex items-center justify-center shadow-xl animate-bounce">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Placed Successfully</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
            We've received your order and our fulfillment team is preparing your package for express dispatch.
          </p>
        </div>

        {/* Order Details Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-800 text-xs text-left max-w-2xl mx-auto">
          <div className="p-2.5 sm:p-3 bg-gray-900/80 rounded-xl sm:rounded-2xl border border-gray-800">
            <span className="text-gray-400 block font-semibold text-[11px]">Order ID:</span>
            <span className="text-white font-mono font-black text-xs sm:text-sm">
              #{order?.orderId || "JGN-849204"}
            </span>
          </div>

          <div className="p-2.5 sm:p-3 bg-gray-900/80 rounded-xl sm:rounded-2xl border border-gray-800">
            <span className="text-gray-400 block font-semibold text-[11px]">Payment:</span>
            <span className="text-emerald-400 font-bold text-[11px] sm:text-xs">
              {order?.paymentMethod === "cod"
                ? "Pay on Delivery"
                : order?.paymentMethod === "netbanking"
                ? `Net Banking (${order?.bankName || "Bank"})`
                : "Paid via " + (order?.paymentMethod || "UPI").toUpperCase()}
            </span>
          </div>

          <div className="p-2.5 sm:p-3 bg-gray-900/80 rounded-xl sm:rounded-2xl border border-gray-800">
            <span className="text-gray-400 block font-semibold text-[11px]">Est. Delivery:</span>
            <span className="text-orange-400 font-bold text-[11px] sm:text-xs">
              {formattedDeliveryDate}
            </span>
          </div>
        </div>
      </div>

      {/* Itemized Printable Invoice / Summary */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-800 space-y-4 sm:space-y-6 shadow-xl print:bg-white print:text-black">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              Package Breakdown
            </h3>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-xs font-bold text-gray-200 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Items List */}
        <div className="divide-y divide-gray-800">
          {order?.items?.map((item) => (
            <div
              key={item.id}
              className="py-2.5 sm:py-3 flex items-center justify-between gap-3 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover border border-gray-800 shrink-0"
                />
                <div className="truncate">
                  <h4 className="font-bold text-white truncate">{item.name}</h4>
                  <p className="text-gray-400 text-[10px] sm:text-xs">
                    Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-orange-400 text-xs sm:text-sm shrink-0">
                ₹{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t border-gray-800 pt-3 sm:pt-4 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal:</span>
            <span className="font-mono font-bold text-white">
              ₹{order?.subtotal?.toLocaleString() || "0"}
            </span>
          </div>

          {order?.discount > 0 && (
            <div className="flex justify-between text-emerald-400 font-semibold">
              <span>Promo Discount ({order?.couponCode || "Coupon"}):</span>
              <span className="font-mono">- ₹{order?.discount?.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-400">
            <span>Shipping Charges:</span>
            <span className="text-emerald-400 font-bold">FREE Express</span>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-gray-800 flex justify-between items-baseline text-sm sm:text-lg font-black text-white">
            <span>Total Paid / Due:</span>
            <span className="text-orange-400 font-mono text-lg sm:text-2xl">
              ₹{order?.total?.toLocaleString() || "0"}
            </span>
          </div>
        </div>

        {/* Delivery Address Review */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-900/80 border border-gray-800 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>Shipping to:</span>
          </div>
          <p className="text-gray-300 font-semibold">{order?.deliveryDetails?.name}</p>
          <p className="text-gray-400">{order?.deliveryDetails?.address}</p>
          <p className="text-gray-400">
            {order?.deliveryDetails?.city}, {order?.deliveryDetails?.state} -{" "}
            {order?.deliveryDetails?.zip}
          </p>
          <p className="text-gray-400">Phone: {order?.deliveryDetails?.phone}</p>
        </div>
      </div>

      {/* Continue Shopping CTA */}
      <div className="text-center pt-2 sm:pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-xl shadow-orange-600/30 hover:scale-105 transition"
        >
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Explore More Tech</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;