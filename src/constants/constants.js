import {
  GridView,
  BusinessCenterOutlined,
  FormatListBulletedOutlined,
  PeopleOutlineOutlined,
  ExploreOutlined,
} from "@mui/icons-material";

export const productColumns = [
  {
    Header: "Product Id",
    accessor: "product_id",
  },
  {
    Header: "Product Image",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

export const orderColumns = [
  {
    Header: "Order Id",
    accessor: "order_id",
  },
  {
    Header: "Image",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Total Price",
    accessor: "totalPrice",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

export const userColumns = [
  {
    Header: "Avatar",
    accessor: "photo",
  },
  {
    Header: "User Id",
    accessor: "user_id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
];

export const sidebarListItems = [
  {
    icon: GridView,
    name: "DashBoard",
    href: "/admin/dashboard",
  },
  {
    icon: BusinessCenterOutlined,
    name: "Products",
    href: "/admin/products",
  },
  {
    icon: PeopleOutlineOutlined,
    name: "Customers",
    href: "/admin/users",
  },
  {
    icon: ExploreOutlined,
    name: "Orders",
    href: "/admin/orders",
  },
  {
    icon: FormatListBulletedOutlined,
    name: "Category",
    href: "/admin/category",
  },
];

export const orderStatus = ["processing", "shipped", "delivered"];

export const latestOdersColumns = [
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
];

export const cartColumns = [
  {
    Header: "Product",
    accessor: "product",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Total",
    accessor: "total",
  },
];
