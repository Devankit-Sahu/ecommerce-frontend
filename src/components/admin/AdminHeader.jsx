import React, { useState } from "react";
import { Avatar } from "@mui/material";
import logo from "../../assets/brand-logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authAction";
import { toast } from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "../button/MyButton";
import { isLoggedOut } from "../../redux/features/auth/authSlice";

const AdminHeader = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const clickHandler = () => {
    if (isAuthenticated) {
    dispatch(logoutUser());
    dispatch(isLoggedOut());
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Log out !!!", { position: "bottom-center" });
    }
  };
  
  return (
    <div className="bg-[rgba(0,0,255,0.5)] flex h-16 items-center px-4">
      <div className="flex items-center justify-center">
        <img src={logo} className="w-10" alt="logo" />
      </div>
      <div className="ml-[20px]">
        <ul className="flex items-center gap-x-4 cursor-pointer text-lg font-serif">
          <Link to="/admin/dashboard">
            <li className="">Dashboard</li>
          </Link>
          <li className="relative" onMouseEnter={() => setIsOpen(true)}>
            Product
            <span>
              <KeyboardArrowDownIcon
                className={`${isOpen ? "rotate-180" : "rotate-0"}`}
              />
            </span>
            <div
              className={`absolute top-8 w-[150px] bg-white ${
                isOpen ? "block" : "hidden"
              }`}
              style={{ boxShadow: "0 0 10px rgba(0,0,0,0.204)" }}
              onMouseLeave={() => setIsOpen(false)}
            >
              <ul>
                <Link to="/admin/products">
                  <li className="p-2 hover:bg-[#f1f0f0]">Product List</li>
                </Link>
                <Link to="/admin/product/add">
                  <li className="p-2 hover:bg-[#f1f0f0]">Add Product</li>
                </Link>
              </ul>
            </div>
          </li>
          <Link to="/admin/category/all">
            <li className="">Category</li>
          </Link>
          <Link to="/admin/users/all">
            <li className="">Users</li>
          </Link>
        </ul>
      </div>
      <div className="ml-auto flex items-center gap-x-5">
        <Button
          content="Logout"
          onClick={clickHandler}
          className="px-3 py-2 rounded-md bg-[#2dadcf] hover:bg-[#56b0c8] active:scale-[.8]"
        />
        <Avatar src="./profile.png" />
      </div>
    </div>
  );
};

export default AdminHeader;
