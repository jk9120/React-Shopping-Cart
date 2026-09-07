import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChevronLeft,
  Tag,
  Zap,
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  MessageSquarePlus,
  Share2,
  Sparkles
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ReviewModal from "../components/ReviewModal";
import PolicyModal from "../components/PolicyModal";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addRecentlyViewed
  } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState({
    isOpen: false,
    type: "shipping"
  });

  const openPolicyModal = (type) => {
    setPolicyModal({ isOpen: true, type });
  };

  useEffect(() => {
    const current = products.find((p) => String(p.id) === String(id));
    if (current) {
      setProduct(current);
      setSelectedImage(current.image);
      setQuantity(1);
      addRecentlyViewed(current);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-gray-400 text-xs sm:text-sm">
          The item you are searching for might be out of stock or discontinued.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const imageGallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", {
        state: {
          from: { pathname: "/checkout" },
          message: `Please Sign In or Register with OTP to buy "${product.name}"! 🔒`,
        },
      });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard! 📋");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-12 overflow-hidden">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between w-full">
        <Link
          to="/"
          className="inline-flex items-center text-xs sm:text-sm font-bold text-gray-400 hover:text-orange-400 transition"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span>Back to Store</span>
        </Link>

        <button
          onClick={handleShare}
          className="p-2 sm:p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
          title="Share product link"
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4 w-full min-w-0">
          {/* Main Large Image */}
          <div className="relative h-64 sm:h-96 lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl group w-full">
            {product.badge && (
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-orange-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg sm:rounded-xl shadow-lg">
                {product.badge}
              </span>
            )}
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Thumbnail Selector */}
          {imageGallery.length > 1 && (
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 max-w-full scrollbar-none overscroll-x-contain touch-pan-x">
              {imageGallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition shrink-0 bg-gray-900 ${
                    selectedImage === imgUrl
                      ? "border-orange-500 ring-2 ring-orange-500/30 scale-105"
                      : "border-gray-800 hover:border-gray-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Purchase Controls */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          {/* Brand & Category & Wishlist */}
          <div className="flex items-center justify-between">
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 font-extrabold text-[10px] sm:text-xs border border-orange-500/30 uppercase tracking-wider">
              {product.brand || "Authentic Tech"} • {product.category}
            </span>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition border flex items-center gap-1.5 text-xs font-bold ${
                wishlisted
                  ? "bg-red-500/20 text-red-500 border-red-500/40"
                  : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  wishlisted ? "fill-red-500" : ""
                }`}
              />
              <span>{wishlisted ? "Saved" : "Save"}</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            {product.name}
          </h1>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-amber-500/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border border-amber-500/30 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-extrabold text-xs sm:text-sm">
                {product.rating || 4.8}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-400 font-semibold">
              ({product.reviewCount || 42} verified customer reviews)
            </span>
          </div>

          {/* Pricing & Discount */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-1">
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-2xl sm:text-4xl font-black text-orange-400">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-lg text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discountPercent && (
                <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] sm:text-xs font-black rounded-md">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-400">
              Inclusive of all taxes. Free express delivery eligible.
            </p>
          </div>

          {/* Product Description */}
          <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-3 sm:space-y-4 pt-1">
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Qty:
                </span>
                <div className="flex items-center bg-gray-900 rounded-xl border border-gray-700 p-0.5 sm:p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs sm:text-sm font-bold text-white font-mono min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stock status */}
              <div className="text-[11px] sm:text-xs font-bold">
                {product.stockCount && product.stockCount < 6 ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {product.stockCount} left
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={handleAddToCart}
                className="py-3 sm:py-3.5 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black rounded-xl sm:rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 text-xs sm:text-sm transition transform active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add to Cart ({quantity})</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 sm:py-3.5 px-4 bg-gray-800 hover:bg-gray-700 text-orange-400 hover:text-white font-black rounded-xl sm:rounded-2xl border border-orange-500/40 flex items-center justify-center gap-2 text-xs sm:text-sm transition cursor-pointer"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Buy Now with 1-Click</span>
              </button>
            </div>
          </div>

          {/* Guarantee Highlights (Interactive & Clickable) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-800 text-center">
            <button
              type="button"
              onClick={() => openPolicyModal("shipping")}
              className="p-2 sm:p-3 bg-gray-900/70 hover:bg-gray-800/90 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all duration-200 cursor-pointer text-center group hover:scale-[1.03] active:scale-95 shadow-md flex flex-col items-center justify-between"
              title="Click to view Express Shipping Details"
            >
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:scale-110 transition-transform mb-1" />
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-white group-hover:text-orange-400 transition-colors">Free Express</p>
                <p className="text-[9px] sm:text-[10px] text-gray-400">Fast delivery</p>
              </div>
              <span className="text-[8px] sm:text-[9px] text-orange-400/90 font-bold uppercase tracking-wider mt-1 underline decoration-dotted">Details</span>
            </button>

            <button
              type="button"
              onClick={() => openPolicyModal("warranty")}
              className="p-2 sm:p-3 bg-gray-900/70 hover:bg-gray-800/90 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-200 cursor-pointer text-center group hover:scale-[1.03] active:scale-95 shadow-md flex flex-col items-center justify-between"
              title="Click to view 1 Year Brand Warranty Coverage"
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">1 Year Warranty</p>
                <p className="text-[9px] sm:text-[10px] text-gray-400">Authorized</p>
              </div>
              <span className="text-[8px] sm:text-[9px] text-emerald-400/90 font-bold uppercase tracking-wider mt-1 underline decoration-dotted">Details</span>
            </button>

            <button
              type="button"
              onClick={() => openPolicyModal("returns")}
              className="p-2 sm:p-3 bg-gray-900/70 hover:bg-gray-800/90 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer text-center group hover:scale-[1.03] active:scale-95 shadow-md flex flex-col items-center justify-between"
              title="Click to view 7 Days Return & Replacement Policy"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform mb-1" />
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-white group-hover:text-amber-400 transition-colors">7 Days Return</p>
                <p className="text-[9px] sm:text-[10px] text-gray-400">Hassle free</p>
              </div>
              <span className="text-[8px] sm:text-[9px] text-amber-400/90 font-bold uppercase tracking-wider mt-1 underline decoration-dotted">Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Table Section */}
      {product.specs && (
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-800 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Technical Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-xl sm:rounded-2xl bg-gray-900 border border-gray-800/80 text-xs sm:text-sm"
              >
                <span className="font-bold text-gray-400">{key}</span>
                <span className="font-semibold text-white text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-800 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4 sm:pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                Customer Reviews
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Read real feedback from verified owners
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gray-900/90 border border-gray-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-600/20 text-orange-400 font-bold flex items-center justify-center text-[10px] sm:text-xs border border-orange-500/30">
                      {rev.user.charAt(0)}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {rev.user}
                    </span>
                    <span className="text-[9px] sm:text-[10px] px-2 py-0.2 rounded-full bg-green-950/60 text-green-400 border border-green-800/40">
                      Verified
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-gray-500">
                    {rev.date}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        i < rev.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-gray-400 text-center py-4">
            No reviews yet. Be the first to share your thoughts!
          </p>
        )}
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 sm:space-y-6 pt-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Similar Tech You Might Like
            </h3>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Review submission modal */}
      <ReviewModal
        productId={product.id}
        productName={product.name}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      {/* Trust & Guarantee Policy Info Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        policyType={policyModal.type}
        onClose={() => setPolicyModal({ isOpen: false, type: "shipping" })}
      />
    </div>
  );
};

export default ProductDetail;
