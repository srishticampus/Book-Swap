// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/admin_login" replace />;
  }

  return children;
};

export default ProtectedRoute;
