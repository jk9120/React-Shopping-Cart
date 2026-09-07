import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();

  const increaseQuantity = () => addToCart(item, 1);
  const decreaseQuantity = () => removeFromCart(item.id, false);
  const deleteItem = () => removeFromCart(item.id, true);

  const itemTotal = item.price * item.quantity;
  const originalItemTotal = item.originalPrice
    ? item.originalPrice * item.quantity
    : null;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3.5 sm:p-5 bg-gray-900/90 rounded-2xl border border-gray-800 hover:border-orange-500/40 shadow-lg transition-all duration-200 gap-3 sm:gap-4 w-full min-w-0">
      {/* Product Image & Info */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <Link
          to={`/product/${item.id}`}
          className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-950 border border-gray-800 shrink-0 group"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] sm:text-[11px] font-bold text-orange-400 uppercase tracking-wider">
            {item.category}
          </span>
          <Link to={`/product/${item.id}`}>
            <h4 className="text-xs sm:text-base font-extrabold text-white truncate hover:text-orange-400 transition">
              {item.name}
            </h4>
          </Link>
          <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
            <span className="text-xs sm:text-base font-black text-white">
              ₹{item.price.toLocaleString()}
            </span>
            {item.originalPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                ₹{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stepper, Subtotal, and Delete Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
        {/* Quantity Stepper */}
        <div className="flex items-center bg-gray-800/90 rounded-xl border border-gray-700 p-0.5 sm:p-1">
          <button
            onClick={decreaseQuantity}
            className="p-1 sm:p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition"
            title="Decrease quantity"
          >
            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <span className="px-2 sm:px-3 text-xs sm:text-sm font-bold text-white min-w-[24px] sm:min-w-[28px] text-center font-mono">
            {item.quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="p-1 sm:p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition"
            title="Increase quantity"
          >
            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right">
          <p className="text-sm sm:text-lg font-black text-orange-400">
            ₹{itemTotal.toLocaleString()}
          </p>
          {originalItemTotal && originalItemTotal > itemTotal && (
            <p className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold">
              Save ₹{(originalItemTotal - itemTotal).toLocaleString()}
            </p>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={deleteItem}
          className="p-2 sm:p-2.5 rounded-xl bg-red-950/40 text-red-400 hover:text-white hover:bg-red-600 border border-red-900/30 transition shadow-md shrink-0"
          title="Remove from Cart"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
