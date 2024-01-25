import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Loader} from "../components";

const Profile = () => {
  // const { user, loading } = useSelector((state) => state.auth);

  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/profile/update");
  // };

  return (
    <>
      {/* {loading ? (
        <div className="h-[901vh] flex justify-center items-center">
          <Loader content={"Fetching user please wait for while"} />
        </div>
      ) : (
        <div className=" max-w-7xl mx-auto h-[90vh]">
          <div className="grid grid-cols-2 h-full">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="h-[400px] w-[400px]">
                <img
                  src={user ? user.avatar.url : "./profile.png"}
                  alt="user"
                  className="w-full h-full object-cover rounded-[50%]"
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
                    {user && String(user.createdAt).substring(0.1)}
                  </span>
                </div>
              </div>
              <div>
                <button
                  // disabled={product.stock > 0 ? false : true}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleClick}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
     
    </>
  );
};

export default Profile;
