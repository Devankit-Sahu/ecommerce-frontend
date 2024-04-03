import { Box } from "@mui/system";
import MyTable from "../table/MyTable";
import { userColumns } from "../../data/data";
import { Link } from "react-router-dom";

const AdminUsersList = () => {
  const users = [
    {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      _id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
    },
  ];
  const data = users?.map((user) => ({
    photo: user.url,
    user_id: user._id,
    name: user.name,
    email: user.email,
    action: <Link to={`/admin/user/${user._id}`}>See</Link>,
  }));

  return (
    <Box className="bg-white p-5">
      <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
        users
      </h2>
      <MyTable columns={userColumns} data={data} />
    </Box>
  );
};

export default AdminUsersList;
