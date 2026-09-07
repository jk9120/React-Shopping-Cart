import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  ShieldCheck,
  ChevronLeft,
  Lock,
  CheckCircle2,
  Zap,
  Package
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import OrderConfirmation from "./OrderConfirmation";

// Indian Popular Banks List for Net Banking
const popularBanks = [
  { id: "hdfc", name: "HDFC Bank", short: "HDFC", color: "from-blue-600 to-blue-800" },
  { id: "sbi", name: "State Bank of India", short: "SBI", color: "from-sky-600 to-blue-700" },
  { id: "icici", name: "ICICI Bank", short: "ICICI", color: "from-orange-600 to-red-700" },
  { id: "axis", name: "Axis Bank", short: "Axis", color: "from-pink-700 to-purple-800" },
  { id: "kotak", name: "Kotak Mahindra Bank", short: "Kotak", color: "from-red-600 to-rose-800" },
  { id: "pnb", name: "Punjab National Bank", short: "PNB", color: "from-amber-600 to-yellow-700" },
  { id: "bob", name: "Bank of Baroda", short: "BOB", color: "from-orange-500 to-amber-700" },
  { id: "canara", name: "Canara Bank", short: "Canara", color: "from-blue-500 to-cyan-700" },
  { id: "indusind", name: "IndusInd Bank", short: "IndusInd", color: "from-rose-700 to-pink-800" },
  { id: "idfc", name: "IDFC FIRST Bank", short: "IDFC FIRST", color: "from-red-700 to-amber-800" },
  { id: "yes", name: "Yes Bank", short: "Yes Bank", color: "from-blue-700 to-indigo-800" },
  { id: "union", name: "Union Bank of India", short: "Union Bank", color: "from-blue-800 to-red-700" },
];

const allOtherBanks = [
  "AU Small Finance Bank",
  "Bandhan Bank",
  "Bank of India (BOI)",
  "Bank of Maharashtra",
  "Central Bank of India",
  "City Union Bank",
  "DBS Bank India",
  "Federal Bank",
  "Indian Bank",
  "Indian Overseas Bank",
  "Jammu & Kashmir Bank",
  "Karnataka Bank",
  "Karur Vysya Bank",
  "Punjab & Sind Bank",
  "RBL Bank",
  "South Indian Bank",
  "Standard Chartered Bank India",
  "Tamilnad Mercantile Bank",
  "UCO Bank"
];

