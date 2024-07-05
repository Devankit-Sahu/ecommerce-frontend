import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({
  children,
  user,
  isAdmin = false,
  redirect = "/login",
}) => {
  if (!user) {
    return <Loader />;
  }
  if (!user) return <Navigate to={redirect} />;
  if (isAdmin && user.role !== "admin") return <Navigate to="/404" />;

  return children;
};

export default ProtectedRoute;
