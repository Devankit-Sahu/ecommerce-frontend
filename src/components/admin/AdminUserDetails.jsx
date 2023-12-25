import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction } from "../../redux/features/admin/userActions";
import { Avatar } from "@mui/material";
import Loader from "../../components/Loader";
const AdminUserDetails = () => {
  const {user,loading} = useSelector((state) => state.userDetailsAdmin);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDetailsAction(id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="h-[90vh] flex items-center justify-center">
          <Loader content={"Fetching details please wait..."} />
        </div>
      ) : (
        <div className=" max-w-7xl mx-auto h-[90vh]">
          <div className="grid grid-cols-2 h-full">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="h-[400px] w-[400px]">
                <Avatar
                  src={user ? user.avatar.url : "./profile.png"}
                  sx={{ width: "400px", height: "400px" }}
                />
              </div>
            </div>
            <div className="h-full flex flex-col items-center justify-center">
              <div className="flex flex-col gap-6">
                <div className=" border-b border-b-gray-500">
                  <p className=" font-bold text-xl mb-1">Name:</p>
                  <span className=" font-normal mb-2">{user && user.name}</span>
                </div>
                <div className=" border-b border-b-gray-500">
                  <p className=" font-bold text-xl mb-1">Email: </p>
                  <span className=" font-normal mb-2 border-b-[1px] border-b-gray-50">
                    {user && user.email}
                  </span>
                </div>
                <div className=" border-b border-b-gray-500">
                  <p className=" font-bold text-xl mb-1">Joined On: </p>
                  <span className=" font-normal mb-2 border-b-[1px] border-b-gray-50">
                    {user && String(user.createdAt).substring(0, 10)}
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserDetails;
