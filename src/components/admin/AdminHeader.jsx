import React, { useState } from "react";
import {
  Avatar,
  Box,
  Stack,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import axios from "axios";
import { SERVER } from "../../config/config";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/features/auth/authSlice";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const logoutHandler = async () => {
    try {
      if (user) {
        const res = await axios.get(`${SERVER}/api/v1/user/logout`, {
          withCredentials: true,
        });
        toast.success(res?.data?.message);
        dispatch(userNotExist());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      handleClose();
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
        className="cursor-pointer"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigateHandler("/myorders")}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <Divider />
        {user && (
          <MenuItem onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        )}
        {!user && (
          <MenuItem onClick={() => navigateHandler("/login")}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </header>
  );
};

export default AdminHeader;
