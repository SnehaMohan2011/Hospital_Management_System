import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
