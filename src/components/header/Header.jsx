import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MyButton } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import brandLogoImg from "../../assets/brand-logo1.png";
import toast from "react-hot-toast";
import { logoutUser } from "../../redux/features/auth/authAction";
import { isLoggedOut } from "../../redux/features/auth/authSlice.js";
import Search from "../search/Search.jsx";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/products" },
];

const Header = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlelogout() {
    if (isAuthenticated) {
      dispatch(logoutUser());
      dispatch(isLoggedOut());
      localStorage.removeItem("user");
      toast.success("Logout successfully !!!!");
      navigate("/login");
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      navigate(`/products/${key}`);
      setKey("");
    }
  };

  return (
    <>
      <div className=" h-20 px-10">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center justify-center">
            <Link to={"/"}>
              <img src={brandLogoImg} className="w-10" alt="brand-logo" />
            </Link>
          </div>
          <Search />
          <div className="flex items-center gap-4">
            <div className="w-full h-full relative">
              <Link to={"/cart"}>
                <Typography title="cart">
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: "2rem" }}
                    className=" text-black"
                  />
                  {cartItems.length !== 0 && (
                    <Badge
                      badgeContent={cartItems.length}
                      color="primary"
                      className="absolute top-[-13px] left-[-4px]"
                    ></Badge>
                  )}
                </Typography>
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link to={"/profile"}>
                <Avatar
                  src={user ? user.avatar.url : "./profile.png"}
                  sx={{ width: 56, height: 56, objectFit: "cover" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 flex items-center justify-between px-12 py-3">
        <div className="flex justify-center">
          {navigation.map((item) => (
            <div key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) => {
                  return (
                    "mx-2 text-[18px] font-medium relative " +
                    (isActive ? "text-[#3c76b0]" : "text-black")
                  );
                }}
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="flex gap-8">
          {!isAuthenticated && (
            <div onClick={() => navigate("/login")}>
              <MyButton
                type="submit"
                content="Login"
                className="px-3 py-2 rounded-md border border-blue-400 active:scale-[.9]"
              />
            </div>
          )}

          {!isAuthenticated && (
            <div onClick={() => navigate("/register")}>
              <MyButton
                type="submit"
                content="Sign Up"
                className="px-3 py-2 rounded-md text-white bg-[#56c856] hover:bg-green-500 active:scale-[.9]"
              />
            </div>
          )}
          {isAuthenticated && (
            <div onClick={handlelogout}>
              <MyButton
                type="submit"
                content="Logout"
                className="px-3 py-2 rounded-md text-white bg-[#e91616] hover:bg-[#e35353] active:scale-[.9]"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
