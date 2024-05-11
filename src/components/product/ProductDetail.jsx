import React, { useState } from "react";
import { Box, Button, Stack, Skeleton } from "@mui/material";
import ProductReviews from "./ProductReviews";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../../redux/api/product-api";

const ProductDetail = () => {
  const [tab, setTab] = useState("description");
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { data, isLoading } = useProductDetailsQuery({ productId });

  const changeTabHandler = (value) => {
    if (value === "description") setTab("description");
    else setTab("reviews");
  };

  const addToCartHandler = () => {
    dispatch(
      addItemsToCart({
        productId: data?.product?._id,
        name: data?.product?.name,
        image: data?.product?.images[0].url,
        quantity: 1,
        price: data?.product?.price,
        stock: data?.product?.stock,
        totalPrice: data?.product?.price,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify([
        {
          productId: data?.product?._id,
          name: data?.product?.name,
          image: data?.product?.images[0].url,
          quantity: 1,
          price: data?.product?.price,
          stock: data?.product?.stock,
          ...data?.product,
          totalPrice: data?.product?.price,
        },
      ])
    );
    toast.success("Items added to cart");
  };

  return (
    <section className="bg-slate-100 min-h-full px-10 lg:px-20">
      {isLoading ? (
        <Box className="flex flex-col md:flex-row">
          <Box className="w-full md:w-1/2">
            <Skeleton height={"100%"} />
          </Box>
          <Box className="w-full md:w-1/2 p-5">
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Stack direction={"row"} gap={2}>
              <Skeleton width={64} height={84} />
              <Skeleton width={64} height={84} />
            </Stack>
          </Box>
        </Box>
      ) : (
        <>
          <Box className="flex flex-col md:flex-row">
            <Box className="w-full md:w-1/2 h-[500px]">
              <img
                src={data?.product?.images[0].url}
                alt="product preview"
                className="w-full md:w-full h-full object-contain"
              />
            </Box>
            <Box className="w-full md:w-1/2 p-5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold ml-1">
                {data?.product?.name}
              </h1>
              <h1 className="my-3">ratings</h1>
              <h1 className="my-3 capitalize font-bold">
                category :
                <span className=" font-normal ml-1">
                  {data?.product?.category}
                </span>
              </h1>
              <h1 className="my-3 capitalize font-bold">
                price :
                <span className=" font-normal ml-1">
                  ₹ {data?.product?.price}
                </span>
              </h1>
              <h1 className="my-3 capitalize font-bold">
                stock :
                {data?.product?.stock > 0 ? (
                  <span className=" font-normal ml-1">
                    {data?.product?.stock}
                  </span>
                ) : (
                  <span className="text-red-700 line-through text-[15px] font-medium ml-1">
                    out of stock
                  </span>
                )}
              </h1>
              <h1 className="my-3 capitalize font-bold">
                sold by :
                <span className=" font-normal ml-1">
                  {data?.product?.seller}
                </span>
              </h1>
              <button
                onClick={addToCartHandler}
                disabled={data?.product?.stock > 0 ? false : true}
                className="w-full bg-[rgba(1,159,127,1)] text-white px-10 py-2 rounded capitalize my-6"
              >
                add to cart
              </button>
              <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                {data?.product?.images?.map((image, index) => (
                  <Box className="w-16" key={index}>
                    <img
                      src={image.url}
                      alt="product preview"
                      className="w-full h-full object-contain cursor-pointer"
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
          <Stack gap={3} direction={"row"} marginY={4}>
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
          <Box marginY={3}>
            {tab === "description" ? (
              <>
                <Box> {data?.product?.description}</Box>
              </>
            ) : (
              <ProductReviews />
            )}
          </Box>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
