import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
const AppLayout = lazy(() => import("./components/layout/AppLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductDetail = lazy(() => import("./components/product/ProductDetail"));
const CartPage = lazy(() => import("./pages/CartPage"));
const MyOrders = lazy(() => import("./components/MyOrders"));
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

const App = () => {
  const user = { name: "rahul", role: "admin" };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* normal routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/:key" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/myorders"
              element={
                <ProtectedRoute user={user} role={"user"}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} role={"admin"}>
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

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
