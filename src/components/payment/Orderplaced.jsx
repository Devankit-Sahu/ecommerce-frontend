import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { setIsPaymentCompleted } from "../../redux/features/utilSlice";
import { resetCart } from "../../redux/features/cart/cartSlice";

const Orderplaced = () => {
  const { isPaymentCompleted } = useSelector((state) => state.utils);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = () => {
    localStorage.removeItem("cartItems");
    dispatch(resetCart());
    dispatch(setIsPaymentCompleted(false));
    navigate("/my-orders");
  };

  useEffect(() => {
    if (!isPaymentCompleted) navigate("/");
  }, [isPaymentCompleted]);

  return (
    <section className="w-full h-[calc(100vh-80px)] bg-slate-100 flex flex-col items-center justify-center">
      <img
        src="/order-placed.svg"
        className="w-[500px]"
        alt="order-placed-preview"
      />
      <Button variant="contained" onClick={navigateHandler}>
        View My Orders
      </Button>
    </section>
  );
};

export default Orderplaced;
