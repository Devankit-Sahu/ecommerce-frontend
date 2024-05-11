import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemsFromCart,
} from "../redux/features/cart/cartSlice";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increaseQuantity = function (item) {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= item.stock) {
      dispatch(
        increaseItemQuantity({ productId: item.productId, newQuantity })
      );
    }
  };

  const decreaseQuantity = function (item) {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      dispatch(
        decreaseItemQuantity({ productId: item.productId, newQuantity })
      );
    }
  };

  const removeItemsFromCartHandler = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.success("Item removed from cart");
  };

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0);
      setSubTotal(total);
    }
  }, [cartItems.length]);

  return (
    <section className="min-h-[calc(100%-120px)] w-full px-10 2xl:px-20">
      {cartItems.length > 0 ? (
        <>
          <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#3d3e3f] border-b border-solid border-b-[#ced0d5] capitalize">
            shopping cart
          </h2>
          <Box className="block lg:flex">
            <Box className="w-full lg:w-[70%]">
              <table className="w-full mb-10">
                <thead>
                  <tr className="text-left">
                    <th className="p-2 text-zinc-500">Product</th>
                    <th className="p-2 text-zinc-500">Quantity</th>
                    <th className="p-2 text-zinc-500">Price</th>
                    <th className="p-2 text-zinc-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item.productId}>
                      <td className="p-2 flex gap-3">
                        <img
                          src={item.image}
                          alt="product-preview"
                          className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16"
                        />
                        <div>
                          <h1 className="font-semibold capitalize text-xs sm:text-sm md:text-xl w-20 sm:w-[120px] md:w-[160px] lg:w-[220px] text-ellipsis overflow-hidden whitespace-nowrap">
                            {item.name}
                          </h1>
                          <button
                            onClick={() =>
                              removeItemsFromCartHandler(item.productId)
                            }
                            className="text-zinc-500 capitalize font-semibold text-xs"
                          >
                            remove
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="ml-3">
                          <div className="w-20 md:w-[100px] h-8 mt-2 flex border-[1px] border-solid border-zinc-400 rounded-md">
                            <button
                              onClick={() => decreaseQuantity(item)}
                              className="w-[34%] border-r-[1px] border-solid border-zinc-400"
                            >
                              -
                            </button>
                            <span className="w-8 h-full outline-none flex items-center justify-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item)}
                              className="w-[34%] border-l-[1px] border-solid border-zinc-400"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">₹ {item.price}</td>
                      <td className="p-2">₹ {item.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
            <Box className="w-full lg:w-[30%]">
              <Box className="bg-gray-200  px-5 pb-5">
                <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#3d3e3f] border-b border-solid border-b-[#ced0d5] capitalize">
                  order summary
                </h2>
                <div className="flex justify-between items-center my-2 capitalize">
                  <h1 className="text-black font-semibold">items</h1>
                  <h2>{cartItems.length}</h2>
                </div>
                {/* <div className="flex justify-between items-center my-2 capitalize">
                  <h1 className="text-black font-semibold">subtotal</h1>
                  <h2>₹ {subTotal}</h2>
                </div> */}
                {/* <div className="flex justify-between items-center my-2 capitalize">
                  <h1 className="text-black font-semibold">discount</h1>
                  <h2>10%</h2>
                </div> */}
                {/* <div className="flex justify-between items-center my-2 capitalize">
                  <h1 className="text-black font-semibold">shipping</h1>
                  <h2>free</h2>
                </div> */}
                <div className="flex justify-between items-center my- py-3 capitalize border-t border-solid border-[#ced0d5]">
                  <h1 className="text-black font-semibold capitalize">
                    subtotal
                  </h1>
                  <h2>₹ {subTotal}</h2>
                </div>
                <button
                  onClick={() => {
                    navigate("/shipping");
                  }}
                  className="bg-emerald-600 text-white w-full py-3 capitalize"
                >
                  checkout
                </button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box className="my-10 text-center capitalize font-bold text-4xl">
          No items in cart
        </Box>
      )}
      <Box className="flex justify-center my-6">
        <Link to="/" className="text-blue-500">
          <KeyboardBackspaceIcon />
          Continue shopping
        </Link>
      </Box>
    </section>
  );
};

export default CartPage;
