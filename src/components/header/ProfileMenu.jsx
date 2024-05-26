import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Category as CategoryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useLazyLogoutQuery } from "../../redux/api/user-api";

const ProfileMenu = ({ open, handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHandler = (to) => {
    handleClose(false);
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
    <div
      className={`absolute z-10 top-[55px] bg-white right-0 border border-solid border-gray-300 transition-transform duration-300 ease-in-out transform ${
        open ? "scale-100" : "scale-0"
      } origin-top`}
    >
      <ul>
        <li
          className="px-5 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer border-b border-solid border-gray-300"
          onClick={() => navigateHandler("/profile")}
        >
          <span>
            <AccountCircleIcon fontSize="small" />
          </span>
          <span>Profile</span>
        </li>
        <li
          className="px-5 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer border-b border-solid border-gray-300"
          onClick={() => navigateHandler("/cart")}
        >
          <span>
            <ShoppingCartIcon fontSize="small" />
          </span>
          <span>Cart</span>
        </li>
        <li
          className="px-5 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer border-b border-solid border-gray-300"
          onClick={() => navigateHandler("/my-orders")}
        >
          <span>
            <CategoryIcon fontSize="small" />
          </span>
          <span>Orders</span>
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
  );
};

export default ProfileMenu;
