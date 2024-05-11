import React from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import AllProducts from "../components/product/AllProducts";
import { useGetProductsQuery } from "../redux/api/product-api";

const HomePage = () => {
  const { data, isLoading } = useGetProductsQuery("");

  return (
    <Stack direction={"row"} className="h-[calc(100%-90px)] relative">
      {isLoading ? (
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-slate-100 p-5 w-full">
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((s, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              animation="wave"
              height={308}
              width={"100%"}
            />
          ))}
        </Box>
      ) : (
        <Box
          minHeight={"100%"}
          className="bg-slate-100"
          width={"100%"}
          padding={5}
        >
          <AllProducts products={data.products} />
        </Box>
      )}
    </Stack>
  );
};

export default HomePage;
