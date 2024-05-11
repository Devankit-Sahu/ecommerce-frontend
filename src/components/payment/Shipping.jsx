import React, { useEffect, useState } from "react";
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

const Shipping = () => {
  const { cartItems, shippingInfo: info } = useSelector((state) => state.cart);
  const [shippingInfo, setShippingInfo] = useState({
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (cartItems.length === 0) return navigate("/cart");
    if (shippingInfo) {
      setShippingInfo(info);
    }
  }, [cartItems.length]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { address1, address2, country, state, city, pincode } = shippingInfo;

    if ((!address1 && !address2) || !country || !state || !city || !pincode) {
      toast.error("shipping details required");
      return;
    }

    dispatch(addShippingInfo(shippingInfo));
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

    try {
      const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      const res = await axios.post(
        `${SERVER}/api/v1/payment/new`,
        {
          amount: 1,
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
        <form onSubmit={submitHandler}>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            marginBottom={2}
          >
            <Input
              label={<HomeIcon />}
              labelClassName="text-gray-500"
              type="text"
              id="address1"
              name="address1"
              placeholder="address1"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65"
              value={shippingInfo.address1}
              onChange={inputChangeHandler}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            marginBottom={2}
          >
            <Input
              label={<HomeIcon />}
              labelClassName="text-gray-500"
              type="text"
              id="address2"
              name="address2"
              placeholder="address2"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65"
              value={shippingInfo.address2}
              onChange={inputChangeHandler}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            marginBottom={2}
          >
            <Input
              label={<BungalowIcon />}
              labelClassName="text-gray-500"
              type="text"
              id="country"
              name="country"
              placeholder="country"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65"
              value={shippingInfo.country}
              onChange={inputChangeHandler}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            marginBottom={2}
          >
            <Input
              label={<BungalowIcon />}
              labelClassName="text-gray-500"
              type="text"
              id="state"
              name="state"
              placeholder="state"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65"
              value={shippingInfo.state}
              onChange={inputChangeHandler}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            marginBottom={2}
          >
            <Input
              label={<LocationCityIcon />}
              labelClassName="text-gray-500"
              type="text"
              id="city"
              name="city"
              placeholder="city"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65"
              value={shippingInfo.city}
              onChange={inputChangeHandler}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            marginBottom={2}
          >
            <Input
              label={<PinDropIcon />}
              labelClassName="text-gray-500"
              type="text"
              id="pincode"
              name="pincode"
              placeholder="pincode"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2 py-1 placeholder:text-black/65"
              value={shippingInfo.pincode}
              onChange={inputChangeHandler}
            />
          </Stack>
          <button
            onClick={submitHandler}
            type="submit"
            className="px-2 py-3 rounded w-full bg-[rgba(1,159,127,1)] capitalize text-white"
          >
            ready to pay
          </button>
        </form>
      </Stack>
    </section>
  );
};

export default Shipping;
