import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import Loader from "../Loader";
import { motion } from "framer-motion";
import { loginUser } from "../../redux/features/auth/authAction";
import { clearAllErrors } from "../../redux/features/auth/authSlice";
import Input from "../input/Input";

const Login = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
  const { error, loading,user } = useSelector((state) => state.auth);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
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
  }, [isAuthenticated, user, navigate, dispatch, error]);

  return (
    <Fragment>
      <div className="min-h-[100vh] flex justify-center items-center  bg-slate-200 ">
        <motion.div
          initial={{ translateY: "-450px" }}
          animate={{ translateY: "0" }}
          className="flex flex-col justify-center rounded-3xl shadow-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-4 bg-white"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <Loader height={"20"} width={"20"} color="rgb(255,255,255)" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default Login;
