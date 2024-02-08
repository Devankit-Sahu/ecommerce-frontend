import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductDetailAction } from "../../redux/api/product-api";
import { addItems } from "../../redux/features/cart/cartSlice";
import Loader from "../Loader";
import ProductReviews from "./ProductReviews";
import { Button, Rating } from "@mui/material";

const reviews = { href: "#", average: 4, totalCount: 117 };

const ProductDetail = () => {
  const { product, loading } = useSelector((state) => state.productDetail);
  const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tabSelected, setTabSelected] = useState("description");
  const tabHandler = (tab) => {
    if (tab === "description") setTabSelected("description");
    else setTabSelected("reviews");
  };

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(
        addItems({
          cartItemId: product._id,
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          image: product.images[0].url,
          stock: product.stock,
          seller: product.seller,
          quantity: 1,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(SingleProductDetailAction(id));
  }, [dispatch]);
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItem", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  return (
    <>
      <div className="container mx-auto px-5 2xl:px-40 mt-5 mb-20">
        <div className=" grid grid-cols-2 gap-x-3">
          <div className="h-[30rem] w-full">
            {product && product?.images && (
              <img
                src={product?.images[0]?.url}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="w-full pl-10">
            <h1 className="text-5xl font-semibold font-serif capitalize mb-5">
              {product?.name}
            </h1>
            <div className="flex gap-10 mb-5">
              <span>
                <Rating />
              </span>
              <h3>15 reviews</h3>
            </div>
            <h2 className="text-2xl text-red-500 mb-5">₹ {product?.price}</h2>
            <Button
              onClick={addToCartHandler}
              sx={{
                backgroundColor: "blueviolet",
                color: "white",
                ":hover": { backgroundColor: "#8f2fe8" },
              }}
            >
              add to cart
            </Button>
            <div className="flex flex-wrap gap-5 mt-10">
              {product?.images?.map((item) => (
                <img
                  key={item._id}
                  src={item?.url}
                  alt="product-preview"
                  className="w-20 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 container mx-auto px-10 2xl:px-40 py-5">
        <div className="flex justify-center gap-4 mb-5">
          <button
            onClick={() => {
              tabHandler("description");
            }}
            className={`text-zinc-700 capitalize px-5 font-semibold text-xl ${
              tabSelected === "description" &&
              "border-b-[6px] border-solid border-b-blue-500 rounded-2xl"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => {
              tabHandler("reviews");
            }}
            className={`text-zinc-700 capitalize px-5 font-semibold text-xl ${
              tabSelected === "reviews" &&
              "border-b-[6px] border-solid border-b-blue-500 rounded-2xl"
            }`}
          >
            reviews
          </button>
        </div>
        <div
          className={`description-wrapper ${
            tabSelected === "description" ? "block" : "hidden"
          }`}
        >
          {product?.description}
        </div>
        <div
          className={`review-wrapper ${
            tabSelected === "reviews" ? "block" : "hidden"
          }`}
        >
          <ProductReviews />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
