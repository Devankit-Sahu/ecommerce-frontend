import React from "react";

const MyButton = ({ type = "submit", className = "",onClick, content, ...rest }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};

export default MyButton;
