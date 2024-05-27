import { useState } from "react";
import Search from "../search/Search";
import {
  Avatar,
  Badge,
  Box,
  Dialog,
  Tooltip,
  Stack,
  Drawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Search as SearchIcon,
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
  const [isSearch, setIsSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [logout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchOpenHandler = () => setIsSearch(true);
  const searchCloseHandler = () => setIsSearch(false);
  const openDrawerHandler = () => setIsDrawerOpen(true);
  const closeDrawerHandler = () => setIsDrawerOpen(false);

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
        <Box className="relative hidden sm:flex items-center gap-4 sm:gap-6">
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
            <Avatar src={user?.avatar?.url} />
          </Box>
          <ProfileMenu
            user={user}
            open={isOpen}
            handleClose={setIsOpen}
            logoutHandler={logoutHandler}
          />
        </Box>
        <Box
          onClick={openDrawerHandler}
          className="block sm:hidden cursor-pointer"
        >
          <MenuIcon />
        </Box>
      </Stack>

      {/* mobile search */}
      <Dialog
        className="block md:hidden"
        open={isSearch}
        onClose={searchCloseHandler}
      >
        <Search searchCloseHandler={searchCloseHandler} />
      </Dialog>
      {/* mobile nav */}
      <Drawer
        className="block sm:hidden"
        open={isDrawerOpen}
        onClose={closeDrawerHandler}
        PaperProps={{
          sx: {
            width: "100%",
          },
        }}
      >
        <MobileNav
          user={user}
          logoutHandler={logoutHandler}
          closeDrawerHandler={closeDrawerHandler}
          searchOpenHandler={searchOpenHandler}
        />
      </Drawer>
    </header>
  );
};

export default Header;
