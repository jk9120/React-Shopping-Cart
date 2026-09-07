import React from "react";
import {
  Sparkles,
  Laptop,
  Smartphone,
  Tablet,
  Camera,
  Headphones,
  Watch,
  Layers
} from "lucide-react";
import { useCart } from "../context/CartContext";

const getCategoryIcon = (category) => {
  switch (category) {
    case "All":
      return <Layers className="w-4 h-4" />;
    case "Laptop":
      return <Laptop className="w-4 h-4" />;
    case "Phone":
      return <Smartphone className="w-4 h-4" />;
    case "Tablet":
      return <Tablet className="w-4 h-4" />;
    case "Camera":
      return <Camera className="w-4 h-4" />;
    case "Audio":
      return <Headphones className="w-4 h-4" />;
    case "Wearables":
      return <Watch className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const { products } = useCart();

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Helper for counting items per category
  const getCount = (cat) => {
    if (cat === "All") return products.length;
    return products.filter((p) => p.category === cat).length;
  };

  return (
    <div className="mb-6 w-full max-w-full overflow-x-auto pb-2 scrollbar-none overscroll-x-contain touch-pan-x">
      <div className="flex items-center gap-2 sm:gap-2.5 w-max max-w-none px-0.5">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const count = getCount(category);

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-md ${
                isSelected
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-orange-600/30 scale-105 ring-2 ring-orange-500/40"
                  : "bg-gray-900/90 text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-800 hover:border-gray-700"
              }`}
            >
              <span className={isSelected ? "text-white" : "text-orange-400"}>
                {getCategoryIcon(category)}
              </span>
              <span>{category}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
