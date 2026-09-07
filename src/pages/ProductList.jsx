import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import {
  Sparkles,
  PackageOpen,
  RotateCcw,
  Clock,
  Flame,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, recentlyViewed } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Find max product price for the slider
  const highestPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 350000);
  }, [products]);

  // States for search and filter
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(highestPrice);

  // Sync URL search params
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");
    if (urlSearch !== null) setSearchTerm(urlSearch);
    if (urlCategory !== null) setSelectedCategory(urlCategory);
  }, [searchParams]);

  // Check if any filter is active
  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All" ||
    sortBy !== "featured" ||
    inStockOnly ||
    maxPrice < highestPrice;

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("featured");
    setInStockOnly(false);
    setMaxPrice(highestPrice);
    setSearchParams({});
  };

  // Filter and Sort Pipeline
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      // 1. Search term
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        (product.brand && product.brand.toLowerCase().includes(term)) ||
        product.category.toLowerCase().includes(term);

      // 2. Category
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // 3. In stock
      const matchesStock = !inStockOnly || (product.stockCount && product.stockCount > 0);

      // 4. Max Price
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesStock && matchesPrice;
    });

    // Sort result
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount":
        result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy, inStockOnly, maxPrice]);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden">
      {/* Hero Showcase Banner */}
      <HeroBanner />

      {/* Products Browsing Section Anchor */}
      <div id="products-section" className="space-y-4 sm:space-y-6 w-full">
        {/* Category Pills Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === "All") {
              searchParams.delete("category");
            } else {
              searchParams.set("category", cat);
            }
            setSearchParams(searchParams);
          }}
        />

        {/* Search, Sort, Price Filter Toolbar */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={(term) => {
            setSearchTerm(term);
            if (!term) {
              searchParams.delete("search");
            } else {
              searchParams.set("search", term);
            }
            setSearchParams(searchParams);
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          highestPrice={highestPrice}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Section Header with Item Count & Active Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 sm:pb-2 w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" />
            <h2 className="text-lg sm:text-2xl font-black text-white">
              {selectedCategory === "All"
                ? "All Available Tech"
                : `${selectedCategory} Collection`}
            </h2>
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-bold text-[11px] sm:text-xs border border-orange-500/20 shrink-0">
              {filteredAndSortedProducts.length} Items
            </span>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-400">
              <span>Filtered results</span>
              <button
                onClick={handleResetFilters}
                className="text-orange-400 font-semibold underline hover:text-orange-300"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6 w-full">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8 sm:my-12 border border-gray-800 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center border border-gray-800 text-orange-500">
              <PackageOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              No Matching Tech Found
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              We couldn't find any products matching your current search or price criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Recently Viewed Products Section */}
      {recentlyViewed.length > 0 && (
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-800/80">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                Recently Viewed Gear
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 w-full">
            {recentlyViewed.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group p-2 sm:p-3 bg-gray-900/80 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-orange-500/40 transition block min-w-0"
              >
                <div className="h-20 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden bg-gray-950 mb-1.5 sm:mb-2 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-[11px] sm:text-xs font-bold text-white truncate group-hover:text-orange-400 transition">
                  {item.name}
                </p>
                <p className="text-[11px] sm:text-xs font-black text-orange-400 mt-0.5 sm:mt-1">
                  ₹{item.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;