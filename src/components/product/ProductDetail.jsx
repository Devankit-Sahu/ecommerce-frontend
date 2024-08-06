import React, { useCallback, useState } from "react";
import { Box, Button, Stack, Skeleton } from "@mui/material";
import ProductReviews from "./ProductReviews";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../../redux/api/product-api";
import StarIcon from "@mui/icons-material/Star";

const ProductDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [tab, setTab] = useState("description");
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { data, isLoading, refetch } = useProductDetailsQuery({ productId });

  const changeTabHandler = useCallback((value) => setTab(value), []);

  const addToCartHandler = () => {
    if (user) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemExists = cartItems.find(
        (item) => item.productId === data?.product?._id
      );
      if (itemExists) {
        toast.success("Items already in cart.");
      } else {
        const newItem = {
          productId: data?.product?._id,
          name: data?.product?.name,
          image: data?.product?.images[0].url,
          quantity: 1,
          price: data?.product?.price,
          stock: data?.product?.stock,
          totalPrice: data?.product?.price,
        };
        const updatedCartItems = [...cartItems, newItem];
        dispatch(addItemsToCart(newItem));
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        toast.success("Items added to cart");
      }
    } else {
      toast.success("Please login to add items to cart.");
    }
  };

  return (
    <section className="product-detail min-h-[calc(100vh-80px)] pb-5 px-10 lg:px-20">
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <Box className="flex flex-col md:flex-row">
            <Box className="w-full md:w-1/2 md:h-[500px]">
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
              <div className="my-3 flex items-center gap-2">
                <div className="bg-green-700 text-white px-2 rounded-md flex items-center gap-1 text-[15px]">
                  {data?.totalRatingsDecimal}
                  <StarIcon style={{ fontSize: "15px" }} />
                </div>
                <span>{data?.totalRatings} ratings</span>
              </div>
              <h1 className="my-3 capitalize font-bold">
                category :
                <span className=" font-normal ml-1">
                  {data?.product?.category}
                </span>
              </h1>
              <h1 className="my-3 capitalize font-bold">
                product type :
                <span className=" font-normal ml-1">
                  {data?.product?.productType}
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
              <ProductReviews
                productId={productId}
                reviews={data.reviews}
                refetchProduct={refetch}
              />
            )}
          </Box>
        </>
      )}
    </section>
  );
};

export default ProductDetail;

const ProductSkeleton = () => (
  <Box className="flex flex-col md:flex-row">
    <Box className="w-full md:w-1/2">
      <Skeleton height={"100%"} />
    </Box>
    <Box className="w-full md:w-1/2 p-5">
      {Array(7)
        .fill()
        .map((_, index) => (
          <Skeleton key={index} height={50} />
        ))}
      <Stack direction={"row"} gap={2}>
        {Array(2)
          .fill()
          .map((_, index) => (
            <Skeleton key={index} width={64} height={84} />
          ))}
      </Stack>
    </Box>
  </Box>
);
