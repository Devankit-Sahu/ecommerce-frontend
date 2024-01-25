import React from "react";
import { Avatar } from "@mui/material";
import { DarkModeOutlined } from "@mui/icons-material";

const AdminHeader = () => {
  return (
    <div className="h-16 flex items-center justify-end pr-10 border-b-[1px] border-solid border-b-[#E2E7F1] bg-white">
      <div className="flex items-center gap-5">
        <DarkModeOutlined className="cursor-pointer" />
        <Avatar className="cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminHeader;
