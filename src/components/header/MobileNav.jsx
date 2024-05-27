import { useNavigate } from "react-router-dom";
import {
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Category as CategoryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const MobileNav = ({
  user,
  logoutHandler,
  closeDrawerHandler,
  searchOpenHandler,
}) => {
  const navigate = useNavigate();
  const navigateHandler = (to) => {
    navigate(to);
    closeDrawerHandler();
  };
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div
          className="text-xl cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/shop")}
        >
          <span>
            <StoreIcon fontSize="small" />
          </span>
          <span>Shop</span>
        </div>
        <div
          className="text-xl cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/cart")}
        >
          <span>
            <ShoppingCartIcon fontSize="small" />
          </span>
          <span>Cart</span>
        </div>
        <div
          className="text-xl cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/my-orders")}
        >
          <span>
            <CategoryIcon fontSize="small" />
          </span>
          <span>Orders</span>
        </div>
        <div
          className="text-xl cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/profile")}
        >
          <span>
            <AccountCircleIcon fontSize="small" />
          </span>
          <span>Profile</span>
        </div>
        {!user && (
          <div
            className="text-xl cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
            onClick={() => navigateHandler("/login")}
          >
            <span>
              <LoginIcon fontSize="small" />
            </span>
            <span>Login</span>
          </div>
        )}
        {user && (
          <div
            className="text-xl cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
            onClick={logoutHandler}
          >
            <span>
              <LogoutIcon fontSize="small" />
            </span>
            <span>Logout</span>
          </div>
        )}
        <div
          className="text-xl cursor-pointer hover:bg-slate-300 w-full uppercase flex items-center justify-center gap-2"
          onClick={() => {
            searchOpenHandler();
            closeDrawerHandler();
          }}
        >
          <SearchIcon />
          <span>search</span>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
