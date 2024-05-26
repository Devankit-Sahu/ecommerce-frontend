import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      navigate(`/search/${key}`);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="sm:w-[300px] lg:w-[600px] flex border-[1px] border-solid border-[rgb(239,239,239)] h-[44px]"
    >
      <input
        type="text"
        value={key}
        className="w-full h-full outline-none border-none placeholder:text-[#333232] px-3"
        onChange={(e) => setKey(e.target.value)}
        placeholder="Search products..."
      />

      <button
        type="submit"
        className="bg-[rgba(1,159,127,1)] w-[50px] md:w-[100px] text-white"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default Search;
