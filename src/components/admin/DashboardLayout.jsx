import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
const DashboardLayout = () => {
  return (
    <div className="h-screen w-screen flex bg-[#F5F7FA]">
      <div className="w-72 h-full border-r-[1px] border-solid border-r-[rgb(238,238,238)] bg-white">
        <AdminSidebar />
      </div>
      <div className="w-full h-full">
        <AdminHeader />
        <div className="overflow-y-auto h-[calc(100%-64px)] w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
