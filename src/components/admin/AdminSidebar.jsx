import React from "react";
import { Box } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { sidebarListItems } from "../../constants/constants";

const AdminSidebar = ({ closeHandler }) => {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex items-center justify-between px-2 py-4 lg:hidden">
        <div className="flex items-end">
          <img src="/logo.png" alt="brand-logo" className="w-[30px]" />
          <p className="font-bold">WonderMart</p>
        </div>
        <span
          className="bg-gray-300 rounded-full p-1 flex items-center justify-center"
          onClick={closeHandler}
        >
          <CloseIcon style={{ fontSize: "20px" }} />
        </span>
      </div>
      {sidebarListItems?.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            isActive ? "text-[rgba(1,159,127,1)] font-bold" : "text-slate-700"
          }
        >
          <Box className="flex items-center gap-2 px-5 py-3 hover:bg-slate-100">
            <span>
              <item.icon />
            </span>
            <h2 className="flex-1">{item.name}</h2>
          </Box>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSidebar;
