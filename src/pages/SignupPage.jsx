import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, MyButton } from "..";
import { Avatar } from "@mui/material";
import { useForm } from "react-hook-form";
import { createUser } from "../../redux/api/auth-api";
import { Alert } from "@mui/material";

const SignupPage = () => {
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
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
  const registerSubmit = (data) => {
    const { name, email, password } = data;
    if (avatar) {
      dispatch(createUser({ name, email, password, avatar }));
    } else {
      dispatch(createUser({ name, email, password }));
    }
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
      <div className="w-1/2 p-10">
        <div className="bg-[white] rounded-2xl h-full px-10 flex items-center">
          <div className="w-full">
            <h2 className="my-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600 capitalize">
              Create your account
            </h2>
            {error && (
              <Alert severity="error" className="mb-2">
                ={error}
              </Alert>
            )}
            <form
              className="space-y-6"
              method="POST"
              onSubmit={handleSubmit(registerSubmit)}
              noValidate
              encType="multipart/form-data"
            >
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  sx={{
                    width: "60px",
                    height: "60px",
                  }}
                  src={avatarPreview}
                />
                <Input
                  id="avatar"
                  label="Choose Avatar"
                  labelClassName="bg-sky-500 text-white p-2 rounded-lg cursor-pointer"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={registerImageChange}
                />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                className={`w-full outline-none border-[1px] border-solid border-green-400 placeholder-green-500 focus:border-[1px] focus:border-solid focus:border-blue-400 focus:placeholder-cyan-500 rounded-2xl p-2 mt-1 ${
                  errors?.name && "border-red-500"
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
              {errors?.name && (
                <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                  {errors?.name?.message}
                </p>
              )}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className={`w-full outline-none border-[1px] border-solid border-green-400 placeholder-green-500 focus:border-[1px] focus:border-solid focus:border-blue-400 focus:placeholder-cyan-500 rounded-2xl p-2 mt-1 ${
                  errors?.name && "border-red-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                  {errors?.email?.message}
                </p>
              )}

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Enter your password"
                className={`w-full outline-none border-[1px] border-solid border-green-400 placeholder-green-500 focus:border-[1px] focus:border-solid focus:border-blue-400 focus:placeholder-cyan-500 rounded-2xl p-2 mt-1 ${
                  errors?.name && "border-red-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be of atleast 8 characters",
                  },
                })}
              />
              {errors?.password && (
                <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                  {errors?.password?.message}
                </p>
              )}
              <MyButton
                type="submit"
                content={loading ? "Loading" : "Sign Up"}
                disabled={isSubmitting ? true : false}
                className="w-fit rounded-md bg-cyan-500 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600"
              />
            </form>
            <p className="mt-5 text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
