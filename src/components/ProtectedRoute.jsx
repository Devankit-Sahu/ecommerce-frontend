import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  user,
  role = "user",
  redirect = "/login",
}) => {
  const location = useLocation();

  if (!user) return <Navigate to={redirect} />;
  
  else if (role === "admin" && user.role !== "admin")
    return <Navigate to={location.pathname.split("/")[1]} />;

  return children;
};

export default ProtectedRoute;
