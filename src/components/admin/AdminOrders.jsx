import MyTable from "../table/MyTable";
import { orderColumns } from "../../constants/constants";
import { Link } from "react-router-dom";
import { EditOutlined } from "@mui/icons-material";
import { useGetOrdersByAdminQuery } from "../../redux/api/order-api";
import { Tooltip } from "@mui/material";
import { getStatusClass } from "../../utils/utils";

const AdminOrders = () => {
  const { data, isLoading } = useGetOrdersByAdminQuery();

  const tableData = data?.orders?.map((order) => ({
    order_id: String(order._id).slice(0, 7),
    name: order.orderItems[0].name,
    totalPrice: "₹" + order.totalPrice,
    photo: order.orderItems[0].image,
    status: (
      <span
        className={`${getStatusClass(
          order.orderStatus
        )} capitalize font-medium`}
      >
        {order.orderStatus}
      </span>
    ),
    action: (
      <Link to={`/admin/order/${order._id}`}>
        <Tooltip title="Edit" placement="right">
          <EditOutlined />
        </Tooltip>
      </Link>
    ),
  }));
  return (
    <div className="bg-white p-5">
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
    </div>
  );
};

export default AdminOrders;
