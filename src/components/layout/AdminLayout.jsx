import React, { useState } from "react";
import { Box } from "@mui/material";
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
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
      <div
        className={`${
          open
            ? "fixed left-0 z-[999] w-full sm:w-[350px] top-0 bg-white h-full lg:hidden"
            : "hidden"
        }`}
      >
        <AdminSidebar closeHandler={closeDrawer} />
      </div>
    </Box>
  );
};

export default AdminLayout;
