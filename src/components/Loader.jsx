import React from "react";
// import { TailSpin } from "react-loader-spinner";
const Loader = ({
  content = "",
  height = 150,
  width = 150,
  color = "rgb(0 0 0)",
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <TailSpin
        height={height}
        width={width}
        color={color}
        ariaLabel="tail-spin-loading"
        visible={true}
      /> */}
      <p
        className={`mt-6 text-2xl font-semibold ${
          content ? "visible" : "hidden"
        }`}
      >
        {content}
      </p>
    </div>
  );
};

export default Loader;
