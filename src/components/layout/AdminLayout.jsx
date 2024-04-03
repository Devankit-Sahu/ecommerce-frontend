import React, { useState } from "react";
import { Box, Drawer, Tooltip } from "@mui/material";
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box height={"100vh"} width={"100%"}>
      <AdminHeader />
      <section className="flex w-full h-[calc(100%-64px)] relative">
        <aside className="h-full overflow-y-auto w-60 hidden lg:block">
          <AdminSidebar />
        </aside>
        <button
          onClick={toggleDrawer(true)}
          className="absolute top-1/2 bg-white px-1 py-2 cursor-pointer lg:hidden"
        >
          <Tooltip title="toggle sidebar">
            <ChevronRightIcon fontSize="medium" />
          </Tooltip>
        </button>
        <Box
          width={"100%"}
          height={"100%"}
          className="overflow-y-auto scroll-smooth bg-slate-100 p-8"
        >
          <Outlet />
        </Box>
      </section>
      {/* for mobile screen */}
      <Drawer
        className="block lg:hidden"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <aside className="h-full overflow-y-auto w-64">
          <AdminSidebar />
        </aside>
      </Drawer>
    </Box>
  );
};

export default AdminLayout;
