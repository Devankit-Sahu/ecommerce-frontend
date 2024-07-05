import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSingleOrderMutation,
  useGetOrderDetailsQuery,
} from "../redux/api/order-api";
import { Stack, Step, StepLabel, Stepper } from "@mui/material";
import { orderStatus } from "../constants/constants";
import toast from "react-hot-toast";
import CustomDialog from "../components/dialog/CustomDialog";

const OrderDetails = () => {
  const { id } = useParams();
  const { data } = useGetOrderDetailsQuery(id);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteOrderMutation] = useDeleteSingleOrderMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const orderDeleteHandler = () => {
    const toastId = toast.loading("Order is deleting!!!");
    deleteOrderMutation(id)
      .unwrap()
      .then((res) => {
        toast.success(res?.message, { id: toastId });
        navigate("/my-orders");
      })
      .catch((error) => toast.error(error?.data?.message, { id: toastId }));
  };

  return (
    <section className="w-full">
      <div className="container mx-auto px-10 2xl:px">
        {data?.order && (
          <>
            <h1 className="font-bold text-base sm:text-xl my-2">
              Order Id :
              <span className="text-red-700 font-semibold ml-1">
                {data?.order?._id}
              </span>
            </h1>
            <div className="flex md:items-center flex-col md:flex-row justify-between">
              <h4 className="capitalize">
                PlacedAt :
                <span className="ml-1">
                  {new Date(data?.order?.createdAt).toLocaleDateString()}
                </span>
              </h4>
              <h4 className="capitalize">
                Expected delivery :
                <span className="ml-1">
                  {new Date(data?.order?.deliveredAt).toLocaleDateString()}
                </span>
              </h4>
            </div>
            <div className="w-full my-10">
              <Stepper
                activeStep={
                  orderStatus.findIndex(
                    (step) => step === data?.order?.orderStatus
                  ) + 1
                }
                alternativeLabel
              >
                {orderStatus.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        textTransform: "uppercase",
                        color: "black",
                        fontWeight: 900,
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="border border-solid border-slate-300 bg-slate-100 rounded-lg my-5">
              <h2 className="border-b border-solid border-slate-300 p-2 font-bold capitalize text-xl">
                order items
              </h2>
              {data?.order?.orderItems?.map((item) => (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  padding={2}
                  key={item._id}
                >
                  <img src={item.image} alt="" className="w-20 h-20" />
                  <h3>{item.name}</h3>
                  <h3>{item.quantity}</h3>
                  <h3>₹ {item.price}</h3>
                </Stack>
              ))}
            </div>
            <div className="border border-solid border-slate-300 bg-slate-100 rounded-lg my-10">
              <h2 className="border-b border-solid border-slate-300 p-2 font-bold capitalize text-xl">
                order summary
              </h2>
              <h1 className="p-2">
                total price :
                <span className="ml-1">₹ {data?.order?.totalPrice}</span>
              </h1>
            </div>
            <div
              onClick={handleClickOpen}
              className="bg-fuchsia-600 text-white py-3 rounded-lg text-center cursor-pointer hover:bg-fuchsia-700 uppercase transition-colors duration-300 w-full sm:inline px-5"
            >
              delete order
            </div>
          </>
        )}
      </div>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        dialogTitle={
          "Are you sure do want to delete this order? If you do so you can't track your order."
        }
        deleteProductHandler={orderDeleteHandler}
      />
    </section>
  );
};

export default OrderDetails;
