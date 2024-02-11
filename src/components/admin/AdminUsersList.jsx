import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../redux/api/admin-api";
import Loader from "../Loader";
import { MyButton, MyTable } from "..";
import { userColumns } from "../../constants/constant";

const AdminUsersList = () => {
  const { users, loading } = useSelector((state) => state.allUsersAdmin);
  const dispatch = useDispatch();
  const data = users?.map((user) => ({
    photo: user.avatar.url,
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    // action: (
    //   <div className="flex gap-x-3 flex-1">
    //     <Link to={`/admin/user/edit/${user._id}`}>
    //       <MyButton
    //         type="submit"
    //         className="bg-[#2dadcf] hover:bg-[#56b0c8] p-2 rounded-md text-white active:scale-[.9] shadow-3xl"
    //         content="See"
    //       />
    //     </Link>
    //     <MyButton
    //       className="bg-red-600 hover:bg-[#da2b2b] p-2 rounded-md text-white active:scale-[.9] shadow-3xl"
    //       type="submit"
    //       content="Delete"
    //     />
    //   </div>
    // ),
  }));

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  return (
    <>
      {/* {loading ? (
        <div className="h-[90vh] flex items-center justify-center">
          <Loader content={"Fetching users please wait..."} />
        </div>
      ) : ( */}
      <div className="w-full px-10">
        <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#8f9297] border-b border-b-[#ced0d5] capitalize">
          users
        </h2>
        <MyTable columns={userColumns} data={data} />
      </div>
      {/* )} */}
    </>
  );
};

export default AdminUsersList;
