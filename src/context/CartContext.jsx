import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast, Bounce } from "react-toastify";
import { initialProducts, PROMO_CODES } from "../data/product";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Products state (can be updated when user adds reviews)
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("jgn_products");
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("jgn_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("jgn_wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  // Recently Viewed persisted in localStorage
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem("jgn_recently_viewed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("jgn_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("jgn_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("jgn_recently_viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("jgn_products", JSON.stringify(products));
  }, [products]);

  // Toast helper
  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Add Item into the Cart (supports adding specific quantity)
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ""}"${product.name}" to cart!`);
  };

  // Remove Item from Cart
  const removeFromCart = (productId, removeAll = false) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (!existingItem) return prevCart;

      if (removeAll || existingItem.quantity === 1) {
        showToast(`Removed "${existingItem.name}" from cart`, "info");
        return prevCart.filter((item) => item.id !== productId);
      } else {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // Update specific quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, true);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, "info");
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to wishlist ❤️`);
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast("Wishlist cleared", "info");
  };

  // Recently Viewed tracker
  const addRecentlyViewed = (product) => {
    if (!product || !product.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  // Add Product Review
  const addReview = (productId, reviewData) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === productId) {
          const newReviews = [
            {
              id: Date.now(),
              user: reviewData.user || "Verified Customer",
              rating: Number(reviewData.rating) || 5,
              date: "Just now",
              comment: reviewData.comment,
            },
            ...(p.reviews || []),
          ];
          const newAvg = (
            newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length
          ).toFixed(1);

          return {
            ...p,
            reviews: newReviews,
            rating: Number(newAvg),
            reviewCount: newReviews.length,
          };
        }
        return p;
      })
    );
    showToast("Review submitted successfully! Thank you!");
  };

  // Apply Coupon code
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = PROMO_CODES[cleanCode];

    if (!coupon) {
      showToast("Invalid coupon code! Try SAVE10 or TECH20", "error");
      return false;
    }

    if (cartSubtotal < coupon.minAmount) {
      showToast(`Minimum order amount of ₹${coupon.minAmount.toLocaleString()} required for this coupon!`, "error");
      return false;
    }

    setAppliedCoupon(coupon);
    showToast(`Coupon "${cleanCode}" applied successfully! 🎉`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  // Totals calculations
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent) {
      return (cartSubtotal * appliedCoupon.discountPercent) / 100;
    }
    if (appliedCoupon.flatDiscount) {
      return Math.min(appliedCoupon.flatDiscount, cartSubtotal);
    }
    return 0;
  }, [appliedCoupon, cartSubtotal]);

  const cartTotal = useMemo(
    () => Math.max(0, cartSubtotal - discountAmount),
    [cartSubtotal, discountAmount]
  );

  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        appliedCoupon,
        cartCount,
        wishlistCount,
        cartSubtotal,
        discountAmount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        addRecentlyViewed,
        addReview,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);