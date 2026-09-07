import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
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
  Heart,
  ChevronLeft,
  Check
} from "lucide-react";
import { useAuth, PRESET_AVATARS } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Profile = () => {
  const { user, updateProfile, logout, isAuthenticated } = useAuth();
  const { wishlistCount, cartCount } = useCart();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState(user?.avatar || PRESET_AVATARS[0].url);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // If not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto flex items-center justify-center border border-gray-800 text-orange-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Please Sign In</h2>
        <p className="text-gray-400 text-xs sm:text-sm">
          You need to be logged in to view and customize your profile photo.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-orange-600/30"
        >
          <span>Sign In / Register</span>
        </Link>
      </div>
    );
  }

  // Handle custom image file upload from device
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      setAvatar(base64Data);
      // Auto update immediately
      updateProfile({ avatar: base64Data });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (presetUrl) => {
    setAvatar(presetUrl);
    updateProfile({ avatar: presetUrl });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || user.name,
      phone: phone.trim() || user.phone,
      email: email.trim().toLowerCase() || user.email,
      address: address.trim() || user.address,
      avatar: avatar || user.avatar,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 min-h-[80vh]">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-xs sm:text-sm font-bold text-gray-400 hover:text-orange-400 transition"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Back to Store</span>
        </Link>

        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 text-red-400 hover:text-white hover:bg-red-600 border border-red-900/30 text-xs font-bold transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl relative overflow-hidden space-y-6">
        {/* Success Alert Banner */}
        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 shadow-lg animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">Profile & DP updated successfully! ✨</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
          {/* Main User Avatar DP Container with Click-to-Upload */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-orange-500/60 bg-gray-950 shadow-2xl shadow-orange-500/30 group-hover:border-orange-400 transition-all duration-300">
                <img
                  src={avatar || user.avatar || PRESET_AVATARS[0].url}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Camera Upload Badge */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-3xl flex items-center justify-center transition duration-200">
                <Camera className="w-8 h-8 text-white animate-bounce-short" />
              </div>

              <button
                type="button"
                className="absolute -bottom-2 -right-2 p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xl border-2 border-gray-950 transition hover:scale-110 cursor-pointer"
                title="Click to Upload Custom Photo"
              >
                <Camera className="w-4 h-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer mt-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>
          </div>

          {/* User Info Header */}
          <div className="flex-1 text-center sm:text-left space-y-1.5 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-3xl font-black text-white truncate">
                {user.name}
              </h1>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 self-center sm:self-auto">
                ✓ Verified Account
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-400">{user.phone}</p>
            <p className="text-[11px] text-orange-400 font-mono pt-1">
              Member since: {user.joinedDate || "2026"}
            </p>
          </div>
        </div>

        {/* Preset Avatars Selection Bar */}
        <div className="pt-4 border-t border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Or Choose a Preset HD Avatar (1-Click)</span>
            </h3>
            <span className="text-[10px] text-gray-400">Click to apply instantly</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
            {PRESET_AVATARS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.url)}
                className={`relative rounded-2xl overflow-hidden p-1 border transition-all text-center group cursor-pointer ${
                  avatar === preset.url
                    ? "border-orange-500 bg-orange-500/20 ring-2 ring-orange-500/50 scale-105"
                    : "border-gray-800 bg-gray-900 hover:border-orange-500/40"
                }`}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-950 mb-1">
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
                  <div className="absolute top-1 right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-[9px] shadow-md font-bold">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Personal Information Form */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-800 space-y-5">
        <h3 className="text-base sm:text-lg font-black text-white border-b border-gray-800 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
          <span>Personal Information & Default Delivery Address</span>
        </h3>

        <form onSubmit={handleSaveDetails} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                Default Delivery Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat/House no., Street, Landmark, City, State, PIN code"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 transition cursor-pointer active:scale-95"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
