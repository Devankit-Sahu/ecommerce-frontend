import { useState } from "react";
import { Avatar, Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/features/auth/authSlice";
import { useLazyLogoutQuery } from "../../redux/api/user-api";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHandler = (to) => {
    setIsOpen(false);
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

  return (
    <header className="h-16 px-10 flex items-center justify-between border-b-[1px] border-solid border-b-[#E2E7F1] bg-white">
      <Link to={"/"}>
        <Stack direction={"row"} alignItems={"end"}>
          <img src="/logo.png" alt="brand-logo" className="w-[50px]" />
          <p className="font-bold text-2xl">WonderMart</p>
        </Stack>
      </Link>
      <Box
        className="cursor-pointer relative"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Avatar />
      </Box>
      <div
        className={`absolute z-10 top-[55px] bg-white right-10 border border-solid border-gray-300 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "scale-100" : "scale-0"
        } origin-top`}
      >
        <ul>
          <li
            className="px-5 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer border-b border-solid border-gray-300"
            onClick={() => navigateHandler("/admin/profile")}
          >
            <span>
              <AccountCircleIcon fontSize="small" />
            </span>
            <span>Profile</span>
          </li>
          {user && (
            <li
              className="px-5 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer border-b border-solid border-gray-300"
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
              className="px-5 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer border-b border-solid border-gray-300"
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
    </header>
  );
};

export default AdminHeader;
