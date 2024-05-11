import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useGetMyOrdersQuery } from "../redux/api/order-api";

const MyOrdersPage = () => {
  const { data } = useGetMyOrdersQuery();

  return (
    <section className="min-h-[calc(100%-120px)] w-full container mx-auto px-10 2xl:px">
      {data?.orders?.length > 0 ? (
        <>
          <Box className="hidden sm:block">
            <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#3d3e3f] border-b border-solid border-b-[#ced0d5] capitalize">
              my orders
            </h2>
            <Box className="w-full ">
              <table className="w-full mb-10">
                <thead>
                  <tr className="text-left">
                    <th className="p-2 text-zinc-500 capitalize">Order Id</th>
                    <th className="p-2 text-zinc-500 capitalize">Items</th>
                    <th className="p-2 text-zinc-500 capitalize">Image</th>
                    <th className="p-2 text-zinc-500 capitalize">Order Name</th>
                    <th className="p-2 text-zinc-500 capitalize">Status</th>
                    <th className="p-2 text-zinc-500 capitalize">Total</th>
                    <th className="p-2 text-zinc-500 capitalize">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.map((order) => (
                    <tr
                      key={order._id}
                      className="cursor-pointer hover:bg-slate-100"
                    >
                      <td className="p-2">{order._id}</td>
                      <td className="p-2">{order.orderItems.length}</td>
                      <td className="p-2">
                        <img
                          src={order?.orderItems[0].image}
                          alt="product-preview"
                          className="w-10 h-10"
                        />
                      </td>
                      <td className="p-2">{order?.orderItems[0].name}</td>
                      <td className="p-2">{order.orderStatus}</td>
                      <td className="p-2">₹ {order.totalPrice}</td>
                      <td className="p-2">
                        <Link to={`/my-order/${order._id}`}>view order</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
          {/* for mobile screen */}
          <Box className="block sm:hidden">
            {data?.orders?.map((order) => (
              <Link key={order._id} to={`/my-order/${order._id}`}>
                <Box className="hover:bg-slate-100 flex items-center gap-5">
                  <img
                    src={order?.orderItems[0].image}
                    alt="product-preview"
                    className="w-20 h-20"
                  />
                  <Box>
                    <h1 className="text-gray-500">{order._id}</h1>
                    <h1 className="font-bold">{order?.orderItems[0].name}</h1>
                    <h1 className="text-sm">{order.orderStatus}</h1>
                    <h1 className="font-bold">₹ {order.totalPrice}</h1>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </>
      ) : (
        <Box className="my-10 text-center capitalize font-bold text-2xl sm:text-4xl">
          No orders yet
        </Box>
      )}
      <Box className="flex justify-center mt-6">
        <Link to="/" className="text-blue-500">
          <KeyboardBackspaceIcon />
          Continue shopping
        </Link>
      </Box>
    </section>
  );
};

export default MyOrdersPage;
