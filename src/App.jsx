import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AdminDashboard, DashboardLayout, ProductDetail } from "./components";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* normal user routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Shop />} />
          <Route path="products/product-detail" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        {/* admin routes */}
        <Route path="admin/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        {/* auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
