import React from "react";
import {
  GridView,
  BusinessCenterOutlined,
  FormatListBulletedOutlined,
  PeopleOutlineOutlined,
  ExploreOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

const sidebarListItems = [
  {
    icon: <GridView />,
    name: "DashBoard",
  },
  {
    icon: <BusinessCenterOutlined />,
    name: "Products",
  },
  {
    icon: <FormatListBulletedOutlined />,
    name: "Category",
  },
  {
    icon: <PeopleOutlineOutlined />,
    name: "Customers",
  },
  {
    icon: <ExploreOutlined />,
    name: "Orders",
  },
];
const AdminSidebar = () => {
  return (
    <div className="h-full pt-5 flex flex-col justify-between">
      <div>
        <h1 className="px-5 py-3 text-center">DashBoard</h1>
        <div className="">
          {sidebarListItems?.map((item) => (
            <div
              key={item.name}
              className="flex gap-3 items-center text-[#878787] py-3 cursor-pointer hover:bg-[skyblue] hover:text-[black] px-5"
            >
              <span>{item.icon}</span>
              <h2 className="flex-1">{item.name}</h2>
            </div>
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
