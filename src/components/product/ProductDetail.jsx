import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ProductReviews from "./ProductReviews";

const ProductDetail = () => {
  const [tab, setTab] = useState("description");
  const changeTabHandler = (value) => {
    if (value === "description") setTab("description");
    else setTab("reviews");
  };
  return (
    <Box className="bg-slate-100 min-h-full px-20 lg:px-40">
      <Box className="flex flex-col md:flex-row">
        <Box className="w-full md:w-1/2 h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full md:w-full h-full object-contain"
          />
        </Box>
        <Box className="w-full md:w-1/2 p-5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Fold Over Collar Plain Blazers
          </h1>
          <h1 className="my-3">ratings</h1>
          <h1 className="my-3 capitalize font-bold">
            category : <span className=" font-normal">Jacket</span>
          </h1>
          <h1 className="my-3 capitalize font-bold">
            price : <span className=" font-normal">$200</span>
          </h1>
          <h1 className="my-3 capitalize font-bold">
            sold by : <span className=" font-normal">Wnfdite</span>
          </h1>
          <button className="w-full bg-[rgba(1,159,127,1)] text-white px-10 py-2 rounded capitalize my-6">
            add to cart
          </button>
          <Stack direction={"row"} gap={2}>
            <Box className="w-16">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full h-full object-contain"
              />
            </Box>
            <Box className="w-16 bg-red-300">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full h-full object-contain"
              />
            </Box>
          </Stack>
        </Box>
      </Box>
      <Stack gap={3} direction={"row"} marginTop={6} marginBottom={4}>
        <Button
          variant={tab === "description" ? "contained" : "outlined"}
          onClick={() => changeTabHandler("description")}
        >
          Description
        </Button>
        <Button
          variant={tab === "reviews" ? "contained" : "outlined"}
          onClick={() => changeTabHandler("reviews")}
        >
          Reviews
        </Button>
      </Stack>
      <Box>
        {tab === "description" ? (
          <>
            <Box>description</Box>
          </>
        ) : (
          <ProductReviews />
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
