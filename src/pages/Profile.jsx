import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="profile h-[calc(100vh-80px)]">
      <div className="max-w-7xl w-full mx-auto px-10 md:px-20">
        <h1 className="capitalize text-xl font-semibold text-pink-600 mb-3">
          personal details
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-1/2 flex items-center justify-center">
            <Avatar src={user?.avatar?.url} sx={{ width: 240, height: 240 }} />
          </div>
          <div className="w-1/2">
            <h1 className="text-center md:text-start">
              Name : <span>{user.name}</span>
            </h1>
            <h1 className="text-center md:text-start">
              Email : <span>{user.email}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
