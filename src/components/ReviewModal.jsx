import React, { useState, useEffect } from "react";
import { Star, X, MessageSquarePlus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ReviewModal = ({ productId, productName, isOpen, onClose }) => {
  const { addReview } = useCart();
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.name || "");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(productId, {
      user: userName.trim() || user?.name || "Verified Buyer",
      rating,
      comment: comment.trim(),
    });

    if (!user) setUserName("");
    setComment("");
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-orange-500/30 shadow-2xl space-y-4 sm:space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 sm:p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-6">
          <div className="flex items-center gap-1.5 text-orange-400 text-xs sm:text-sm font-bold">
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </div>
          <h3 className="text-base sm:text-xl font-black text-white">{productName}</h3>
          <p className="text-[11px] sm:text-xs text-gray-400">
            Share your experience to help other tech enthusiasts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Star Rating Picker */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1.5">
              Overall Rating
            </label>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 sm:p-1 hover:scale-125 transition"
                >
                  <Star
                    className={`w-5 h-5 sm:w-7 sm:h-7 ${
                      (hoverRating || rating) >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-bold text-amber-400">
                {hoverRating || rating} / 5
              </span>
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Vikram Sharma"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Comment input */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
              Detailed Feedback <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="What did you like or dislike? How does it perform?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gray-800 text-gray-300 text-xs sm:text-sm font-semibold hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs sm:text-sm font-bold hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/30"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
