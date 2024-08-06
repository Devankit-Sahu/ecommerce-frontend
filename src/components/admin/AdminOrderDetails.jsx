import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderDetailsByAdminQuery,
  useUpdateOrderByAdminMutation,
} from "../../redux/api/order-api";
import { Stack } from "@mui/material";
import OrderUpdateDialog from "../dialog/OrderUpdateDialog";
import toast from "react-hot-toast";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const { data } = useGetOrderDetailsByAdminQuery(orderId);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [updateOrder] = useUpdateOrderByAdminMutation();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleUpdateOrder = () => {
    if (!selectedStatus || !selectedDate) {
      toast.error("provide status and date");
      return;
    }
    const toastId = toast.loading(
      "Order is updating!!! Please wait for while."
    );
    updateOrder({
      orderId,
      orderStatus: selectedStatus,
      deliveredAt: selectedDate,
    })
      .unwrap()
      .then((res) => {
        toast.success(res.message, { id: toastId });
        navigate("/admin/orders");
      })
      .catch((error) => toast.error(error?.data?.message, { id: toastId }));
    setOpen(false);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-10 2xl:px">
      {data?.order && (
        <>
          <h4 className="font-semibold text-base my-2 capitalize">
            Order Id :
            <span className="text-red-700 font-semibold ml-1">
              #{data?.order?._id}
            </span>
          </h4>
          <h4 className="font-semibold text-base my-2 capitalize">
            created by :
            <span className="text-gray-700 font-semibold ml-1">
              {data?.order?.userId?.name}
            </span>
          </h4>
          <h4 className="font-semibold text-base my-2 capitalize">
            email :
            <span className="text-gray-700 font-semibold ml-1">
              {data?.order?.userId?.email}
            </span>
          </h4>
          <h4 className="font-semibold text-base my-2 capitalize">
            status :
            <span className="text-green-700 font-semibold ml-1">
              {data?.order?.orderStatus}
            </span>
          </h4>
          <h4 className="font-semibold text-base my-2 capitalize">
            PlacedAt :
            <span className="text-gray-600 font-normal ml-1">
              {new Date(data?.order?.createdAt).toLocaleDateString()}
            </span>
          </h4>
          <h4 className="font-semibold text-base my-2 capitalize">
            Expected Delivery :
            <span className="text-gray-600 font-normal ml-1">
              {new Date(data?.order?.deliveredAt).toLocaleDateString()}
            </span>
          </h4>
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
                gap={2}
                key={item._id}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-10 h-10 md:w-20 md:h-20"
                />
                <h3 className="w-[50%]">{item.name}</h3>
                <h3 className="w-[50%]">x{item.quantity}</h3>
                <h3 className="w-[50%]">₹ {item.price}</h3>
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
            className="bg-fuchsia-600 text-white py-3 rounded-lg text-center cursor-pointer hover:bg-fuchsia-700 uppercase transition-colors duration-300"
          >
            update order status
          </div>
          <OrderUpdateDialog
            open={open}
            handleClose={handleClose}
            selectedStatus={selectedStatus}
            handleStatusChange={handleStatusChange}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            handleUpdateOrder={handleUpdateOrder}
          />
        </>
      )}
    </div>
  );
};

export default AdminOrderDetails;
