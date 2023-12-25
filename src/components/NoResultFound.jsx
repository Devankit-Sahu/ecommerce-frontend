import React from "react";
import { useNavigate } from "react-router-dom";
const NoResultFound = () => {
  const navigate = useNavigate();
  return (
    <div className="md:w-[900px] md:h-[400px] flex flex-col items-center justify-center">
      <p>No resuls found</p>
      <button
        className=" mt-2 rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default NoResultFound;
