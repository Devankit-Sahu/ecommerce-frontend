import React from "react";
import { Box } from "@mui/material";
import {
  GridView,
  BusinessCenterOutlined,
  FormatListBulletedOutlined,
  PeopleOutlineOutlined,
  ExploreOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
const sidebarListItems = [
  {
    icon: <GridView />,
    name: "DashBoard",
    href: "/admin",
  },
  {
    icon: <BusinessCenterOutlined />,
    name: "Products",
    href: "/admin/products",
  },
  {
    icon: <PeopleOutlineOutlined />,
    name: "Customers",
    href: "/admin/users",
  },
  {
    icon: <ExploreOutlined />,
    name: "Orders",
    href: "/admin/orders",
  },
  {
    icon: <FormatListBulletedOutlined />,
    name: "Category",
    href: "/admin/category",
  },
];
const AdminSidebar = () => {
  return (
    <>
      {sidebarListItems?.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            isActive ? "text-[rgba(1,159,127,1)] font-bold" : "text-slate-700"
          }
        >
          <Box className="flex items-center gap-2 px-5 py-3 hover:bg-slate-100">
            <span>{item.icon}</span>
            <h2 className="flex-1">{item.name}</h2>
          </Box>
        </NavLink>
      ))}
    </>
  );
};

export default AdminSidebar;
