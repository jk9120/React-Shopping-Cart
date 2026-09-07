import React, { createContext, useContext, useState, useEffect } from "react";
import { toast, Bounce } from "react-toastify";

const AuthContext = createContext();

// Default preset avatars
export const PRESET_AVATARS = [
  {
    id: "avatar_1",
    name: "Tech Nomad",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "avatar_2",
    name: "Cyber Creator",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "avatar_3",
    name: "Pixel Master",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "avatar_4",
    name: "Neon Developer",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "avatar_5",
    name: "Minimalist Pro",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "avatar_6",
    name: "Future Vision",
    url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
  },
];

export const AuthProvider = ({ children }) => {
  // Registered users list in localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("jgn_registered_users");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              name: "Rohit Malhotra",
              email: "demo@jgnstore.com",
              phone: "+91 98765 43210",
              password: "password123",
              avatar: PRESET_AVATARS[1].url,
              address: "Flat 1202, Cyber Heights, Sector 62, Gurugram, Haryana",
              joinedDate: "Jan 2026",
            },
          ];
    } catch {
      return [];
    }
  });

  // Currently logged in user
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("jgn_current_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Active OTP session state
  const [activeOtpSession, setActiveOtpSession] = useState(null);

  useEffect(() => {
    localStorage.setItem("jgn_registered_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("jgn_current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jgn_current_user");
    }
  }, [user]);

  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Generate and Send Simulated Real-World OTP
  const sendOtp = (identifier, isRegister = false, name = "") => {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId) {
      showToast("Please enter a valid mobile number or email!", "error");
      return { success: false };
    }

    // Generate random 4-digit OTP
    const generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

    const session = {
      identifier: cleanId,
      otp: generatedOtp,
      expiresAt,
      isRegister,
      name: name.trim(),
    };

    setActiveOtpSession(session);

    // Show simulated SMS / Push Notification Toast with OTP
    setTimeout(() => {
      toast.info(
        `📩 SMS [JGN-STORE]: Your verification OTP is ${generatedOtp}. Do not share with anyone. (Valid for 5 mins)`,
        {
          position: "top-center",
          autoClose: 10000,
          theme: "dark",
          transition: Bounce,
          icon: "📱",
        }
      );
    }, 400);

    return { success: true, otp: generatedOtp };
  };

  // Verify OTP and complete Login / Registration
  const verifyOtp = (identifier, enteredOtp, additionalData = {}) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanOtp = enteredOtp.trim();

    if (!activeOtpSession || activeOtpSession.identifier !== cleanId) {
      showToast("No active OTP request found! Please request a new OTP.", "error");
      return false;
    }

    if (Date.now() > activeOtpSession.expiresAt) {
      showToast("OTP has expired! Please request a new OTP.", "error");
      return false;
    }

    if (activeOtpSession.otp !== cleanOtp) {
      showToast("Incorrect OTP! Please check the code received in SMS.", "error");
      return false;
    }

    // Check if user exists in database
    let existingUser = users.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        (u.phone && u.phone.replace(/\D/g, "").slice(-10) === cleanId.replace(/\D/g, "").slice(-10))
    );

    if (existingUser) {
      // If user passed a new name or avatar during verification, update it
      const updatedUser = {
        ...existingUser,
        name: additionalData.name?.trim() || activeOtpSession.name || existingUser.name,
        avatar: additionalData.avatar || existingUser.avatar,
      };

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setUser(updatedUser);
      setActiveOtpSession(null);
      showToast(`Welcome back, ${updatedUser.name}! 👋`);
      return true;
    } else {
      // New user registration via OTP
      const isEmail = cleanId.includes("@");
      const chosenName =
        additionalData.name?.trim() ||
        activeOtpSession.name?.trim() ||
        (isEmail ? cleanId.split("@")[0] : `User ${cleanId.slice(-4)}`);

      const newUser = {
        id: Date.now(),
        name: chosenName,
        email: isEmail ? cleanId : additionalData.email?.trim().toLowerCase() || `${cleanId.replace(/\D/g, "")}@jgnstore.com`,
        phone: isEmail ? additionalData.phone || "+91 98765 43210" : cleanId,
        password: "otp_auth_account",
        avatar: additionalData.avatar || PRESET_AVATARS[0].url,
        address: additionalData.address || "Sector 62, Cyber Heights, Gurugram",
        joinedDate: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      };

      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      setActiveOtpSession(null);
      showToast(`Welcome to @JGN STORE, ${newUser.name}! 🎉`);
      return true;
    }
  };

  // Register New User (Password based)
  const register = (name, email, password, phone = "", avatar = "") => {
    const cleanEmail = email.trim().toLowerCase();

    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast("An account with this email already exists! Please Sign In.", "error");
      return false;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password,
      phone: phone.trim() || "+91 98765 43210",
      avatar: avatar || PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)].url,
      address: "Cyber Hub, Sector 62, Gurugram, Haryana",
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    showToast(`Welcome to @JGN STORE, ${newUser.name}! 🎉`);
    return true;
  };

  // Login Existing User (Password based)
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      showToast(`Welcome back, ${foundUser.name}! 👋`);
      return true;
    } else {
      showToast("Invalid email or password! Please check credentials.", "error");
      return false;
    }
  };

  // Update User Profile details & Photo / DP
  const updateProfile = (updatedFields) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedFields,
    };

    setUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? updatedUser : u))
    );
    showToast("Profile & DP updated successfully! ✨");
  };

  // Update Avatar specifically
  const updateAvatar = (avatarUrlOrBase64) => {
    updateProfile({ avatar: avatarUrlOrBase64 });
  };

  // 1-Click Demo Login
  const demoLogin = () => {
    const demoUser = users.find((u) => u.email === "demo@jgnstore.com") || {
      id: 1,
      name: "Rohit Malhotra",
      email: "demo@jgnstore.com",
      phone: "+91 98765 43210",
      password: "password123",
      avatar: PRESET_AVATARS[1].url,
      address: "Flat 1202, Cyber Heights, Sector 62, Gurugram",
      joinedDate: "Jan 2026",
    };
    setUser(demoUser);
    showToast(`Logged in as Demo User (${demoUser.name}) 🚀`);
    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setActiveOtpSession(null);
    showToast("Signed out successfully. See you soon!", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        sendOtp,
        verifyOtp,
        login,
        register,
        updateProfile,
        updateAvatar,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
