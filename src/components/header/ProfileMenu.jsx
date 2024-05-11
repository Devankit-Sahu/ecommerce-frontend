import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Category as CategoryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../config/config";
import { userNotExist } from "../../redux/features/auth/authSlice";

import toast from "react-hot-toast";

const ProfileMenu = ({ anchorEl, open, handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      handleClose();
    }
  };

  return (
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem onClick={() => navigateHandler("/profile")}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigateHandler("/cart")}>
        <ListItemIcon>
          <ShoppingCartIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cart</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigateHandler("/my-orders")}>
        <ListItemIcon>
          <CategoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Orders</ListItemText>
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
  );
};

export default ProfileMenu;
