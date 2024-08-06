import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useCreateOrderMutation } from "../../redux/api/order-api";
import { setIsPaymentCompleted } from "../../redux/features/utilSlice";
import { SERVER } from "../../config/config";

const Payment = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [stripeKey, setStripeKey] = useState(null);
  const navigate = useNavigate();

  const getStripeKey = async () => {
    try {
      const res = await axios.get(`${SERVER}/api/v1/payment/key`, {
        withCredentials: true,
      });
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
    if (!cartItems.length) {
      navigate("/cart");
    }
  }, [cartItems.length, navigate]);

  return (
    <section className="w-full h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center">
      <Elements stripe={stripeKey}>
        <CheckOutForm cartItems={cartItems} user={user} />
      </Elements>
    </section>
  );
};

export default Payment;

const CheckOutForm = ({ cartItems, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [createOrderMutation] = useCreateOrderMutation();
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createPayment = async (amount) => {
    const res = await axios.post(
      `${SERVER}/api/v1/payment/new`,
      {
        amount: amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res?.data?.clientSecret;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const clientSecret = await createPayment(total);

    setIsLoading(true);
    const toastId = toast.loading(
      "Your payment is being processed. Please do not hit the back button!!!"
    );

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              address: {
                line1: user.shippingInfo.address1,
                city: user.shippingInfo.city,
                state: user.shippingInfo.state,
                country: "IN",
              },
            },
          },
        }
      );

      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Your payment is successful!", { id: toastId });
        await createOrderMutation({
          orderItems: cartItems,
          shippingInfo: user.shippingInfo,
          totalPrice: total,
          stripePaymentIntentId: paymentIntent.id,
        });
        toast.success("Your order is created!", { id: toastId });
        dispatch(setIsPaymentCompleted(true));
        navigate("/payment-success", { replace: true });
      } else {
        toast.error("Payment failed. Please try again.", { id: toastId });
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("An unexpected error occurred. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const tot = cartItems.reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0);
      setTotal(tot);
    }
  }, [cartItems]);

  return (
    <form className="bg-white px-10 py-10" onSubmit={handleSubmit}>
      <h1 className="capitalize font-semibold mb-5 text-center text-base md:text-xl">
        payment details
      </h1>
      <Stack direction={"row"} gap={2} marginBottom={1}>
        <CreditCardIcon className="text-gray-500" fontSize="10px" />
        <CardNumberElement className="w-full" />
      </Stack>
      <Stack direction={"row"} gap={2} marginBottom={1}>
        <EventIcon className="text-gray-500" fontSize="10px" />
        <CardExpiryElement className="w-full" />
      </Stack>
      <Stack direction={"row"} gap={2} marginBottom={1}>
        <VpnKeyIcon className="text-gray-500" fontSize="10px" />
        <CardCvcElement className="w-full" />
      </Stack>
      <button
        className="mt-5 py-2 w-full bg-[rgba(1,159,127,1)] text-white capitalize"
        disabled={isLoading || !stripe || !elements}
        type="submit"
      >
        {isLoading ? "processing" : `pay ₹${total.toFixed(2)}`}
      </button>
    </form>
  );
};
