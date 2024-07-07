import { Box, Stack } from "@mui/material";
import MyTable from "../table/MyTable";
import {
  CurrencyRupee as CurrencyRupeeIcon,
  ShoppingBasket as ShoppingBasketIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import SixMonthsSalesBarChart from "../chart/SixMonthsSalesBarChart";
import Doughtnut from "../chart/Doughtnut";
import { useGetDashboardDataQuery } from "../../redux/api/stats-api";
import { getLastMonths, getStatusClass } from "../../utils/utils";
import TopProductsBarChart from "../chart/TopProductsBarChart";
import AdminDashboardLoader from "./AdminDashboardLoader";
import { latestOdersColumns } from "../../constants/constants";

const months = getLastMonths();

const AdminDashboard = () => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();

  const data = dashboardData?.lastOneMonthOrders?.map((order) => ({
    order_id: String(order._id).slice(0, 7),
    name: order.userId.name,
    email: order.userId.email,
    price: "₹" + order.totalPrice,
    status: (
      <span
        className={`${getStatusClass(
          order.orderStatus
        )} capitalize font-medium`}
      >
        {order.orderStatus}
      </span>
    ),
    date: new Date(order.createdAt).toLocaleDateString(),
  }));

  return (
    <Box className="bg-white p-5">
      <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
        DashBoard
      </h2>

      {isLoading ? (
        <AdminDashboardLoader />
      ) : (
        <>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            rowGap={4}
            columnGap={4}
          >
            <div className="flex gap-x-8 items-center p-5 bg-white border border-solid border-[#ced0d5]">
              <div className="bg-orange-500 rounded-full p-4 ring-8 ring-[#e9e8e8] text-white">
                <CurrencyRupeeIcon />
              </div>
              <div className="flex items-center flex-col">
                <span className=" text-sm font-semibold text-[#828997]">
                  Total Sales
                </span>
                <h5 className=" font-semibold text-xl">
                  ₹ {dashboardData?.totalSales}
                </h5>
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
                <h5 className=" font-semibold text-xl">
                  {dashboardData?.totalOrders}
                </h5>
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
                <h5 className=" font-semibold text-xl">
                  {dashboardData?.totalProducts}
                </h5>
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
                <h5 className=" font-semibold text-xl">
                  {dashboardData?.totalUsers}
                </h5>
              </div>
            </div>
          </Stack>
          <div className="flex flex-col md:flex-row gap-2 mt-10">
            <div className="w-full md:w-[50%] bg-[#ffffff] shadow-lg p-3">
              <h4 className="font-semibold text-lg capitalize">
                Last Six Months Sales
              </h4>
              <SixMonthsSalesBarChart
                labels={months}
                data_1={dashboardData?.chart?.revenue}
                data_2={dashboardData?.chart?.order}
                title_1="Revenue"
                title_2="Orders"
                bgColor_1="rgb(0, 115, 255)"
                bgColor_2="rgba(53, 162, 235, 0.8)"
              />
            </div>
            <div className="w-full md:w-[50%] bg-[#ffffff] shadow-lg p-3">
              <h4 className="font-semibold text-lg capitalize">
                Top Selling Products
              </h4>
              <TopProductsBarChart
                topFiveProducts={dashboardData?.topFiveProducts}
              />
            </div>
          </div>
          <div className="mt-10">
            <h4 className="font-semibold text-lg capitalize text-center">
              Comparison of Product Stock Status
            </h4>
            <div className="w-[200px] md:w-[400px] mx-auto">
              <Doughtnut
                productsInStock={dashboardData?.chart?.productsInStock}
                productsOutOfStock={dashboardData?.chart?.productsOutOfStock}
              />
            </div>
          </div>
          <div className="my-10">
            <h4 className="font-semibold text-lg mb-4">Latest Orders</h4>
            <MyTable columns={latestOdersColumns} data={data} />
          </div>
        </>
      )}
    </Box>
  );
};

export default AdminDashboard;
