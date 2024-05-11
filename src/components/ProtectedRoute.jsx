import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  user,
  isAuthenticated,
  isAdmin = false,
  redirect = "/login",
}) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  else if (isAdmin && user.role !== "admin") return <Navigate to="/404" />;

  return children;
};

export default ProtectedRoute;
