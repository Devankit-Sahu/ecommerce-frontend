import React from "react";
import MyTable from "../table/MyTable";
import { orderColumns } from "../../data/data";
import { Link } from "react-router-dom";
import { EditOutlined } from "@mui/icons-material";
import { useGetOrdersByAdminQuery } from "../../redux/api/order-api";

const AdminOrders = () => {
  const { data, isLoading } = useGetOrdersByAdminQuery();

  const tableData = data?.orders?.map((order) => ({
    order_id: String(order._id).slice(0, 7),
    name: order.orderItems[0].name,
    totalPrice: order.totalPrice,
    photo: order.orderItems[0].image,
    status: order.orderStatus,
    action: (
      <Link to={`/admin/order/${order._id}`}>
        <EditOutlined />
      </Link>
    ),
  }));
  return (
    <section className="bg-white p-5">
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
            orders
          </h2>
          <MyTable columns={orderColumns} data={tableData} />
        </>
      )}
    </section>
  );
};

export default AdminOrders;
