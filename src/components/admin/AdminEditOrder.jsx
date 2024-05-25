import { useParams } from "react-router-dom";
import { useGetOrderDetailsByAdminQuery } from "../../redux/api/order-api";
import { Stack } from "@mui/material";

const AdminEditOrder = () => {
  const { orderId } = useParams();
  const { data } = useGetOrderDetailsByAdminQuery(orderId);
  return (
    <div className="container mx-auto px-10 2xl:px">
      {data?.order && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-base sm:text-xl my-2 capitalize">
              Order Id :
              <span className="text-red-700 font-semibold ml-1">
                #{data?.order?._id}
              </span>
            </h1>
            <h4 className="font-bold text-base sm:text-xl my-2 capitalize">
              status :
              <span className="text-green-700 font-semibold ml-1">
                {data?.order?.orderStatus}
              </span>
            </h4>
          </div>
          <div className="flex items-center justify-between">
            <h4>
              PlacedAt : {new Date(data?.order?.createdAt).toLocaleDateString()}
            </h4>
            <h4>
              DeliveredAt :
              {new Date(data?.order?.createdAt).toLocaleDateString()}
            </h4>
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
                <h3>x{item.quantity}</h3>
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

          <button>update order status</button>
        </>
      )}
    </div>
  );
};

export default AdminEditOrder;
