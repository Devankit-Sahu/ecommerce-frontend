import { useState } from "react";
import { Avatar, Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu as MenuIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/features/auth/authSlice";
import { useLazyLogoutQuery } from "../../redux/api/user-api";
import ProfileMenu from "../header/ProfileMenu";

const AdminHeader = ({ openDrawer }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [logout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Box className="cursor-pointer relative" onClick={handleOpen}>
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
        </Box>
        <span onClick={openDrawer} className="cursor-pointer md:hidden">
          <MenuIcon />
        </span>
      </Stack>
      <div
        className={`${
          open ? "fixed top-0 left-0 right-0 bottom-0 z-[999]" : "hidden"
        }`}
        onClick={handleClose}
      >
        <ProfileMenu
          open={open}
          user={user}
          logoutHandler={logoutHandler}
          closeMenu={handleClose}
        />
      </div>
    </header>
  );
};

export default AdminHeader;