const Checkout = () => {
  const {
    cart,
    cartTotal,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    clearCart
  } = useCart();

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Strict Authentication Guard
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: { pathname: "/checkout" },
          message: "You must Sign In or Register with OTP before placing an order! 🔒",
        },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Form Details prefilled from authenticated user
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+91 98765 43210",
    address: user?.address || "Tower 4, Flat 1202, Cyber Heights",
    city: "Gurugram",
    state: "Haryana",
    zip: "122002",
  });

  useEffect(() => {
    if (user?.name) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  // Payment method: "card" | "upi" | "cod" | "netbanking"
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Selected Bank for Net Banking
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Card details
  const [cardData, setCardData] = useState({
    number: "4532 •••• •••• 8892",
    name: "",
    expiry: "12/28",
    cvv: "•••",
  });

  // State for order confirmation
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1-Click Demo Address Filler
  const handleFillDemo = () => {
    setFormData({
      name: "Rohit Malhotra",
      email: "rohit.malhotra@example.com",
      phone: "+91 98765 43210",
      address: "Tower 4, Flat 1202, Cyber Heights, Sector 62",
      city: "Gurugram",
      state: "Haryana",
      zip: "122002",
    });
    setCardData({
      number: "4532 7812 9023 8892",
      name: "ROHIT MALHOTRA",
      expiry: "09/29",
      cvv: "782",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      orderId: `JGN-${Math.floor(100000 + Math.random() * 900000)}`,
      orderDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      deliveryDetails: formData,
      paymentMethod,
      bankName: paymentMethod === "netbanking" ? selectedBank : null,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: cartTotal,
      couponCode: appliedCoupon?.code || null,
    };

    setConfirmedOrder(order);
    clearCart();
  };

  if (confirmedOrder) {
    return <OrderConfirmation order={confirmedOrder} />;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-gray-400 text-xs sm:text-sm">
          Please add items to your cart before proceeding to checkout.
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

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 min-h-screen overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4 sm:pb-6 w-full">
        <div>
          <Link
            to="/cart"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-gray-400 hover:text-orange-400 transition mb-1 sm:mb-2"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-xl sm:text-4xl font-black text-white flex items-center gap-2 sm:gap-3">
            <span>Secure Checkout</span>
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
          </h1>
        </div>

        {/* Demo Fill Helper */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold transition self-start sm:self-auto shrink-0"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Fill Demo Details</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 w-full min-w-0">
          {/* Active Logged In User DP Summary */}
          <div className="p-3 sm:p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-orange-500/50 bg-gray-950 shrink-0 shadow-sm">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={user?.name || "User DP"}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-gray-950" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-black text-white truncate">
                  Ordering as <span className="text-orange-400">{user?.name}</span>
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                  {user?.email} • {user?.phone}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-bold border border-emerald-500/20 shrink-0">
              Verified Member
            </span>
          </div>

          {/* Step 1: Shipping Information */}
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-800 space-y-4 sm:space-y-6 w-full">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-xs sm:text-sm">
                  1
                </div>
                <h3 className="text-base sm:text-xl font-black text-white flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <span>Shipping Address</span>
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 2-Day Delivery
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rohit Malhotra"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                  Street Address / House No <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Flat 1202, Cyber Heights..."
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Gurugram / Mumbai"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                  PIN Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  required
                  placeholder="110001"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-800 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2.5 sm:gap-3 border-b border-gray-800 pb-3 sm:pb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-xs sm:text-sm">
                2
              </div>
              <h3 className="text-base sm:text-xl font-black text-white flex items-center gap-1.5 sm:gap-2">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <span>Payment Method</span>
              </h3>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition flex flex-col justify-between gap-2 sm:gap-3 ${
                  paymentMethod === "upi"
                    ? "bg-orange-500/15 border-orange-500 text-white ring-2 ring-orange-500/20"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                <QrCode className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === "upi" ? "text-orange-400" : "text-gray-400"}`} />
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-white">Instant UPI</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">QR / GPay / PhonePe</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition flex flex-col justify-between gap-2 sm:gap-3 ${
                  paymentMethod === "card"
                    ? "bg-orange-500/15 border-orange-500 text-white ring-2 ring-orange-500/20"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                <CreditCard className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === "card" ? "text-orange-400" : "text-gray-400"}`} />
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-white">Cards</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">Credit / Debit</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition flex flex-col justify-between gap-2 sm:gap-3 ${
                  paymentMethod === "cod"
                    ? "bg-orange-500/15 border-orange-500 text-white ring-2 ring-orange-500/20"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                <Banknote className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === "cod" ? "text-orange-400" : "text-gray-400"}`} />
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-white">Cash on Delivery</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">Pay at Doorstep</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition flex flex-col justify-between gap-2 sm:gap-3 ${
                  paymentMethod === "netbanking"
                    ? "bg-orange-500/15 border-orange-500 text-white ring-2 ring-orange-500/20"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                <Building className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === "netbanking" ? "text-orange-400" : "text-gray-400"}`} />
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-white">Net Banking</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">All Indian Banks</p>
                </div>
              </button>
            </div>

            {/* Sub-view according to payment method */}
            {paymentMethod === "upi" && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gray-900/90 border border-gray-800 text-center space-y-3 sm:space-y-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white p-2.5 sm:p-3 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=jgnstore@upi&pn=JGNSTORE"
                    alt="Scan UPI QR"
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">
                    Scan with any UPI App (GPay, PhonePe, Paytm)
                  </p>
                  <p className="text-[11px] text-gray-400">
                    UPI ID: <span className="text-orange-400 font-mono font-bold">jgnstore@upi</span>
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-3 sm:space-y-4 p-4 sm:p-5 bg-gray-900/90 rounded-2xl border border-gray-800">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4532 0000 0000 0000"
                    value={cardData.number}
                    onChange={(e) =>
                      setCardData({ ...cardData, number: e.target.value })
                    }
                    className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white text-xs sm:text-sm font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData({ ...cardData, expiry: e.target.value })
                      }
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white text-xs sm:text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData({ ...cardData, cvv: e.target.value })
                      }
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5 sm:gap-3">
                <Banknote className="w-5 h-5 shrink-0 text-amber-400" />
                <span>
                  Pay comfortably in Cash or UPI upon package arrival at your doorstep.
                </span>
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="space-y-4 p-4 sm:p-5 bg-gray-900/90 rounded-2xl border border-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-orange-400" />
                    <span>Select Your Bank for Net Banking:</span>
                  </p>
                  <span className="text-[10px] text-orange-400 font-bold">100% Secure Gateway</span>
                </div>

                {/* Popular Banks Interactive Clickable Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {popularBanks.map((bank) => {
                    const isSelected = selectedBank === bank.name;
                    return (
                      <button
                        type="button"
                        key={bank.id}
                        onClick={() => setSelectedBank(bank.name)}
                        className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group active:scale-98 ${
                          isSelected
                            ? "bg-orange-500/20 border-orange-500 text-white ring-2 ring-orange-500/40 shadow-lg shadow-orange-500/10"
                            : "bg-gray-950/80 border-gray-800 text-gray-300 hover:border-orange-500/50 hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${bank.color} flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-sm`}
                          >
                            {bank.short.charAt(0)}
                          </div>
                          <span
                            className={`text-xs font-bold truncate ${
                              isSelected ? "text-orange-400 font-black" : "text-white"
                            }`}
                          >
                            {bank.short}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Searchable / Dropdown Select for All Other Indian Banks */}
                <div className="space-y-1.5 pt-2 border-t border-gray-800">
                  <label className="block text-[11px] font-bold uppercase text-gray-400">
                    Or Choose from All Other Indian Banks (30+ Banks):
                  </label>
                  <div className="relative">
                    <select
                      value={popularBanks.some((b) => b.name === selectedBank) ? "" : selectedBank}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedBank(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-gray-950 border border-gray-700 focus:border-orange-500 rounded-xl text-white text-xs sm:text-sm font-semibold focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        -- Click to select any other Indian Bank --
                      </option>
                      {allOtherBanks.map((bankName) => (
                        <option key={bankName} value={bankName} className="bg-gray-900 text-white py-1">
                          {bankName}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-3 pointer-events-none text-gray-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Active Selected Bank Summary Banner */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-2 animate-fade-in">
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      Selected: <strong className="text-white">{selectedBank}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono shrink-0">
                    Direct NetBanking
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-800 shadow-2xl space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3 sm:pb-4">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">Order Review</h3>
            </div>

            {/* Items summary list */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-9 h-9 object-cover rounded-lg border border-gray-800 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-white truncate">{item.name}</p>
                      <p className="text-gray-400 text-[10px]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-orange-400 font-mono shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total breakdown */}
            <div className="space-y-2 text-xs sm:text-sm border-t border-gray-800 pt-3 sm:pt-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span className="font-bold text-white font-mono">
                  ₹{cartSubtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-300">
                <span>Shipping:</span>
                <span className="text-emerald-400 font-bold font-mono">FREE</span>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-gray-800 flex justify-between items-baseline">
                <span className="text-xs sm:text-base font-extrabold text-white">
                  Total Payable:
                </span>
                <span className="text-xl sm:text-3xl font-black text-orange-400 font-mono">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit & Place Order Button */}
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition transform active:scale-98 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Confirm & Pay ₹{cartTotal.toLocaleString()}</span>
            </button>

            <div className="text-[10px] sm:text-[11px] text-gray-500 text-center">
              By confirming, you agree to our 7-day money-back policy and terms.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
