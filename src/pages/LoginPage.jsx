import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/api/auth-api";
import MyButton from "../button/MyButton";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (data) => {
    const { email, password } = data;
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuth", JSON.stringify(isAuthenticated));
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex bg-slate-200">
      <div className="w-1/2 relative">
        <div className="absolute top-6 left-0 w-60 h-60 bg-cyan-500 rounded-full blur-[180px]"></div>
      </div>
      <div className="w-1/2 p-20">
        <div className="bg-[white] rounded-2xl h-full px-10 flex items-center">
          <div className="w-full">
            <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600 capitalize">
              Login
            </h2>
            {error && (
              <Alert severity="error" className="mb-2">
                {error}
              </Alert>
            )}
            <form
              className="space-y-6"
              method="post"
              onSubmit={handleSubmit(handleLoginSubmit)}
              noValidate
            >
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full outline-none border-[1px] border-solid border-green-400 placeholder-green-500 focus:border-[1px] focus:border-solid focus:border-blue-400 focus:placeholder-cyan-500 rounded-2xl p-2 mt-2"
                  placeholder="Enter your email"
                  {...register("email", { required: "This field is required" })}
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="Enter your password"
                  className="w-full outline-none border-[1px] border-solid border-green-400 placeholder-green-500 focus:border-[1px] focus:border-solid focus:border-blue-400 focus:placeholder-cyan-500 rounded-2xl p-2 mt-2"
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                {errors?.password && (
                  <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <MyButton
                type="submit"
                content={loading ? "Loading" : "LogIn"}
                disabled={isSubmitting ? true : false}
                className="w-fit rounded-md bg-cyan-500 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600"
              />
            </form>
            <p className="mt-5 text-sm text-gray-500">
              Don't have account?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
