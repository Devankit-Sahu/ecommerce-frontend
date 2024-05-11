import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { setIsPaymentCompleted } from "../../redux/features/utilSlice";

const Orderplaced = () => {
  const { isPaymentCompleted } = useSelector((state) => state.utils);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = () => {
    dispatch(setIsPaymentCompleted(false));
    navigate("/my-orders");
  };

  useEffect(() => {
    if (!isPaymentCompleted) navigate("/");
  }, [isPaymentCompleted]);

  return (
    <section className="w-full h-[calc(100vh-80px)] bg-slate-100 flex flex-col items-center justify-center">
      <p>your order is placed</p>
      <Button variant="contained" onClick={navigateHandler}>
        View Orders
      </Button>
    </section>
  );
};

export default Orderplaced;
