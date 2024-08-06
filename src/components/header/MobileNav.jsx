import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../search/Search";
import {
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Category as CategoryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Dialog } from "@mui/material";

const MobileNav = ({ user, logoutHandler, closeDrawerHandler }) => {
  const [isSearch, setIsSearch] = useState(false);
  const searchOpenHandler = () => setIsSearch(true);
  const searchCloseHandler = () => setIsSearch(false);
  const navigate = useNavigate();
  const navigateHandler = (to) => {
    navigate(to);
    closeDrawerHandler();
  };

  return (
    <div className="h-screen relative">
      <div
        onClick={closeDrawerHandler}
        className="absolute right-4 top-3 rounded"
      >
        <CloseIcon />
      </div>
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div
          className="cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/shop")}
        >
          <span>
            <StoreIcon />
          </span>
          <span className="text-base font-semibold">Shop</span>
        </div>
        <div
          className="cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/cart")}
        >
          <span>
            <ShoppingCartIcon />
          </span>
          <span className="text-base font-semibold">Cart</span>
        </div>
        <div
          className="cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/my-orders")}
        >
          <span>
            <CategoryIcon fontSize="small" />
          </span>
          <span className="text-base font-semibold">Orders</span>
        </div>
        <div
          className="cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
          onClick={() => navigateHandler("/profile")}
        >
          <span>
            <AccountCircleIcon fontSize="small" />
          </span>
          <span className="text-base font-semibold">Profile</span>
        </div>
        {!user && (
          <div
            className="cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
            onClick={() => navigateHandler("/login")}
          >
            <span>
              <LoginIcon fontSize="small" />
            </span>
            <span className="text-base font-semibold">Login</span>
          </div>
        )}
        {user && (
          <div
            className="cursor-pointer hover:bg-slate-300 w-full  py-2 uppercase flex items-center justify-center gap-2"
            onClick={logoutHandler}
          >
            <span>
              <LogoutIcon fontSize="small" />
            </span>
            <span className="text-base font-semibold">Logout</span>
          </div>
        )}
        <div
          className="cursor-pointer hover:bg-slate-300 w-full uppercase flex items-center justify-center gap-2"
          onClick={() => {
            searchOpenHandler();
            closeDrawerHandler();
          }}
        >
          <SearchIcon />
          <span className="text-base font-semibold">search</span>
        </div>
      </div>
      {/* mobile search */}
      <Dialog
        className="block md:hidden"
        open={isSearch}
        onClose={searchCloseHandler}
      >
        <Search searchCloseHandler={searchCloseHandler} />
      </Dialog>
    </div>
  );
};

export default MobileNav;
