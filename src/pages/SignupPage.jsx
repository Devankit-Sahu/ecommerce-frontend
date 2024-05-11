import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Avatar } from "@mui/material";
import {
  Person as PersonIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { userExist } from "../redux/features/auth/authSlice";
import { SERVER } from "../config/config";

const SignupPage = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", avatar);
    try {
      const res = await axios.post(`${SERVER}/api/v1/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(userExist(res.data.user));
      navigate("/");
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      reset();
    }
  };

  const registerImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setAvatar(selectedFile);

    // Display the image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setavatarPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="h-screen flex items-center justify-center bg-slate-200">
      <Box bgcolor={"white"} padding={10}>
        <h2 className="my-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600 capitalize">
          Create your account
        </h2>
        <form
          className="space-y-6"
          method="POST"
          onSubmit={handleSubmit(registerSubmit)}
          noValidate
          encType="multipart/form-data"
        >
          <div className="flex justify-center">
            <label htmlFor="avatar">
              <Avatar
                sx={{
                  width: "60px",
                  height: "60px",
                }}
                src={avatarPreview}
              />
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={registerImageChange}
            />
          </div>
          <div>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <label className="text-gray-500" htmlFor="name">
                <PersonIcon />
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full py-2 px-1 ${
                  errors?.name && "border border-solid border-red-600"
                }`}
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Must be of atleast 5 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Must not exceed 30 characters",
                  },
                })}
              />
            </Stack>
            {errors?.name && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.name?.message}
              </p>
            )}
          </div>
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
            className="w-full rounded-md bg-cyan-500 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 capitalize"
            type="submit"
            disabled={isSubmitting ? true : false}
          >
            sign up
          </button>
        </form>
        <p className="mt-5 text-sm text-gray-500">
          Already a member?
          <Link
            to="/login"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 underline"
          >
            Sign In
          </Link>
        </p>
      </Box>
    </section>
  );
};

export default SignupPage;
