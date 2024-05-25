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
  const [isOpen, setIsOpen] = useState(false);

  const searchOpenHandler = () => {
    setIsSearch(true);
  };
  const searchCloseHandler = () => {
    setIsSearch(false);
  };

  return (
    <header className="border-[1px] border-solid border-[rgb(239,239,239)] py-3 w-full">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="px-5 md:px-10"
      >
        <Link to={"/"}>
          <Stack direction={"row"} alignItems={"end"}>
            <img
              src="/logo.png"
              alt="brand-logo"
              className="w-[25px] sm:w-[50px]"
            />
            <p className="font-bold text-base sm:text-2xl">WonderMart</p>
          </Stack>
        </Link>
        <Box className="hidden md:block">
          <Search />
        </Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          className="gap-4 sm:gap-6"
          position={"relative"}
        >
          <Link to={"/shop"}>
            <Tooltip title="Store" placement="bottom">
              <StoreIcon />
            </Tooltip>
          </Link>
          <Link className="hidden md:block" to={"/cart"}>
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
            className="flex md:hidden border-[1px] border-solid border-[rgb(216,215,215)] rounded-full items-center justify-center p-1"
          >
            <SearchIcon />
          </button>
          <Box
            className="cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Avatar />
          </Box>
          <ProfileMenu open={isOpen} handleClose={setIsOpen} />
        </Stack>
      </Stack>

      {/* for mobile screen */}
      <Dialog
        className="block md:hidden"
        open={isSearch}
        onClose={searchCloseHandler}
      >
        <Search />
      </Dialog>
    </header>
  );
};

export default Header;
