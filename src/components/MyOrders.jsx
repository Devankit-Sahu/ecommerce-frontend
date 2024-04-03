import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const MyOrders = () => {
  const myorders = [
    {
      cartItemId: 1,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fold Over Collar Plain Blazers",
      status: "pending",
      quantity: 2,
      totalPrice: 1200,
    },
    {
      cartItemId: 2,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fold Over Collar Plain Blazers",
      status: "pending",
      quantity: 2,
      totalPrice: 1200,
    },
  ];
  return (
    <section className="min-h-screen w-full container mx-auto px-10 2xl:px">
      {myorders.length > 0 ? (
        <>
          <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#3d3e3f] border-b border-solid border-b-[#ced0d5] capitalize">
            my orders
          </h2>
          <Box className="w-full ">
            <table className="w-full mb-10">
              <thead>
                <tr className="text-left">
                  <th className="p-2 text-zinc-500">Product</th>
                  <th className="p-2 text-zinc-500">Status</th>
                  <th className="p-2 text-zinc-500">Total</th>
                </tr>
              </thead>
              <tbody>
                {myorders?.map((item) => (
                  <tr
                    key={item.cartItemId}
                    className="cursor-pointer hover:bg-slate-100"
                  >
                    <td className="p-2 flex gap-3">
                      <img
                        src={item.image}
                        alt="product-preview"
                        className="w-16 h-16"
                      />
                      <div>
                        <h1 className="font-semibold capitalize text-xs sm:text-sm md:text-xl mb-3">
                          {item.name}
                        </h1>
                        <h3>Quantity : {item.quantity}</h3>
                      </div>
                    </td>
                    <td className="p-2">{item.status}</td>
                    <td className="p-2">₹ {item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </>
      ) : (
        <Box className="my-10 text-center capitalize font-bold text-4xl">
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

export default MyOrders;
