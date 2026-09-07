import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Mail,
  ShieldCheck,
  Truck,
  PhoneCall,
  MapPin,
  Send
} from "lucide-react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import PolicyModal from "./PolicyModal";

const footerPhrases = [
  {
    text: "MERN DEVELOPER By JAGAN",
    gradient: "from-orange-400 via-amber-300 to-orange-500",
    bracketColor: "text-orange-500",
  },
  {
    text: "FULL STACK DEVELOPER By JAGAN",
    gradient: "from-cyan-400 via-sky-300 to-blue-500",
    bracketColor: "text-cyan-400",
  },
  {
    text: "REACT & NODE.JS By JAGAN",
    gradient: "from-purple-400 via-fuchsia-400 to-pink-500",
    bracketColor: "text-fuchsia-400",
  },
  {
    text: "UI/UX & WEB ENGINEER By JAGAN",
    gradient: "from-emerald-400 via-teal-300 to-green-500",
    bracketColor: "text-emerald-400",
  },
  {
    text: "CRAFTED WITH PASSION By JAGAN",
    gradient: "from-yellow-300 via-amber-400 to-orange-400",
    bracketColor: "text-amber-400",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const { isDark } = useTheme();
  const [policyModal, setPolicyModal] = useState({
    isOpen: false,
    type: "shipping"
  });

  const openPolicy = (type) => {
    setPolicyModal({ isOpen: true, type });
  };

  // Footer Typewriter Animation state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [footerText, setFooterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = footerPhrases[phraseIndex].text;
    let timer;

    if (!isDeleting && footerText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && footerText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % footerPhrases.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(() => {
        setFooterText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [footerText, isDeleting, phraseIndex]);

  const currentPhrase = footerPhrases[phraseIndex];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thank you for subscribing to JGN STORE VIP Tech drops! 🚀");
      setEmail("");
    }
  };

  return (
    <footer
      className={`mt-12 sm:mt-20 border-t transition-colors duration-300 ${
        isDark
          ? "border-orange-500/20 bg-gray-950 text-gray-400"
          : "border-orange-200 bg-white text-gray-600 shadow-inner"
      }`}
    >
      {/* Top Banner features */}
      <div
        className={`border-b ${
          isDark ? "border-gray-900 bg-gray-900/40" : "border-gray-100 bg-orange-50/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-center sm:text-left">
          <button
            type="button"
            onClick={() => openPolicy("shipping")}
            className="flex items-center justify-center sm:justify-start gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-orange-500/5 border border-transparent hover:border-orange-500/20 transition-all text-left group cursor-pointer active:scale-98"
            title="Click to view Express Shipping Details"
          >
            <div className="p-2 sm:p-2.5 bg-orange-500/10 text-orange-500 rounded-xl sm:rounded-2xl border border-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h5
                className={`font-bold text-xs sm:text-sm group-hover:text-orange-500 transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Free Express Shipping
              </h5>
              <p className="text-[11px] text-gray-500">Across all metro cities in India • <span className="text-orange-500 underline decoration-dotted">Info</span></p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => openPolicy("warranty")}
            className="flex items-center justify-center sm:justify-start gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-orange-500/5 border border-transparent hover:border-orange-500/20 transition-all text-left group cursor-pointer active:scale-98"
            title="Click to view Genuine Brand Warranty Details"
          >
            <div className="p-2 sm:p-2.5 bg-orange-500/10 text-orange-500 rounded-xl sm:rounded-2xl border border-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h5
                className={`font-bold text-xs sm:text-sm group-hover:text-orange-500 transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                100% Genuine Guaranteed
              </h5>
              <p className="text-[11px] text-gray-500">Authorized brand warranty included • <span className="text-orange-500 underline decoration-dotted">Info</span></p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => openPolicy("support")}
            className="flex items-center justify-center sm:justify-start gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-orange-500/5 border border-transparent hover:border-orange-500/20 transition-all text-left group cursor-pointer active:scale-98"
            title="Click to view 24/7 Support Info"
          >
            <div className="p-2 sm:p-2.5 bg-orange-500/10 text-orange-500 rounded-xl sm:rounded-2xl border border-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h5
                className={`font-bold text-xs sm:text-sm group-hover:text-orange-500 transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                24/7 Dedicated Support
              </h5>
              <p className="text-[11px] text-gray-500">Expert help via live chat & call • <span className="text-orange-500 underline decoration-dotted">Info</span></p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Col 1: Brand info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-600 flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
              </div>
              <span
                className={`text-lg sm:text-xl font-black tracking-wider uppercase ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                JGN<span className="text-orange-500">STORE</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              India's premier digital hub for high-performance laptops, smartphones, studio gear, and wearables. Curated for engineers, creators, and tech lovers.
            </p>
            <div className="flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Cyber Hub, Gurugram, India</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4
              className={`font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 border-l-2 border-orange-500 pl-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Popular Categories
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li>
                <Link to="/?category=Laptop" className="hover:text-orange-500 transition">
                  MacBook & Creator Laptops
                </Link>
              </li>
              <li>
                <Link to="/?category=Phone" className="hover:text-orange-500 transition">
                  Flagship Smartphones
                </Link>
              </li>
              <li>
                <Link to="/?category=Camera" className="hover:text-orange-500 transition">
                  Mirrorless Cameras & 8K Lenses
                </Link>
              </li>
              <li>
                <Link to="/?category=Audio" className="hover:text-orange-500 transition">
                  ANC Headphones & Spatial Audio
                </Link>
              </li>
              <li>
                <Link to="/?category=Wearables" className="hover:text-orange-500 transition">
                  Smartwatches & Fitness Bands
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4
              className={`font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 border-l-2 border-orange-500 pl-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Customer Support
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li>
                <Link to="/cart" className="hover:text-orange-500 transition">
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-orange-500 transition">
                  Your Saved Wishlist
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy("shipping")}
                  className="cursor-pointer hover:text-orange-500 transition text-left"
                >
                  Track Delivery Status
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy("warranty")}
                  className="cursor-pointer hover:text-orange-500 transition text-left"
                >
                  Warranty & Returns Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy("support")}
                  className="cursor-pointer hover:text-orange-500 transition text-left"
                >
                  24/7 Tech Helpdesk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3 sm:space-y-4">
            <h4
              className={`font-bold text-xs sm:text-sm uppercase tracking-wider border-l-2 border-orange-500 pl-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Join Tech Insiders
            </h4>
            <p className="text-xs text-gray-500">
              Get notified about flash deals, unreleased drops, and exclusive coupon codes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-8 pr-10 py-2 sm:py-2.5 rounded-xl text-xs focus:outline-none focus:border-orange-500 border ${
                    isDark
                      ? "bg-gray-900 border-gray-800 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 sm:p-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition"
                >
                  <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom copyright with continuous typewriter animation in <> */}
        <div
          className={`mt-8 sm:mt-12 pt-6 sm:pt-8 pb-24 sm:pb-6 border-t text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 max-w-full overflow-hidden ${
            isDark ? "border-gray-900 text-gray-300" : "border-gray-200 text-gray-800"
          }`}
        >
          <h3 className="text-xs sm:text-lg md:text-xl font-black tracking-tight flex flex-wrap items-center justify-center gap-1 sm:gap-2 leading-relaxed max-w-full text-center">
            <span className="shrink-0">
              &copy; 2026{" "}
              <span className={isDark ? "text-white font-black" : "text-gray-950 font-black"}>
                @JGN STORE
              </span>{" "}
              <span className="text-orange-500 font-bold">||</span>
            </span>

            <span className="inline-flex items-center flex-wrap justify-center font-mono font-black max-w-full">
              <span
                className={`${currentPhrase.bracketColor} text-xs sm:text-lg md:text-xl transition-colors duration-500 shrink-0`}
              >
                &lt;
              </span>
              <span
                className={`bg-gradient-to-r ${currentPhrase.gradient} bg-clip-text text-transparent px-0.5 sm:px-1 font-black tracking-wide transition-all duration-300 text-xs sm:text-lg md:text-xl break-words`}
              >
                {footerText}
              </span>
              <span
                className={`${currentPhrase.bracketColor} text-xs sm:text-lg md:text-xl transition-colors duration-500 shrink-0`}
              >
                /&gt;
              </span>
              <span className="inline-block w-1 sm:w-1.5 h-3 sm:h-5 bg-orange-500 ml-1 rounded-full animate-pulse shrink-0" />
            </span>
          </h3>
        </div>
      </div>

      {/* Trust & Guarantee Policy Details Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        policyType={policyModal.type}
        onClose={() => setPolicyModal({ isOpen: false, type: "shipping" })}
      />
    </footer>
  );
};

export default Footer;