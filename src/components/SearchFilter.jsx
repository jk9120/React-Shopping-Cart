import React from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  maxPrice,
  setMaxPrice,
  highestPrice,
  onResetFilters,
  hasActiveFilters
}) => {
  return (
    <div className="glass-panel rounded-2xl sm:rounded-3xl p-3 sm:p-5 mb-6 sm:mb-8 border border-gray-800 shadow-xl space-y-3 sm:space-y-4 w-full max-w-full overflow-hidden">
      {/* Top row: Search input, Sort Dropdown, In Stock toggle */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-4 items-center">
        {/* Search input */}
        <div className="md:col-span-6 relative w-full min-w-0">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, specs, brand (e.g. M4, 4K)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-gray-900 border border-gray-700/80 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full bg-gray-800"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Sort By dropdown */}
        <div className="md:col-span-3 relative w-full min-w-0">
          <div className="relative flex items-center">
            <ArrowUpDown className="w-4 h-4 text-orange-400 absolute left-3.5 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-9 pr-6 py-2.5 sm:py-3 bg-gray-900 border border-gray-700/80 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
            >
              <option value="featured">✨ Featured Deals</option>
              <option value="price-asc">💵 Price: Low to High</option>
              <option value="price-desc">💎 Price: High to Low</option>
              <option value="rating">⭐ Customer Rating</option>
              <option value="discount">🔥 Highest Discount</option>
              <option value="name">🔤 Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* In-Stock Filter Toggle & Reset Button */}
        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-2 w-full">
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition border ${
              inStockOnly
                ? "bg-green-950/60 border-green-500/50 text-green-400 shadow-lg shadow-green-950/40"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                inStockOnly ? "text-green-400" : "text-gray-500"
              }`}
            />
            <span>In Stock Only</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              title="Reset all filters"
              className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gray-800 hover:bg-gray-700 text-orange-400 text-xs font-semibold transition shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom row: Price Range Slider */}
      <div className="pt-2.5 sm:pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 w-full">
        <div className="flex items-center justify-between sm:justify-start gap-2 text-[11px] sm:text-xs font-bold text-gray-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
            <span>Max Price:</span>
          </div>
          <span className="text-white bg-gray-800 px-2 py-0.5 rounded-lg font-mono text-orange-400 font-bold">
            Up to ₹{maxPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex-1 max-w-md w-full flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="text-[10px] sm:text-xs text-gray-500 font-mono shrink-0">₹10k</span>
          <input
            type="range"
            min="10000"
            max={highestPrice || 350000}
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full min-w-0 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <span className="text-[10px] sm:text-xs text-gray-400 font-mono shrink-0">
            ₹{((highestPrice || 350000) / 1000).toFixed(0)}k+
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;