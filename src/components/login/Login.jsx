import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import Loader from "../Loader";
import { loginUser } from "../../redux/features/auth/authAction";
import { clearAllErrors } from "../../redux/features/auth/authSlice";
import Input from "../input/Input";
import MyButton from "../button/MyButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const Login = () => {
  // const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  // const { error, loading,user } = useSelector((state) => state.auth);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;
    if (email && password) {
      // dispatch(loginUser({ email, password }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  // useEffect(() => {
  //   if (isAuthenticated && user?.role === "user") {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     navigate("/");
  //   } else if (isAuthenticated && user?.role === "admin") {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     navigate("/admin/dashboard");
  //   }
  //   if (error) {
  //     dispatch(clearAllErrors());
  //   }
  // }, [isAuthenticated, user, navigate, dispatch, error]);

  return (
    <Fragment>
      <div className="h-screen flex justify-center items-center bg-slate-200 ">
        <div className="flex flex-col justify-center rounded-[10px] bg-[#ffffff70] p-10 shadow-xl relative">
          <div className="cursor-pointer absolute top-3 left-3 hover:bg-[#d7d3d3c3] p-2 rounded-[50px]">
            <Link to="/">
              <ArrowBackIcon />
            </Link>
          </div>
          <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600 capitalize">
            LogIn to your account
          </h2>
          <form className="space-y-6" onSubmit={handlesubmit} noValidate>
            <div className="mt-2">
              <Input
                label="Email"
                name="email"
                type="email"
                className="border-0 py-1.5 shadow-md px-2 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
                value={loginDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-2">
              <Input
                label="Password"
                name="password"
                type="password"
                value={loginDetails.password}
                autoComplete="off"
                placeholder="Enter your password"
                className="border-0 py-1.5 shadow-md px-2 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>

            <MyButton
              type="submit"
              content="Log In"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 "
            />
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
