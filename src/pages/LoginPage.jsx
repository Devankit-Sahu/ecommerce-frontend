import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { userExist } from "../redux/features/auth/authSlice";
import { useLoginMutation } from "../redux/api/user-api";

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
      });
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    } else if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="h-screen flex items-center justify-center bg-slate-200">
      <Box bgcolor={"white"} padding={10}>
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
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <label className="text-gray-500" htmlFor="email">
                <EmailOutlinedIcon />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full py-2 px-1 ${
                  errors?.email && "border border-solid border-red-600"
                }`}
                placeholder="Enter your email"
                {...register("email", { required: "This field is required" })}
              />
            </Stack>
            {errors?.email && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <label className="text-gray-500" htmlFor="password">
                <LockOutlinedIcon />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full py-2 px-1 ${
                  errors?.password && "border border-solid border-red-600"
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "This field is required",
                })}
              />
            </Stack>
            {errors?.password && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.password?.message}
              </p>
            )}
          </div>
          <button
            className="w-full rounded-md bg-cyan-500 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600"
            type="submit"
            disabled={isSubmitting ? true : false}
          >
            login
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
      </Box>
    </section>
  );
};

export default LoginPage;
