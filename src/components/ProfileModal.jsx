import React, { useState, useRef } from "react";
import {
  X,
  Camera,
  Upload,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  Sparkles,
  ShoppingBag,
  Heart
} from "lucide-react";
import { useAuth, PRESET_AVATARS } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout } = useAuth();
  const { wishlistCount, cartCount } = useCart();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState(user?.avatar || PRESET_AVATARS[0].url);
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "dp"

  if (!isOpen || !user) return null;

  // Handle custom image file upload from device
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      setAvatar(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || user.name,
      phone: phone.trim() || user.phone,
      email: email.trim().toLowerCase() || user.email,
      address: address.trim() || user.address,
      avatar: avatar || user.avatar,
    });
    onClose();
  };

  const handleSignOut = () => {
    onClose();
    logout();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-orange-500/40 shadow-2xl space-y-5 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 sm:p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Top Header & Avatar Preview */}
        <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
          <div className="relative group shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-orange-500/60 bg-gray-900 shadow-xl shadow-orange-500/20">
              <img
                src={avatar || user.avatar || PRESET_AVATARS[0].url}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-lg border border-gray-900 transition hover:scale-110 cursor-pointer"
              title="Upload Photo from Device"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-xl font-black text-white truncate">
                {user.name}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                Verified
              </span>
            </div>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
            <p className="text-[11px] text-orange-400/90 font-mono mt-0.5">
              Member since: {user.joinedDate || "2026"}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-900 rounded-xl p-1 border border-gray-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Personal Details & Address
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dp")}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === "dp"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Change Photo (DP)
          </button>
        </div>

        {/* Tab 1: Profile & Address Form */}
        {activeTab === "profile" ? (
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                Default Delivery Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat/House no., Street, Landmark, City, State, PIN code"
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>

            {/* Account Quick Stats */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-red-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">Wishlist</p>
                  <p className="text-xs font-bold text-white">{wishlistCount} saved items</p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">Cart Items</p>
                  <p className="text-xs font-bold text-white">{cartCount} items</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800 gap-3">
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 text-red-400 hover:text-white hover:bg-red-600 border border-red-900/30 text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Tab 2: Change DP / Avatar */
          <div className="space-y-4">
            {/* Custom Photo Upload Box */}
            <div className="p-4 rounded-2xl bg-gray-900/90 border border-dashed border-orange-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 mx-auto flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Upload Custom Photo from Phone/PC
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Supports PNG, JPG, JPEG or WebP (max 5MB)
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Choose Photo File</span>
              </button>
            </div>

            {/* Preset Avatar Gallery */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                <span>Or Choose a Tech Avatar Preset</span>
                <span className="text-[10px] text-orange-400">1-Click Select</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setAvatar(preset.url)}
                    className={`relative rounded-xl overflow-hidden p-1 border transition-all text-center group cursor-pointer ${
                      avatar === preset.url
                        ? "border-orange-500 bg-orange-500/20 ring-2 ring-orange-500/40 scale-105"
                        : "border-gray-800 bg-gray-900 hover:border-gray-700"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-950 mb-1">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white block truncate">
                      {preset.name}
                    </span>
                    {avatar === preset.url && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-[9px] shadow-md">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply DP Button */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold"
              >
                Back to Details
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition cursor-pointer"
              >
                Save New Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
