import React from "react";
import { Box } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { sidebarListItems } from "../../constants/constants";

const AdminSidebar = ({ closeHandler = () => {} }) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const navigateHandler = (to) => {
    navigate(to);
    closeHandler();
  };

  return (
    <div className="h-full w-full overflow-y-auto border-r ">
      <div className="flex items-center justify-between px-2 py-4 md:hidden">
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
        <div
          key={item.name}
          onClick={() => navigateHandler(item.href)}
          className={`w-full ${
            pathname === item.href
              ? "text-[rgba(1,159,127,1)] font-bold"
              : "text-slate-700"
          }`}
        >
          <Box className="flex items-center gap-2 px-5 py-3 hover:bg-slate-100 cursor-pointer">
            <span>
              <item.icon />
            </span>
            <h2 className="flex-1">{item.name}</h2>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default AdminSidebar;
