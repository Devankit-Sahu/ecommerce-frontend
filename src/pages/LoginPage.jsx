import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { userExist } from "../redux/features/auth/authSlice";
import { useLoginMutation } from "../redux/api/user-api";

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loginMutation] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (data) => {
    const { email, password } = data;
    setIsLoading(true);
    loginMutation({ email, password })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        dispatch(userExist(res?.user));
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white px-10 sm:px-20 py-10">
        <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600 capitalize">
          Login
        </h2>
        <form
          className="space-y-6"
          method="post"
          onSubmit={handleSubmit(handleLoginSubmit)}
          noValidate
        >
          <div>
            <div className="flex gap-1 items-center">
              <label htmlFor="email" className="text-gray-500">
                <EmailOutlinedIcon />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className={`bg-transparent placeholder:text-sm sm:placeholder:text-base rounded outline-none border border-[#d5d0d0] w-full py-2 px-1 ${
                  errors?.email && "border border-solid border-red-600"
                }`}
                {...register("email", { required: "This field is required" })}
              />
            </div>
            {errors?.email && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <label htmlFor="password" className="text-gray-500">
                <LockOutlinedIcon />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className={`bg-transparent placeholder:text-sm sm:placeholder:text-base rounded outline-none border border-[#d5d0d0] w-full py-2 px-1 ${
                  errors?.email && "border border-solid border-red-600"
                }`}
                {...register("password", {
                  required: "This field is required",
                })}
              />
            </div>
            {errors?.password && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.password?.message}
              </p>
            )}
          </div>
          <button
            className="w-full rounded-md bg-cyan-500 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-5 text-sm text-gray-500">
          Don't have account?
          <Link
            to="/register"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
