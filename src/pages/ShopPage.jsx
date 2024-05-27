import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Skeleton,
  Tooltip,
  Drawer,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import ProductFilter from "../components/product/ProductFilter";
import AllProducts from "../components/product/AllProducts";
import { useGetProductsQuery } from "../redux/api/product-api";
import PaginationComp from "../components/pagination/PaginationComp";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "../redux/api/category-api";

const ShopPage = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const { key } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    key,
    price,
    page,
    category: categories,
  });
  const isSmallScreen = useMediaQuery("(max-width: 425px)");
  const { data: categoriesData } = useGetCategoriesQuery();

  const openDrawerHandler = () => {
    setIsOpenDrawer(true);
  };

  const closeDrawerHandler = () => {
    setIsOpenDrawer(false);
  };

  useEffect(() => {
    if (isError) toast.error(error?.data?.message || "Internal Server Error");
  }, [isError]);

  return (
    <section className="flex relative min-h-[calc(100vh-75px)]">
      <Box className="hidden md:block w-[350px] bg-white p-3">
        <ProductFilter
          price={price}
          setPrice={setPrice}
          categories={categories}
          setCategories={setCategories}
          allCategories={categoriesData?.allCategories}
        />
      </Box>
      <button
        onClick={openDrawerHandler}
        className="fixed top-1/2 bg-white px-1 py-2 cursor-pointer md:hidden"
      >
        <Tooltip title="Toggle Filter">
          <ChevronRightIcon />
        </Tooltip>
      </button>
      {/* for mobile screen */}
      <Drawer
        className="block md:hidden"
        open={isOpenDrawer}
        onClose={closeDrawerHandler}
        PaperProps={{
          sx: {
            width: isSmallScreen ? "100%" : "350px",
          },
        }}
      >
        <Box className=" bg-white h-full p-3">
          <ProductFilter
            price={price}
            setPrice={setPrice}
            categories={categories}
            setCategories={setCategories}
            allCategories={categoriesData?.allCategories}
            closeHandler={closeDrawerHandler}
          />
        </Box>
      </Drawer>
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
          height={"100%"}
          className="overflow-y-auto bg-slate-100"
          width={"100%"}
          padding={5}
        >
          {data?.products?.length > 0 ? (
            <>
              <AllProducts products={data.products} />
              <PaginationComp
                page={page}
                setPage={setPage}
                productsCount={data?.productsCount}
                productPerPage={data?.productPerPage}
                totalPages={data?.totalPages}
              />
            </>
          ) : (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              className="h-[calc(100vh-160px)]"
              gap={3}
            >
              <p className="text-xl sm:text-5xl">No results found</p>
              <Button onClick={() => navigate("/shop")} variant="contained">
                go to shop
              </Button>
            </Stack>
          )}
        </Box>
      )}
    </section>
  );
};

export default ShopPage;
