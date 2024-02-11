import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {
  AdminAllCategories,
  AdminDashboard,
  AdminProductsList,
  AdminUsersList,
  DashboardLayout,
  PageNotFound,
  ProductDetail,
} from "./components";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* normal user routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Shop />} />
          <Route path="products/:key" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        {/* admin routes */}
        <Route path="admin/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsList />} />
          <Route path="category" element={<AdminAllCategories />} />
          <Route path="users" element={<AdminUsersList />} />
        </Route>
        {/* auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
