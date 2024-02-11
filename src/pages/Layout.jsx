import React, { useEffect } from "react";
import { Header, Footer } from "../components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/api/auth-api";

const Layout = ({}) => {
  // const dispatch = useDispatch();
  // const isAuth = JSON.parse(localStorage.getItem("isAuth")) || false;
  // useEffect(() => {
  //   if (isAuth) {
  //     dispatch(loadUser());
  //   }
  // }, [isAuth,dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
