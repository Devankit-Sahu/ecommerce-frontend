import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import Input from "../input/Input";
import {
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  PinDrop as PinDropIcon,
  Bungalow as BungalowIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { SERVER } from "../../config/config";
import { addShippingInfo } from "../../redux/features/cart/cartSlice";
import { useForm } from "react-hook-form";

const Shipping = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) return navigate("/cart");
  }, [cartItems.length]);

  const submitHandler = async (data) => {
    dispatch(addShippingInfo(data));
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    try {
      const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      const res = await axios.post(
        `${SERVER}/api/v1/payment/new`,
        {
          amount: totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/payment", {
        state: {
          clientSecret: res.data.clientSecret,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="w-full h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center">
      <Stack bgcolor={"white"} paddingX={5} paddingY={5}>
        <h1 className="text-center mb-5 text-2xl font-semibold capitalize">
          shipping details
        </h1>
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <div className="mb-2">
            <Input
              id="address1"
              type="text"
              label={<HomeIcon />}
              labelClassName="text-gray-500"
              placeholder="address1"
              className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65 ${
                errors?.address1 && "border border-solid border-red-600"
              }`}
              register={register}
              errorMessage={{ required: "This field is required" }}
            />
            {errors?.address1 && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.address1?.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Input
              id="address2"
              type="text"
              label={<HomeIcon />}
              labelClassName="text-gray-500"
              placeholder="address2"
              className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65 ${
                errors?.address2 && "border border-solid border-red-600"
              }`}
              register={register}
              errorMessage={{ required: "This field is required" }}
            />
            {errors?.address2 && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.address2?.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Input
              id="country"
              type="text"
              label={<BungalowIcon />}
              labelClassName="text-gray-500"
              placeholder="country"
              className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65 ${
                errors?.address2 && "border border-solid border-red-600"
              }`}
              register={register}
              errorMessage={{ required: "This field is required" }}
            />
            {errors?.country && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.country?.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Input
              id="state"
              type="text"
              label={<BungalowIcon />}
              labelClassName="text-gray-500"
              placeholder="state"
              className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65 ${
                errors?.state && "border border-solid border-red-600"
              }`}
              register={register}
              errorMessage={{ required: "This field is required" }}
            />
            {errors?.state && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.state?.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Input
              id="city"
              type="text"
              label={<LocationCityIcon />}
              labelClassName="text-gray-500"
              placeholder="city"
              className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65 ${
                errors?.city && "border border-solid border-red-600"
              }`}
              register={register}
              errorMessage={{ required: "This field is required" }}
            />
            {errors?.city && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.city?.message}
              </p>
            )}
          </div>
          <div>
            <Input
              id="pincode"
              type="text"
              label={<PinDropIcon />}
              labelClassName="text-gray-500"
              placeholder="pincode"
              className={`bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65 ${
                errors?.pincode && "border border-solid border-red-600"
              }`}
              register={register}
              errorMessage={{ required: "This field is required" }}
            />
            {errors?.pincode && (
              <p className="text-red-500 text-sm" style={{ marginTop: 0 }}>
                {errors?.pincode?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-2 py-3 rounded w-full bg-[rgba(1,159,127,1)] capitalize text-white mt-5"
            disabled={isSubmitting}
          >
            ready to pay
          </button>
        </form>
      </Stack>
    </section>
  );
};

export default Shipping;
