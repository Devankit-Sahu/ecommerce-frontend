import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  const user = JSON.parse(localStorage.getItem("user"));
  if (isAuthenticated && user?.role === "admin") {
    return  children ;
  } else if (isAuthenticated && user?.role === "admin") {
    return children ;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
