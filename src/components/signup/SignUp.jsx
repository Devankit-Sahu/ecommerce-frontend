import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Loader, Input, MyButton } from "../../components";
import { createUser } from "../../redux/features/auth/authAction";
import { clearAllErrors } from "../../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

const SignUp = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  const { loading, error, user } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userDetails;
    if (name && email && password && avatar) {
      dispatch(createUser({ name, email, password, avatar }));
    }
  };

  const registerDataChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const registerImageChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "user") {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else if (isAuthenticated && user?.role === "admin") {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin/dashboard");
    }
    if (error) {
      dispatch(clearAllErrors());
    }
  }, [dispatch, isAuthenticated, navigate, error]);

  return (
    <Fragment>
      <motion.div
        initial={{ translateY: "-450px" }}
        animate={{ translateY: "0" }}
        className="min-h-[100vh] px-6 py-12 lg:px-8 bg-slate-200 "
      >
        <div className="flex flex-col justify-center rounded-3xl shadow-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-4 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          <form
            className="space-y-6"
            onSubmit={registerSubmit}
            noValidate
            encType="multipart/form-data"
          >
            <div className="mt-2">
              <Input
                label="Name"
                name="name"
                type="text"
                value={userDetails.name}
                placeholder="Enter your Name"
                className="border-0 py-1.5 shadow-md px-2 sm:text-sm sm:leading-6"
                onChange={registerDataChange}
              />
            </div>
            <div className="mt-2">
              <Input
                label="Email"
                name="email"
                type="email"
                value={userDetails.email}
                placeholder="Enter your Email"
                className="border-0 py-1.5 shadow-md px-2 sm:text-sm sm:leading-6"
                onChange={registerDataChange}
              />
            </div>

            <div className="mt-2">
              <Input
                label="Password"
                name="password"
                type="password"
                value={userDetails.password}
                autoComplete="off"
                placeholder="Enter your password"
                className="border-b py-1.5 shadow-md px-2 sm:text-sm sm:leading-6"
                onChange={registerDataChange}
              />
            </div>
            <div className="flex items-center gap-3">
              <Avatar
                sx={{
                  bgcolor: lightGreen["A700"],
                  width: "50px",
                  height: "50px",
                }}
                src={avatarPreview}
              />
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="block w-full py-1.5 sm:leading-6 file:w-full file:bg-gradient-to-b file:from-green-500 file:to-green-600 file:border-none file:p-3 file:rounded-full file:text-white file:cursor-pointer"
                onChange={registerImageChange}
              />
            </div>

            <MyButton
              type="submit"
              content={
                loading ? (
                  <Loader height={"20"} width={"20"} color="rgb(255,255,255)" />
                ) : (
                  "Sign Up"
                )
              }
              className="p-2 bg-blue-700 text-white hover:bg-blue-600  active:scale-[0.9] rounded-md w-full"
            />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default SignUp;
