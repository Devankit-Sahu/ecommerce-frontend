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
const AdminOrderDetails = lazy(() =>
  import("./components/admin/AdminOrderDetails")
);
const AdminCategories = lazy(() =>
  import("./components/admin/AdminCategories")
);
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Payment = lazy(() => import("./components/payment/Payment"));
const Orderplaced = lazy(() => import("./components/payment/Orderplaced"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER } from "./config/config";
import { userExist, userNotExist } from "./redux/features/auth/authSlice";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.get(`${SERVER}/api/v1/user/me`, {
        withCredentials: true,
      });
      dispatch(userExist(res.data.user));
    } catch (error) {
      dispatch(userNotExist());
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  return (
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
                <ProtectedRoute user={user}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user}>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute user={user}>
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-order/:id"
              element={
                <ProtectedRoute user={user}>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute user={user}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-success"
              element={
                <ProtectedRoute user={user}>
                  <Orderplaced />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="products"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="product/create"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminCreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="product/edit/:productId"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminEditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminUsersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="order/:orderId"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminOrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="category"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <AdminCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute user={user} isAdmin={true}>
                  <Profile />
                </ProtectedRoute>
              }
            />
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
