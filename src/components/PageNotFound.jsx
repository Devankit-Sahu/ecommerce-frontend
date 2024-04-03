import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img src="/not-found.svg" alt="" className="h-96 w-full" />
      <div className="md:text-2xl text-center font-bold mt-10">
        Unfortunately, the page you are looking for not found
      </div>
      <button
        className="mt-10 rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
