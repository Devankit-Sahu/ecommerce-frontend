import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import {
  Person as PersonIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userExist } from "../redux/features/auth/authSlice";
import { useRegisterMutation } from "../redux/api/user-api";

const SignupPage = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [registerMutation] = useRegisterMutation();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", avatar);
    const toastId = toast.loading("Account is creating!!!");
    setIsLoading(true);
    registerMutation(formData)
      .unwrap()
      .then((res) => {
        toast.success(res?.message, { id: toastId });
        dispatch(userExist(res?.user));
      })
      .catch((error) => {
        toast.error(error?.data?.message, { id: toastId });
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      });
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
    if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white px-10 sm:px-20 py-10">
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
            <div className="flex gap-1 items-center">
              <label htmlFor="name" className="text-gray-500">
                <PersonIcon />
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className={`bg-transparent placeholder:text-sm sm:placeholder:text-base rounded outline-none border border-[#d5d0d0] w-full py-2 px-1 ${
                  errors?.name && "border border-solid border-red-600"
                }`}
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
            </div>
            {errors?.name && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.name?.message}
              </p>
            )}
          </div>
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email",
                  },
                })}
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
                  errors?.password && "border border-solid border-red-600"
                }`}
                {...register("password", {
                  required: "password is required",
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
            className="w-full rounded-md bg-cyan-500 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 capitalize"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
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
      </div>
    </section>
  );
};

export default SignupPage;
