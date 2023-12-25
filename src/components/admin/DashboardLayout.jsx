import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
const DashboardLayout = () => {
  return (
    <div className=" min-h-screen">
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
