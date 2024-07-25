import { Box } from "@mui/system";
import MyTable from "../table/MyTable";
import { userColumns } from "../../constants/constants";
import { useGetUsersByAdminQuery } from "../../redux/api/user-api";

const AdminUsersList = () => {
  const { data, isLoading } = useGetUsersByAdminQuery();
  const usersData = data?.users?.map((user) => ({
    photo: user.avatar.url,
    user_id: user._id,
    name: user.name,
    email: user.email,
  }));

  return (
    <div className="bg-white p-2 sm:p-5">
      {isLoading ? (
        <div></div>
      ) : (
        <Box className="bg-white p-3 sm:p-5">
          <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
            customers
          </h2>
          <MyTable columns={userColumns} data={usersData} />
        </Box>
      )}
    </div>
  );
};

export default AdminUsersList;
