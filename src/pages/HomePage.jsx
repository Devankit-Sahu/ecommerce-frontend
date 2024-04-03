import React, { useState } from "react";
import { Box, Drawer, Stack, Tooltip } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import ProductFilter from "../components/product/ProductFilter";
import AllProducts from "../components/product/AllProducts";

const allCategories = [
  {
    _id: 1,
    categoryName: "laptop",
  },
  {
    _id: 2,
    categoryName: "mobile",
  },
  {
    _id: 3,
    categoryName: "watches",
  },
  {
    _id: 4,
    categoryName: "earbuds",
  },
  {
    _id: 5,
    categoryName: "accessories",
  },
];

const HomePage = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [categories, setCategories] = useState([]);
  const openDrawerHandler = () => {
    setIsOpenDrawer(true);
  };
  const closeDrawerHandler = () => {
    setIsOpenDrawer(false);
  };
  return (
    <Stack direction={"row"} className="h-[calc(100%-90px)] relative">
      <Box className="hidden lg:block w-[350px] bg-white p-3">
        <ProductFilter
          price={price}
          setPrice={setPrice}
          categories={categories}
          setCategories={setCategories}
          allCategories={allCategories}
        />
      </Box>
      <button
        onClick={openDrawerHandler}
        className="absolute top-1/2 bg-white px-1 py-2 cursor-pointer lg:hidden"
      >
        <Tooltip title="Toggle Filter">
          <ChevronRightIcon />
        </Tooltip>
      </button>
      {/* for mobile screen */}
      <Drawer
        className="block lg:hidden"
        open={isOpenDrawer}
        onClose={closeDrawerHandler}
      >
        <Box className="w-[350px] bg-white p-3">
          <ProductFilter
            price={price}
            setPrice={setPrice}
            categories={categories}
            setCategories={setCategories}
            allCategories={allCategories}
          />
        </Box>
      </Drawer>
      <Box
        height={"100%"}
        className="overflow-y-auto bg-slate-100"
        width={"100%"}
        padding={5}
      >
        <AllProducts />
      </Box>
    </Stack>
  );
};

export default HomePage;
