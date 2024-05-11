import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
const AppLayout = lazy(() => import("./components/layout/AppLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductDetail = lazy(() => import("./components/product/ProductDetail"));
const CartPage = lazy(() => import("./pages/CartPage"));
const MyOrdersPage = lazy(() => import("./pages/MyOrdersPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./components/admin/AdminProducts"));
const AdminCreateProduct = lazy(() =>
  import("./components/admin/AdminCreateProduct")
);
const AdminEditProduct = lazy(() =>
  import("./components/admin/AdminEditProduct")
);
const AdminUsersList = lazy(() => import("./components/admin/AdminUsersList"));
const AdminOrders = lazy(() => import("./components/admin/AdminOrders"));
const AdminEditOrder = lazy(() => import("./components/admin/AdminEditOrder"));
const AdminCategories = lazy(() =>
  import("./components/admin/AdminCategories")
);
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Shipping = lazy(() => import("./components/payment/Shipping"));
const Payment = lazy(() => import("./components/payment/Payment"));
const Orderplaced = lazy(() => import("./components/payment/Orderplaced"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER } from "./config/config";
import toast from "react-hot-toast";
import { userExist, userNotExist } from "./redux/features/auth/authSlice";

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.get(`${SERVER}/api/v1/user/me`, {
        withCredentials: true,
      });
      dispatch(userExist(res.data.user));
    } catch (error) {
      dispatch(userNotExist());
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* normal routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/search/:key" element={<ShopPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  user={user}
                  isAuthenticated={user ? true : false}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  user={user}
                  isAuthenticated={user ? true : false}
                >
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute
                  user={user}
                  isAuthenticated={user ? true : false}
                >
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-order/:id"
              element={
                <ProtectedRoute
                  user={user}
                  isAuthenticated={user ? true : false}
                >
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute
                  user={user}
                  isAuthenticated={user ? true : false}
                >
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute
                  user={user}
                  isAuthenticated={user ? true : false}
                >
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-success"
              element={
                <ProtectedRoute
                  user={user}
                  isAuthenticated={user ? true : false}
                >
                  <Orderplaced />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                user={user}
                isAuthenticated={user ? true : false}
                isAdmin={true}
              >
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="product/create" element={<AdminCreateProduct />} />
            <Route
              path="product/edit/:productId"
              element={<AdminEditProduct />}
            />
            <Route path="users" element={<AdminUsersList />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="order/:orderId" element={<AdminEditOrder />} />
            <Route path="category" element={<AdminCategories />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster position="bottom-center" />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
