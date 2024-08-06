import { useEffect, useState } from "react";
import Search from "../search/Search";
import { Avatar, Badge, Box, Tooltip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import MobileNav from "./MobileNav";
import { useLazyLogoutQuery } from "../../redux/api/user-api";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/features/auth/authSlice";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openDrawerHandler = () => setIsDrawerOpen(true);
  const closeDrawerHandler = () => setIsDrawerOpen(false);
  const openMenuHandler = () => setIsMenuOpen(true);
  const closeMenuHandler = () => setIsMenuOpen(false);

  const logoutHandler = () => {
    if (user) {
      logout()
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          dispatch(userNotExist());
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    }
  };

  const onScroll = () => {
    if (window.scrollY > 50) {
      document.querySelector("header").classList.add("sticky-header");
    } else {
      document.querySelector("header").classList.remove("sticky-header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="border-[1px] border-solid border-[rgb(239,239,239)] py-3 w-full bg-white">
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
        <Box className="relative flex items-center gap-6">
          <Link className="hidden md:block" to={"/shop"}>
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
          <Box
            className="hidden md:block cursor-pointer"
            onClick={openMenuHandler}
          >
            <Avatar src={user?.avatar?.url} />
          </Box>
          <Box
            onClick={openDrawerHandler}
            className="block md:hidden cursor-pointer"
          >
            <MenuIcon />
          </Box>
        </Box>
      </Stack>
      {/* profile menu */}
      <div
        className={`${
          isMenuOpen ? "fixed top-0 left-0 right-0 bottom-0 z-[999]" : "hidden"
        }`}
        onClick={closeMenuHandler}
      >
        <ProfileMenu
          user={user}
          open={isMenuOpen}
          logoutHandler={logoutHandler}
          closeMenu={closeMenuHandler}
        />
      </div>
      {/* mobile nav */}
      <div
        className={`${
          isDrawerOpen
            ? "fixed left-0 z-[999] right-0 bottom-0 top-0 bg-white md:hidden"
            : "hidden"
        }`}
      >
        <MobileNav
          user={user}
          logoutHandler={logoutHandler}
          closeDrawerHandler={closeDrawerHandler}
        />
      </div>
    </header>
  );
};

export default Header;
