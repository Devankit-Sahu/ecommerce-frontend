import React from "react";
import {
  GridView,
  BusinessCenterOutlined,
  FormatListBulletedOutlined,
  PeopleOutlineOutlined,
  ExploreOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
const sidebarListItems = [
  {
    icon: <GridView />,
    name: "DashBoard",
    href: "/admin/dashboard",
  },
  {
    icon: <BusinessCenterOutlined />,
    name: "Products",
    href: "/admin/dashboard/products",
  },
  {
    icon: <FormatListBulletedOutlined />,
    name: "Category",
    href: "/admin/dashboard/category",
  },
  {
    icon: <PeopleOutlineOutlined />,
    name: "Customers",
    href: "/admin/dashboard/users",
  },
  {
    icon: <ExploreOutlined />,
    name: "Orders",
    href: "/admin/dashboard/orders",
  },
];
const AdminSidebar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="h-full pt-5 flex flex-col justify-between">
      <div>
        <h1 className="px-5 py-3 text-center">DashBoard</h1>
        <div>
          {sidebarListItems?.map((item) => (
            <Link key={item.name} to={item.href}>
              <div
                className={`flex gap-3 items-center text-[#878787] py-3 cursor-pointer hover:bg-cyan-400 hover:text-white px-5 border-b-[1px] border-solid border-b-[#e7e7e7] ${
                  pathName === item.href && "bg-cyan-500 text-white"
                }`}
              >
                <span>{item.icon}</span>
                <h2 className="flex-1">{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full">
        <button className="bg-[#198754] w-full px-4 py-3 text-white">
          <LogoutOutlined className="mr-2" />
          LogOut
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
