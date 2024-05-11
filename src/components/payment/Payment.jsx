import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import {
  CreditCard as CreditCardIcon,
  Event as EventIcon,
  VpnKey as VpnKeyIcon,
} from "@mui/icons-material";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { resetCart } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/api/order-api";
import { setIsPaymentCompleted } from "../../redux/features/utilSlice";

const Payment = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;
  const [stripeKey, setStripeKey] = useState(null);
  const navigate = useNavigate();

  const getStripeKey = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/payment/key");
      const publishableKey = await loadStripe(res.data.publishable_key);
      setStripeKey(publishableKey);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch Stripe key"
      );
    }
  };

  useEffect(() => {
    getStripeKey();
  }, []);

  useEffect(() => {
    if (!clientSecret || cartItems.length === 0 || !shippingInfo) {
      navigate("/cart");
    }
  }, [clientSecret, cartItems.length, navigate]);

  return (
    <section className="w-full h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center">
      <Elements
        stripe={stripeKey}
        options={{
          clientSecret,
        }}
      >
        <CheckOutForm
          cartItems={cartItems}
          shippingInfo={shippingInfo}
          clientSecret={clientSecret}
        />
      </Elements>
    </section>
  );
};

export default Payment;

const CheckOutForm = ({ clientSecret, cartItems, shippingInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [createOrderMutation] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totalPrice = 0;

  totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // const { paymentIntent, error } = await stripe.confirmCardPayment(
    //   clientSecret,
    //   {
    //     payment_method: {
    //       card: elements.getElement(CardNumberElement),
    //       billing_details: {
    //         name: "fdfds",
    //         address: {
    //           line1: "fdfs",
    //           city: "fdf",
    //           state: "fdfs",
    //           country: "US",
    //         },
    //       },
    //     },
    //   }
    // );

    // if (error) {
    //   console.log(error);
    //   toast.error(error.message);
    //   setIsLoading(false);
    //   return;
    // }

    // if (paymentIntent.status === "succeeded") {
    //   await createOrderMutation({
    //     orderItems: cartItems,
    //     shippingInfo,
    //     totalPrice,
    //   });
    // localStorage.removeItem("cartItems");
    // dispatch(resetCart());
    dispatch(setIsPaymentCompleted(true));
    navigate("/payment-success");
    toast.success("your Payment is successfull!");
    // }

    setIsLoading(false);
  };

  return (
    <form className="bg-white px-10 py-10" onSubmit={handleSubmit}>
      <h1 className="capitalize font-semibold mb-5 text-center text-xl">
        payment details
      </h1>
      <Stack direction={"row"} gap={2} marginBottom={1}>
        <CreditCardIcon className="text-gray-500" />
        <CardNumberElement className="w-full" />
      </Stack>
      <Stack direction={"row"} gap={2} marginBottom={1}>
        <EventIcon className="text-gray-500" />
        <CardExpiryElement className="w-full" />
      </Stack>
      <Stack direction={"row"} gap={2} marginBottom={1}>
        <VpnKeyIcon className="text-gray-500" />
        <CardCvcElement className="w-full" />
      </Stack>
      <button
        className="mt-5 py-2 w-full bg-[rgba(1,159,127,1)] text-white capitalize"
        disabled={isLoading || !stripe || !elements}
        type="submit"
      >
        {isLoading ? "processing" : `pay ₹${totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
};
