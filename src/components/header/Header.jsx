import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MyButton } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Container, Typography } from "@mui/material";
import {
  ShoppingCartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { logoutUser } from "../../redux/features/auth/authAction";
import { isLoggedOut } from "../../redux/features/auth/authSlice.js";
import Search from "../search/Search.jsx";
const navigation = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/products" },
];

const Header = () => {
  // const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  // const { user } = useSelector((state) => state.auth);
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const [key, setKey] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlelogout() {
    // if (isAuthenticated) {
    // dispatch(logoutUser());
    // dispatch(isLoggedOut());
    // localStorage.removeItem("user");
    // toast.success("Logout successfully !!!!");
    // navigate("/login");
    // }
  }
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (key.trim()) {
  //     navigate(`/products/${key}`);
  //     setKey("");
  //   }
  // };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="w-full container mx-auto px-5 2xl:px-40 h-[86px] flex justify-between items-center border-b-[1px] border-solid border-gray-200">
        <div className="text-2xl font-medium">
          <Link to={"/"}>ECommerce</Link>
        </div>
        {/* search bar */}
        <Search />
        <div className="flex gap-5 items-center">
          <Badge
            badgeContent={2}
            color="warning"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartOutlined
              className="cursor-pointer"
              sx={{ fontSize: 25 }}
            />
          </Badge>
          <Avatar />
          {/* <Link to="/login">
            <MyButton
              content="LogIn"
              className="bg-[#42cd42] px-3 py-2 rounded-[10px] text-white hover:scale-[0.9]"
            />
          </Link> */}
          {/* <MyButton
            content="LogOut"
            className="border-[1.5px] border-solid border-red-600 px-3 py-2 rounded-[10px] text-red-500 hover:scale-[0.9]"
            onClick={handlelogout}
          /> */}
        </div>
      </div>
      <div className="bg-[rgb(255,187,56)] h-[60px]">
        <div className="container mx-auto px-5 2xl:px-40 h-full flex items-center space-x-5">
          <div
            className="w-[170px] sm:w-[270px] bg-white h-[50px] flex items-center justify-between px-3 cursor-pointer relative rounded-t-xl"
            onClick={toggleDropdown}
          >
            <p className="">All Categories</p>
            <span className="transition-all duration-300 ease-in-out">
              {isDropdownOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </span>
            <ul
              className={`absolute top-[50px] left-0 z-10 w-full bg-white transition-all ease-in-out duration-300 origin-top ${
                isDropdownOpen ? "scale-y-[1]" : "scale-y-0"
              }`}
            >
              <li className="border-t-[1px] border-solid border-t-[#f8f8f8] py-2 px-3 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
                Mens
              </li>
              <li className="border-t-[1px] border-solid border-t-[#f8f8f8] py-2 px-3 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
                Womens
              </li>
              <li className="border-t-[1px] border-solid border-t-[#f8f8f8] py-2 px-3 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
                Kids
              </li>
              <li className="border-t-[1px] border-solid border-t-[#f8f8f8] py-2 px-3 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
                Watches
              </li>
            </ul>
          </div>
          <ul className="flex gap-5 items-center">
            {navigation.map((nav) => (
              <NavLink
                key={nav.name}
                to={nav.to}
                className={({ isActive }) => {
                  return isActive ? "text-[#c538c5] font-bold" : "text-black";
                }}
              >
                <li className="text-base">{nav.name}</li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
