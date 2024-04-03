import React, { useState } from "react";
import { Avatar, Badge, Box, Dialog, Menu, Stack } from "@mui/material";
import Search from "../search/Search";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const searchOpenHandler = () => {
    setIsSearch(true);
  };
  const searchCloseHandler = () => {
    setIsSearch(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateHandler = (to) => {
    handleClose();
    navigate(to);
  };
  return (
    <header className="border-[1px] border-solid border-[rgb(239,239,239)] py-3 w-full">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={5}
      >
        <Link to={"/"}>
          <Stack direction={"row"} alignItems={"end"}>
            <img src="/logo.png" alt="brand-logo" className="w-[50px]" />
            <p className="font-bold text-2xl">
              <span className="text-[rgba(1,159,127,1)]">E</span>-Shop
            </p>
          </Stack>
        </Link>
        <Box className="hidden sm:block">
          <Search />
        </Box>
        <Stack direction={"row"} gap={5} alignItems={"center"}>
          <Link to={"/cart"}>
            <Badge badgeContent={2}>
              <ShoppingCartIcon />
            </Badge>
          </Link>
          <button
            onClick={searchOpenHandler}
            className="flex sm:hidden border-[1px] border-solid border-[rgb(216,215,215)] rounded-full items-center justify-center p-1"
          >
            <SearchIcon />
          </button>
          <Box className="cursor-pointer" onClick={handleClick}>
            <Avatar />
          </Box>
        </Stack>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <ul>
          <li
            onClick={() => navigateHandler("/myorders")}
            className="p-2 flex items-center gap-2 text-zinc-700 hover:bg-slate-100 cursor-pointer"
          >
            <AccountCircleIcon /> <h3>Profile</h3>
          </li>
          <li
            onClick={() => navigateHandler("/myorders")}
            className="p-2 flex items-center gap-2 text-zinc-700 hover:bg-slate-100 cursor-pointer"
          >
            <CategoryIcon />
            <h3> my orders</h3>
          </li>
        </ul>
      </Menu>
      {/* for mobile screen */}
      <Dialog
        className="block sm:hidden"
        open={isSearch}
        onClose={searchCloseHandler}
      >
        <Search />
      </Dialog>
    </header>
  );
};

export default Header;
