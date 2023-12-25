import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      navigate(`/products/${key}`);
      setKey("");
    }
  };
  return (
    <div className=" flex-[.5] border border-gray-500 relative">
      <form onSubmit={submitHandler} className="w-full h-12">
        <input
          type="text"
          value={key}
          className="w-full h-full outline-none border-none placeholder:text-[#333232] pl-3 pr-12"
          onChange={(e) => setKey(e.target.value)}
          placeholder="Search products..."
        />

        <button
          type="submit"
          className="absolute top-[10px] right-[5px] cursor-pointer"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Search;
