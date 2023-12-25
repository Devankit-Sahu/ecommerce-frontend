import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/features/auth/authAction";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import {
  AdminAddProduct,
  AdminAllCategories,
  AdminDashboard,
  AdminProductsList,
  AdminUpdateProduct,
  AdminUserDetails,
  AdminUsersList,
  DashboardLayout,
  PageNotFound,
  ProductDetail,
} from "./components";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import { allCategoriesAction } from "./redux/features/admin/categoryActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <Shop />,
      },
      {
        path: "/products/:category",
        element: <Shop />,
      },
      {
        path: "/products/:key",
        element: <Shop />,
      },
      {
        path: "/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/update",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <AdminProductsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/add",
        element: (
          <ProtectedRoute>
            <AdminAddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/edit/:id",
        element: (
          <ProtectedRoute>
            <AdminUpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/all",
        element: (
          <ProtectedRoute>
            <AdminAllCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/all",
        element: (
          <ProtectedRoute>
            <AdminUsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/edit/:id",
        element: (
          <ProtectedRoute>
            <AdminUserDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
    dispatch(allCategoriesAction());
  }, [dispatch, isAuthenticated]);
  return <RouterProvider router={router} />;
};

export default App;
