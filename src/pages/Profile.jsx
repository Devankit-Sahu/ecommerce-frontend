import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="bg-white h-[calc(100%-15px)]">
      <div className="flex flex-col md:flex-row h-full items-center">
        <div className="w-1/2 flex items-center justify-center">
          <Avatar src={user?.avatar?.url} sx={{ width: 240, height: 240 }} />
        </div>
        <div className="w-1/2">
          <h1>
            Name : <span>{user.name}</span>
          </h1>
          <h1>
            Email : <span>{user.email}</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Profile;
