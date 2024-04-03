import React,{useState,useEffect} from "react";
import {Loader} from "../components";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { loadUser } from "../redux/features/auth/authAction";
import { updateProfileReset } from "../redux/features/profile/updateProfileSlice";
import { updateUser } from "../redux/features/profile/updateProfileAction";

const UpdateProfile = () => {
  // const { user } = useSelector((state) => state.auth);
  // const {loading,isUpdated} = useSelector((state)=>state.updateProfile);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState("");
  // const [avatarPreview, setAvatarPreview] = useState("");

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const updateprofileSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(updateUser({name,email,avatar}));
  // };
  // const updateprofileDataChange = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvatarPreview(reader.result);
  //       setAvatar(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // useEffect(() => {
  //   if(user){
  //     setName(user.name);
  //     setEmail(user.email);
  //     setAvatarPreview(user.avatar.url);
  //     // setAvatar(user.avatar.url);
  //   }
  //   if (isUpdated) {
  //     toast.success("Profile updated successfully !!!");
  //     // dispatch(loadUser());
  //     navigate("/user/profile");
  //     dispatch(updateProfileReset());
  //   }
  // }, [isUpdated, navigate,user,dispatch]);
  return (
    <>
      {/* {loading ? (
        <Loader />
      ) 
      : 
      ( */}
        <div className="min-h-[90vh] px-6 py-12 lg:px-8">
          <div className="flex flex-col justify-center rounded-3xl shadow-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-4 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="pb-3 mb-5 border-b border-b-gray-500 capitalize text-center text-2xl leading-9 tracking-tight text-gray-500">
                update profile
              </h2>
            </div>
            <form
              className="space-y-6"
              // onSubmit={updateprofileSubmit}
              noValidate
              encType="multipart/form-data"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none px-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none px-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  // src={avatarPreview}
                  alt="avatarPreview"
                  className="w-[60px] h-[55px] rounded-[50%]"
                />
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="block w-full py-1.5 sm:leading-6 file:w-full file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:border-none file:p-3 file:rounded-full file:text-white file:cursor-pointer"
                  // onChange={updateprofileDataChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      {/* )} */}
      {/* <div className="min-h-[90vh] px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-center rounded-3xl shadow-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-4 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="pb-3 mb-5 border-b border-b-gray-500 capitalize text-center text-2xl leading-9 tracking-tight text-gray-500">
              update profile
            </h2>
          </div>
          <form
            className="space-y-6"
            onSubmit={updateprofileSubmit}
            noValidate
            encType="multipart/form-data"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none px-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none px-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={avatarPreview}
                alt="avatarPreview"
                className="w-[60px] h-[55px] rounded-[50%]"
              />
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="block w-full py-1.5 sm:leading-6 file:w-full file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:border-none file:p-3 file:rounded-full file:text-white file:cursor-pointer"
                // onChange={updateprofileDataChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default UpdateProfile;
