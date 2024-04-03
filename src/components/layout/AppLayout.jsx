import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Box } from "@mui/material";

const AppLayout = () => {
  return (
    <Box height={"100vh"} width={"100%"}>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </Box>
  );
};

export default AppLayout;
