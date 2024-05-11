import React, { useState } from "react";
import Search from "../search/Search";
import { Avatar, Badge, Box, Dialog, Tooltip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Search as SearchIcon,
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: 1,
    padding: "0 4px",
    backgroundColor: "rgba(1,159,127,1)",
    color: "white",
  },
}));

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [isSearch, setIsSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
            <p className="font-bold text-xl sm:text-2xl">
              <span className="text-[rgba(1,159,127,1)]">E</span>-Shop
            </p>
          </Stack>
        </Link>
        <Box className="hidden sm:block">
          <Search />
        </Box>
        <Stack direction={"row"} gap={3} alignItems={"center"}>
          <Link to={"/shop"}>
          <Tooltip title="Store" placement="bottom">
            <StoreIcon />
          </Tooltip>
          </Link>
          <Link className="hidden sm:block" to={"/cart"}>
            <Tooltip title="Cart" placement="bottom">
              <StyledBadge
                badgeContent={user && cartItems ? cartItems.length : 0}
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </Tooltip>
          </Link>
          <button
            onClick={searchOpenHandler}
            className="flex sm:hidden border-[1px] border-solid border-[rgb(216,215,215)] rounded-full items-center justify-center p-1"
          >
            <SearchIcon />
          </button>
          <Box
            className="cursor-pointer"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar />
          </Box>
          <ProfileMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
          />
        </Stack>
      </Stack>

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
