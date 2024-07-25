import { useState } from "react";
import { Avatar, Backdrop, Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/features/auth/authSlice";
import { useLazyLogoutQuery } from "../../redux/api/user-api";

const AdminHeader = ({ openDrawer }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [logout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHandler = (to) => {
    setOpen(false);
    navigate(to);
  };

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <header className="h-16 px-10 flex items-center justify-between border-b-[1px] border-solid border-b-[#E2E7F1] bg-white">
      <Link to={"/admin/dashboard"}>
        <Stack direction={"row"} alignItems={"end"}>
          <img
            src="/logo.png"
            alt="brand-logo"
            className="w-[25px] sm:w-[50px]"
          />
          <p className="font-bold text-base sm:text-2xl">WonderMart</p>
        </Stack>
      </Link>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <span onClick={openDrawer} className="cursor-pointer lg:hidden">
          <MenuIcon />
        </span>
        <Box className="cursor-pointer relative" onClick={handleOpen}>
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
        </Box>
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "transparent",
          }}
          open={open}
          onClick={handleClose}
        >
          <div
            className={`absolute z-10 top-[60px] bg-slate-200 right-[50px]  transition-transform duration-300 ease-in-out transform ${
              open ? "scale-100" : "scale-0"
            } origin-top`}
          >
            <div
              style={{
                position: "absolute",
                top: "-9px",
                right: "0px",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid #e2e7f1",
              }}
            />
            <ul>
              <li
                className="px-5 py-2 flex items-center gap-3 hover:bg-gray-300 cursor-pointer border-b border-solid border-slate-400/55"
                onClick={() => navigateHandler("/admin/profile")}
              >
                <span>
                  <AccountCircleIcon fontSize="small" />
                </span>
                <span>Profile</span>
              </li>
              {user && (
                <li
                  className="px-5 py-2 flex items-center gap-3 hover:bg-gray-300 cursor-pointer border-b border-solid border-slate-400/55"
                  onClick={logoutHandler}
                >
                  <span>
                    <LogoutIcon fontSize="small" />
                  </span>
                  <span>Logout</span>
                </li>
              )}
              {!user && (
                <li
                  className="px-5 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer border-b border-solid border-slate-400/55"
                  onClick={() => navigateHandler("/login")}
                >
                  <span>
                    <LoginIcon fontSize="small" />
                  </span>
                  <span>Login</span>
                </li>
              )}
            </ul>
          </div>
        </Backdrop>
      </Stack>
    </header>
  );
};

export default AdminHeader;
