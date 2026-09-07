import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  KeyRound,
  Camera,
  RotateCcw,
  Sparkles,
  Upload,
  LogOut
} from "lucide-react";
import { useAuth, PRESET_AVATARS } from "../context/AuthContext";

const Auth = () => {
  // Method: "otp" | "password"
  const [authMethod, setAuthMethod] = useState("otp");
  // Tab for OTP: "login" | "register"
  const [isLoginTab, setIsLoginTab] = useState(true);
  // OTP Step: "input" | "verify"
  const [otpStep, setOtpStep] = useState("input");

  // OTP Form fields
  const [identifier, setIdentifier] = useState(""); // phone or email
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0].url);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(0);

  // Password Form fields
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const {
    sendOtp,
    verifyOtp,
    login,
    register,
    demoLogin,
    isAuthenticated,
    user,
    logout
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination (e.g. /checkout if clicked buy now or proceed to checkout)
  const from = location.state?.from?.pathname || "/";
  const redirectMessage = location.state?.message;

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle photo upload from camera/gallery
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image file too large! Please choose an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedAvatar(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Step 1: Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim()) {
      setErrorMsg("Please enter your mobile number or email address.");
      return;
    }

    if (!isLoginTab && !name.trim()) {
      setErrorMsg("Please enter your full name for registration.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = sendOtp(identifier, !isLoginTab, name);
      setLoading(false);

      if (res.success) {
        setOtpStep("verify");
        setCountdown(30);
        setOtpDigits(["", "", "", ""]);
        // Focus first OTP box
        setTimeout(() => otpInputRefs[0]?.current?.focus(), 100);
      }
    }, 400);
  };

  // Step 2: Handle OTP digit input auto-advance
  const handleOtpDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto advance to next input box
    if (value && index < 3) {
      otpInputRefs[index + 1]?.current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1]?.current?.focus();
    }
  };

  // Handle OTP Verification submit
  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const fullOtp = otpDigits.join("");
    if (fullOtp.length < 4) {
      setErrorMsg("Please enter the complete 4-digit OTP.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const success = verifyOtp(identifier, fullOtp, {
        name: name.trim(),
        avatar: selectedAvatar,
      });

      if (success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg("Invalid OTP code. Please check your SMS toast or resend.");
      }
    }, 400);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (countdown > 0) return;
    setErrorMsg("");
    sendOtp(identifier, !isLoginTab, name);
    setCountdown(30);
  };

  // Password Login
  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const success = login(loginForm.email, loginForm.password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg("Invalid email or password.");
      }
    }, 400);
  };

  // Password Register
  const handlePasswordRegister = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    if (registerForm.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const success = register(
        registerForm.name,
        registerForm.email,
        registerForm.password,
        registerForm.phone,
        selectedAvatar
      );
      if (success) {
        navigate(from, { replace: true });
      }
    }, 400);
  };

  // 1-Click Fast Demo Login
  const handleDemoLoginClick = () => {
    demoLogin();
    navigate(from, { replace: true });
  };

  // If user is already logged in and simply opens /login
  if (isAuthenticated && !redirectMessage) {
    return (
      <div className="min-h-[80vh] w-full max-w-full flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gray-800 text-center max-w-md w-full space-y-5 shadow-2xl">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-orange-500 bg-gray-950 mx-auto shadow-xl shadow-orange-500/20">
            <img
              src={user?.avatar || PRESET_AVATARS[0].url}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Already Signed In
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {user?.name}
            </h2>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              to="/profile"
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Upload Custom Photo (DP)</span>
            </Link>

            <Link
              to="/"
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Continue Shopping</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="w-full py-2 text-red-400 hover:text-red-300 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out / Switch Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] w-full max-w-full flex items-center justify-center px-3 sm:px-6 lg:px-8 py-6 sm:py-12 overflow-hidden">
      <div className="w-full max-w-md space-y-5">
        {/* Notice if redirected from checkout or buy now */}
        {redirectMessage && (
          <div className="p-4 rounded-2xl bg-orange-950/70 border border-orange-500/50 text-orange-200 text-xs sm:text-sm flex items-start gap-3 shadow-2xl animate-bounce-short">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-black text-white text-sm">Sign In Required to Buy</p>
              <p className="text-xs text-orange-300/90 mt-0.5 leading-relaxed">
                {redirectMessage}
              </p>
            </div>
          </div>
        )}

        {/* Auth Card Container */}
        <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-gray-800 shadow-2xl space-y-5 relative overflow-hidden">
          {/* Top Logo & Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 p-0.5 mx-auto shadow-lg shadow-orange-500/30">
              <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {authMethod === "otp"
                ? isLoginTab
                  ? "Sign In with OTP"
                  : "Create Account with OTP"
                : isLoginTab
                ? "Sign In with Password"
                : "Create Account"}
            </h2>
            <p className="text-xs text-gray-400">
              Instant access to checkout, orders, & wishlist
            </p>
          </div>

          {/* Quick Demo Login Option */}
          <button
            type="button"
            onClick={handleDemoLoginClick}
            className="w-full py-2.5 px-4 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
          >
            <Zap className="w-4 h-4 text-orange-400" />
            <span>⚡ 1-Click Instant Demo Login (Rohit)</span>
          </button>

          {/* Main Auth Method Toggle (OTP vs Password) */}
          <div className="flex bg-gray-900 rounded-xl p-1 border border-gray-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMethod("otp");
                setOtpStep("input");
                setErrorMsg("");
              }}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                authMethod === "otp"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod("password");
                setErrorMsg("");
              }}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                authMethod === "password"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>
          </div>

          {/* Subtabs: Sign In vs Register */}
          <div className="flex justify-center gap-6 text-xs font-bold border-b border-gray-800 pb-2">
            <button
              type="button"
              onClick={() => {
                setIsLoginTab(true);
                setOtpStep("input");
                setErrorMsg("");
              }}
              className={`pb-1 transition border-b-2 ${
                isLoginTab
                  ? "border-orange-500 text-orange-400 font-extrabold"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLoginTab(false);
                setOtpStep("input");
                setErrorMsg("");
              }}
              className={`pb-1 transition border-b-2 ${
                !isLoginTab
                  ? "border-orange-500 text-orange-400 font-extrabold"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              New Register
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* AUTH METHOD 1: REAL-WORLD OTP FLOW */}
          {authMethod === "otp" && (
            <>
              {otpStep === "input" ? (
                /* Step 1: Request OTP */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {/* Name & Photo input if Registering */}
                  {!isLoginTab && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                          Your Full Name <span className="text-orange-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aman Verma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      {/* Photo / DP Selector */}
                      <div className="p-3.5 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-3">
                        <div className="flex items-center gap-3.5">
                          {/* Current Selected Avatar / Upload Preview */}
                          <div
                            className="relative group shrink-0 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-orange-500 bg-gray-950 shadow-md">
                              <img
                                src={selectedAvatar}
                                alt="Selected DP"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-orange-600 text-white cursor-pointer shadow-sm">
                              <Camera className="w-3 h-3" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white">Your Profile Photo (DP)</p>
                            <p className="text-[10px] text-gray-400">Upload your own photo or pick an avatar</p>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="mt-1 px-2.5 py-1 bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/30 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Upload Photo from Device</span>
                            </button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoUpload}
                            />
                          </div>
                        </div>

                        {/* Avatars Preset Strip */}
                        <div className="pt-2 border-t border-gray-800/80">
                          <p className="text-[10px] font-bold text-gray-400 mb-1.5">Or Choose an Avatar Preset:</p>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {PRESET_AVATARS.map((av) => (
                              <button
                                key={av.id}
                                type="button"
                                onClick={() => setSelectedAvatar(av.url)}
                                className={`w-10 h-10 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                                  selectedAvatar === av.url
                                    ? "border-orange-500 ring-2 ring-orange-500/40 scale-105"
                                    : "border-gray-800 opacity-60 hover:opacity-100"
                                }`}
                              >
                                <img
                                  src={av.url}
                                  alt={av.name}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Number or Email input */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                      Mobile Number or Email <span className="text-orange-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="+91 98765 43210 or email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      We'll send a 4-digit verification code to this number.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? "Sending OTP..." : "Get Verification OTP"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Step 2: Verify 4-Digit OTP */
                <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-xs text-gray-300">
                      Enter the 4-digit code sent to{" "}
                      <span className="font-bold text-orange-400 font-mono">
                        {identifier}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setOtpStep("input")}
                      className="text-[11px] text-gray-400 hover:text-orange-400 underline"
                    >
                      Change number
                    </button>
                  </div>

                  {/* 4-Box OTP Input */}
                  <div className="flex justify-center items-center gap-2.5 sm:gap-3 my-4">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={otpInputRefs[idx]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black font-mono bg-gray-900 border-2 border-gray-700 focus:border-orange-500 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition"
                      />
                    ))}
                  </div>

                  {/* Resend Timer */}
                  <div className="text-center text-xs">
                    {countdown > 0 ? (
                      <p className="text-gray-400">
                        Resend OTP in{" "}
                        <span className="text-orange-400 font-bold font-mono">
                          {countdown}s
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-orange-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Resend OTP Code</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? "Verifying..." : "Verify & Continue"}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}
            </>
          )}

          {/* AUTH METHOD 2: PASSWORD LOGIN / REGISTER */}
          {authMethod === "password" && (
            <>
              {isLoginTab ? (
                /* Password Login */
                <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="demo@jgnstore.com"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="password123"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, password: e.target.value })
                        }
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? "Signing In..." : "Sign In & Continue"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Password Register */
                <form onSubmit={handlePasswordRegister} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={registerForm.name}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Photo selector for password register */}
                  <div className="p-3 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl overflow-hidden border border-orange-500/50 bg-gray-950 shrink-0 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <img
                        src={selectedAvatar}
                        alt="DP Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white">Profile Photo (DP)</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] text-orange-400 font-bold hover:underline cursor-pointer"
                      >
                        + Choose Photo File
                      </button>
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
                        placeholder="priya@example.com"
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={registerForm.phone}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                      Create Password (min. 6 chars)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-10 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    <span>{loading ? "Registering..." : "Create Account & Continue"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </>
          )}

          {/* Privacy Note */}
          <div className="pt-2 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>256-Bit SSL Encrypted Verification. Your details are 100% private.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
