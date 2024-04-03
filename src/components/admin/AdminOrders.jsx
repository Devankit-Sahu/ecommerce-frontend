import React from "react";
import { Box } from "@mui/system";
import MyTable from "../table/MyTable";
import { orderColumns } from "../../data/data";
import { Link } from "react-router-dom";
import { EditOutlined } from "@mui/icons-material";

const AdminOrders = () => {
  const orders = [
    {
      _id: 1,
      name: " Fold Over Collar Plain Blazers",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 1000,
      quantity: 3,
      status: "pending",
    },
  ];

  const data = orders?.map((order) => ({
    product_id: order._id,
    name: order.name,
    quantity: order.quantity,
    price: order.price,
    photo: order.url,
    action: (
      <Link to={`/admin/order/${order._id}`}>
        <EditOutlined />
      </Link>
    ),
  }));
  return (
    <Box className="bg-white p-5">
      <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
        orders
      </h2>
      <MyTable columns={orderColumns} data={data} />
    </Box>
  );
};

export default AdminOrders;
