import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Tag,
  ArrowRight,
  Flame
} from "lucide-react";
import PolicyModal from "./PolicyModal";

const typewriterWords = [
  {
    text: "Pure Power",
    gradient: "from-orange-400 via-amber-300 to-orange-500",
    bracketColor: "text-orange-400",
    glow: "rgba(249, 115, 22, 0.4)"
  },
  {
    text: "Next-Gen Speed",
    gradient: "from-cyan-400 via-sky-300 to-blue-500",
    bracketColor: "text-cyan-400",
    glow: "rgba(6, 182, 212, 0.4)"
  },
  {
    text: "Ultimate Tech",
    gradient: "from-purple-400 via-fuchsia-400 to-pink-500",
    bracketColor: "text-fuchsia-400",
    glow: "rgba(217, 70, 239, 0.4)"
  },
  {
    text: "Pro Performance",
    gradient: "from-emerald-400 via-teal-300 to-green-500",
    bracketColor: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.4)"
  },
  {
    text: "Flagship Innovation",
    gradient: "from-yellow-300 via-amber-400 to-orange-400",
    bracketColor: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.4)"
  }
];

const HeroBanner = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [policyModal, setPolicyModal] = useState({
    isOpen: false,
    type: "shipping"
  });

  const openPolicy = (type) => {
    setPolicyModal({ isOpen: true, type });
  };

  // Typewriter continuous animation loop
  useEffect(() => {
    const fullWord = typewriterWords[wordIndex].text;
    let timer;

    if (!isDeleting && currentText === fullWord) {
      // Pause at full word before deleting
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && currentText === "") {
      // Move to next word after completely deleting
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % typewriterWords.length);
    } else {
      // Typing or Deleting
      const speed = isDeleting ? 45 : 85;
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullWord.substring(0, prev.length - 1)
            : fullWord.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  const activeTheme = typewriterWords[wordIndex];

  return (
    <div className="relative overflow-hidden w-full max-w-full mb-6 sm:mb-10 rounded-2xl sm:rounded-3xl border border-orange-500/30 bg-gradient-to-br from-gray-900 via-gray-950 to-orange-950/40 shadow-2xl p-3.5 sm:p-8 lg:p-10">
      {/* Background Neon Glowing Orbs */}
      <div className="absolute -top-16 -right-16 w-56 sm:w-96 h-56 sm:h-96 bg-orange-600/20 rounded-full blur-2xl sm:blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-16 -left-16 w-48 sm:w-80 h-48 sm:h-80 bg-amber-600/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
        {/* Left Text & CTA */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-5 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest max-w-full">
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce shrink-0" />
            <span className="truncate">Next-Gen Tech Festival 2026</span>
          </div>

          {/* Heading with Continuous Typewriter inside < > with Changing Colors */}
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight min-h-[52px] sm:min-h-[85px] lg:min-h-[125px] flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2 break-words max-w-full">
            <span>Upgrade Your Gear with</span>{" "}
            <span className="inline-flex items-center max-w-full flex-wrap">
              <span
                className={`font-mono font-black ${activeTheme.bracketColor} transition-colors duration-500 shrink-0`}
              >
                &lt;
              </span>
              <span
                className={`bg-gradient-to-r ${activeTheme.gradient} bg-clip-text text-transparent transition-all duration-300 px-0.5 sm:px-1 break-words`}
              >
                {currentText}
              </span>
              <span
                className={`font-mono font-black ${activeTheme.bracketColor} transition-colors duration-500 shrink-0`}
              >
                &gt;
              </span>
              <span className="inline-block w-1 sm:w-1.5 h-5 sm:h-7 lg:h-9 bg-orange-400 ml-1 rounded-full animate-pulse shrink-0" />
            </span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-base max-w-xl leading-relaxed">
            Discover cutting-edge laptops, flagship smartphones, pro cameras, and high-fidelity audio. Verified authentic tech with 1-year brand warranty.
          </p>

          {/* Promo code badge */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-gray-900/90 border border-gray-800 rounded-xl sm:rounded-2xl w-full">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold shrink-0">
              <Tag className="w-3.5 h-3.5" />
              <span>Special Offer:</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-orange-600 text-white font-mono text-[11px] sm:text-xs font-black rounded-lg tracking-wider shrink-0">
                SAVE10
              </span>
              <span className="text-[11px] sm:text-xs text-gray-300">
                Get 10% instant off on your first order!
              </span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 w-full">
            <a
              href="#products-section"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/product/101"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 bg-gray-900/80 hover:bg-gray-800 border border-gray-700 text-gray-200 font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition"
            >
              <Zap className="w-4 h-4 text-orange-400" />
              <span>View MacBook M4</span>
            </Link>
          </div>
        </div>

        {/* Right Featured Promo Spotlight Card */}
        <div className="lg:col-span-5 relative mt-2 lg:mt-0 min-w-0 w-full">
          <div className="relative glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-orange-500/20 shadow-2xl overflow-hidden group w-full">
            <div className="absolute top-3 right-3 z-20">
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-orange-600 to-red-600 text-white text-[10px] sm:text-xs font-black rounded-full shadow-lg">
                HOT DEAL
              </span>
            </div>

            <div className="relative h-44 sm:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-3">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80"
                alt="MacBook Air M4"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-orange-400 font-bold uppercase">Editor's Choice</p>
                  <h3 className="text-sm sm:text-lg font-black text-white truncate">MacBook Air M4</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs line-through text-gray-400">₹1,34,990</span>
                  <p className="text-sm sm:text-xl font-black text-white">₹1,19,990</p>
                </div>
              </div>
            </div>

            <Link
              to="/product/101"
              className="w-full py-2.5 bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-orange-500/30 flex items-center justify-center gap-2 transition"
            >
              <span>Grab This Deal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Trust Indicators Bar (Interactive & Clickable) */}
      <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-800/80 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-gray-300 text-xs">
        <button
          type="button"
          onClick={() => openPolicy("shipping")}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gray-900/40 hover:bg-gray-800/80 border border-gray-800/60 hover:border-orange-500/40 transition-all text-left group min-w-0 cursor-pointer active:scale-95 shadow-sm"
          title="Click to view Express Delivery Policy"
        >
          <div className="p-1.5 sm:p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-xs truncate group-hover:text-orange-400 transition-colors">Express Delivery</p>
            <p className="text-gray-400 text-[10px] truncate">Free on orders</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => openPolicy("warranty")}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gray-900/40 hover:bg-gray-800/80 border border-gray-800/60 hover:border-emerald-500/40 transition-all text-left group min-w-0 cursor-pointer active:scale-95 shadow-sm"
          title="Click to view 1 Year Official Brand Warranty Details"
        >
          <div className="p-1.5 sm:p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-xs truncate group-hover:text-emerald-400 transition-colors">Official Warranty</p>
            <p className="text-gray-400 text-[10px] truncate">100% Genuine</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => openPolicy("returns")}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gray-900/40 hover:bg-gray-800/80 border border-gray-800/60 hover:border-amber-500/40 transition-all text-left group min-w-0 cursor-pointer active:scale-95 shadow-sm"
          title="Click to view 7 Days Easy Replacement / Return Policy"
        >
          <div className="p-1.5 sm:p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-xs truncate group-hover:text-amber-400 transition-colors">7-Day Returns</p>
            <p className="text-gray-400 text-[10px] truncate">Easy replacement</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => openPolicy("support")}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gray-900/40 hover:bg-gray-800/80 border border-gray-800/60 hover:border-purple-500/40 transition-all text-left group min-w-0 cursor-pointer active:scale-95 shadow-sm"
          title="Click to view 24/7 Dedicated Support Information"
        >
          <div className="p-1.5 sm:p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-xs truncate group-hover:text-purple-400 transition-colors">24/7 Support</p>
            <p className="text-gray-400 text-[10px] truncate">Dedicated help</p>
          </div>
        </button>
      </div>

      {/* Policy Details Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        policyType={policyModal.type}
        onClose={() => setPolicyModal({ isOpen: false, type: "shipping" })}
      />
    </div>
  );
};

export default HeroBanner;
