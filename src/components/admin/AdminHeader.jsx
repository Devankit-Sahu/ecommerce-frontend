import React from "react";
import { Avatar, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
// import Search from "../search/Search";

const AdminHeader = () => {
  return (
    <header className="h-16 px-10 flex items-center justify-between border-b-[1px] border-solid border-b-[#E2E7F1] bg-white">
      <Link to={"/"}>
        <Stack direction={"row"} alignItems={"end"}>
          <img src="/logo.png" alt="brand-logo" className="w-[50px]" />
          <p className="font-bold text-2xl">
            <span className="text-[rgba(1,159,127,1)]">E</span>-Shop
          </p>
        </Stack>
      </Link>
      {/* <Search /> */}
      <div className="flex items-center gap-5">
        <Avatar className="cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminHeader;
