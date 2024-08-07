import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Category as CategoryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ open, user, logoutHandler, closeMenu }) => {
  const navigate = useNavigate();
  const navigateHandler = (to) => {
    navigate(to);
    closeMenu();
  };

  return (
    <div
      className={`absolute z-10 top-[70px] bg-slate-200 right-[50px]  transition-transform duration-300 ease-in-out transform ${
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
          className="px-5 py-2 flex items-center gap-3 hover:text-white hover:bg-gray-400 cursor-pointer border-b border-solid border-gray-300"
          onClick={() =>
            navigateHandler(
              user && user.role !== "admin" ? "/profile" : "/admin/profile"
            )
          }
        >
          <span>
            <AccountCircleIcon fontSize="small" />
          </span>
          <span>Profile</span>
        </li>
        {user && user.role !== "admin" && (
          <li
            className="px-5 py-2 flex items-center gap-3 hover:text-white hover:bg-gray-400 cursor-pointer border-b border-solid border-gray-300"
            onClick={() => navigateHandler("/cart")}
          >
            <span>
              <ShoppingCartIcon fontSize="small" />
            </span>
            <span>Cart</span>
          </li>
        )}
        {user && user.role !== "admin" && (
          <li
            className="px-5 py-2 flex items-center gap-3 hover:text-white hover:bg-gray-400 cursor-pointer border-b border-solid border-gray-300"
            onClick={() => navigateHandler("/my-orders")}
          >
            <span>
              <CategoryIcon fontSize="small" />
            </span>
            <span>Orders</span>
          </li>
        )}
        {user && (
          <li
            className="px-5 py-2 flex items-center gap-3 hover:text-white hover:bg-gray-400 cursor-pointer border-b border-solid border-gray-300"
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
            className="px-5 py-2 flex items-center gap-3 hover:text-white hover:bg-gray-400 cursor-pointer border-b border-solid border-gray-300"
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
  );
};

export default ProfileMenu;
