import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated user to login page, remembering where they intended to go
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please sign in or create an account to complete your purchase! 🔒",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
