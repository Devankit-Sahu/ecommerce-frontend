import React, { useState } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const isSmallScreen = useMediaQuery("(max-width: 425px)");
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box height={"100vh"} width={"100%"}>
      <AdminHeader openDrawer={openDrawer} />
      <section className="flex w-full h-[calc(100%-64px)]">
        <aside className="h-full overflow-y-auto w-60 hidden lg:block">
          <AdminSidebar />
        </aside>
        <Box
          width={"100%"}
          height={"100%"}
          className="overflow-y-auto scroll-smooth bg-slate-100 sm:p-8"
        >
          <Outlet />
        </Box>
      </section>
      {/* for mobile screen */}
      <Drawer
        className="block lg:hidden"
        open={open}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: isSmallScreen ? "100%" : "350px",
          },
        }}
      >
        <AdminSidebar closeHandler={closeDrawer} />
      </Drawer>
    </Box>
  );
};

export default AdminLayout;
