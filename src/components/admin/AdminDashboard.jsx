import React,{useMemo} from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import Barchart from "../chart/Barchart";
import Doughtnut from "../chart/Doughtnut";
import MyTable from "../table/Table";

const AdminDashboard = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Order Id",
        accessor: "order_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );
  const data = useMemo(
    () => [
      {
        order_id: 1,
        name: "Rahul",
        email: "F3ae@dfs",
        price: 1000,
        status: "delivered",
        date: "10-02-2022",
      },
      {
        order_id: 1,
        name: "Rahul",
        email: "F3ae@dfs",
        price: 1000,
        status: "delivered",
        date: "10-02-2022",
      },
      {
        order_id: 1,
        name: "Rahul",
        email: "F3ae@dfs",
        price: 1000,
        status: "pending ",
        date: "10-02-2022",
      },
      {
        order_id: 1,
        name: "Rahul",
        email: "F3ae@dfs",
        price: 1000,
        status: "cancelled",
        date: "10-02-2022",
      },
    ],
    []
  );
  return (
    <div className="w-full px-10">
      <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#8f9297] border-b border-b-[#ced0d5] capitalize">
        DashBoard
      </h2>
      <div className="flex justify-center gap-x-10 gap-y-10 flex-wrap">
        <div className="flex gap-x-8 items-center p-5 bg-white border border-solid border-[#ced0d5]">
          <div className="bg-orange-500 rounded-full p-4 ring-8 ring-[#e9e8e8] text-white">
            <CurrencyRupeeIcon />
          </div>
          <div className="flex items-center flex-col">
            <span className=" text-sm font-semibold text-[#828997]">
              Total Sales
            </span>
            <h5 className=" font-semibold text-xl">₹ 10,000</h5>
          </div>
        </div>
        <div className="flex gap-x-8 items-center p-5 bg-white border border-solid border-[#ced0d5]">
          <div className="bg-green-500 rounded-full p-4 ring-8 ring-[#e9e8e8] text-white">
            <ShoppingCartIcon />
          </div>
          <div className="flex flex-col">
            <span className=" text-sm font-semibold text-[#828997]">
              Total Orders
            </span>
            <h5 className=" font-semibold text-xl">50</h5>
          </div>
        </div>
        <div className="flex gap-x-8 items-center p-5 bg-white border border-solid border-[#ced0d5]">
          <div className="bg-blue-500 rounded-full p-4 ring-8 ring-[#e9e8e8] text-white">
            <ShoppingBasketIcon />
          </div>
          <div className="flex flex-col">
            <span className=" text-sm font-semibold text-[#828997]">
              Total Products
            </span>
            <h5 className=" font-semibold text-xl">100</h5>
          </div>
        </div>
        <div className="flex gap-x-8 items-center p-5 bg-white border border-solid border-[#ced0d5]">
          <div className="bg-pink-500 rounded-full p-4 ring-8 ring-[#e9e8e8] text-white">
            <PeopleIcon />
          </div>
          <div className="flex flex-col">
            <span className=" text-sm font-semibold text-[#828997]">
              Total Users
            </span>
            <h5 className=" font-semibold text-xl">100</h5>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-20 mt-10">
        <div className="w-full lg:w-[60%] bg-[#fbf8f8] shadow-lg p-3">
          <h4 className="font-semibold text-lg">Sales Statistics</h4>
          <Barchart />
        </div>
        <div className="w-full lg:w-[30%] bg-[#fbf8f8] shadow-lg p-3">
          <h4 className="font-semibold text-lg">Stock Available</h4>
          <Doughtnut />
        </div>
      </div>
      <div className="my-10">
        <h4 className="font-semibold text-lg mb-4">Latest Orders</h4>
        <MyTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminDashboard;
