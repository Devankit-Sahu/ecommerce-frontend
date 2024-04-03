import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   decreaseItemQuantity,
//   increaseItemQuantity,
//   removeItems,
// } from "../redux/features/cart/cartSlice";
// import { toast } from "react-hot-toast";

const CartPage = () => {
  // const { cartItems } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const removeItemsFromCartHandler = (id) => {
    // dispatch(removeItems(id));
    // toast.success("Item removed from cart", { position: "top-center" });
  };

  const decreaseQuantity = function (item) {
    // const newQuantity = item.quantity - 1;
    // if (newQuantity > 0) {
    //   dispatch(
    //     decreaseItemQuantity({ cartItemId: item.cartItemId, newQuantity })
    //   );
    // }
  };

  const increaseQuantity = function (item) {
    // const newQuantity = item.quantity + 1;
    // if (newQuantity <= item.stock) {
    //   dispatch(
    //     increaseItemQuantity({ cartItemId: item.cartItemId, newQuantity })
    //   );
    // }
  };

  // useEffect(() => {
  //   if (cartItems) {
  //     localStorage.setItem("cartItem", JSON.stringify(cartItems));
  //   }
  // }, [cartItems]);

  // useEffect(() => {
  //   if (cartItems.length > 0) {
  //     const total = cartItems.reduce((acc, item) => {
  //       return acc + item.totalPrice;
  //     }, 0);
  //     setSubTotal(total);
  //   } else {
  //     setSubTotal(0);
  //   }
  // }, [cartItems]);

  const cartItems = [
    {
      cartItemId: 1,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fold Over Collar Plain Blazers",
      price: 1200,
      quantity: 2,
      totalPrice: 1200,
    },
  ];

  return (
    <section className="min-h-screen w-full container mx-auto px-10 2xl:px">
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
                    <tr key={item.cartItemId}>
                      <td className="p-2 flex gap-3">
                        <img
                          src={item.image}
                          alt="product-preview"
                          className="w-16 h-16"
                        />
                        <div>
                          <h1 className="font-semibold capitalize text-xs sm:text-sm md:text-xl mb-3">
                            {item.name}
                          </h1>
                          <button
                            onClick={() =>
                              removeItemsFromCartHandler(item.cartItemId)
                            }
                            className="text-zinc-500 capitalize font-semibold"
                          >
                            remove
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="ml-3">
                          <div className="w-[100px] h-8 mt-2 flex border-[1px] border-solid border-zinc-400 rounded-md">
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
                <div className="flex justify-between items-center my-2 capitalize">
                  <h1 className="text-black font-semibold">subtotal</h1>
                  <h2>₹ {subTotal}</h2>
                </div>
                <div className="flex justify-between items-center my-2 capitalize">
                  <h1 className="text-black font-semibold">discount</h1>
                  <h2>10%</h2>
                </div>
                <div className="flex justify-between items-center my-2 capitalize">
                  <h1 className="text-black font-semibold">shipping</h1>
                  <h2>free</h2>
                </div>
                <div className="flex justify-between items-center my- py-3 capitalize border-t border-solid border-[#ced0d5]">
                  <h1 className="text-black font-semibold">total amount</h1>
                  <h2>₹ 1000</h2>
                </div>
                <button
                  onClick={() => {
                    navigate("/");
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
      <Box className="flex justify-center mt-6">
        <Link to="/" className="text-blue-500">
          <KeyboardBackspaceIcon />
          Continue shopping
        </Link>
      </Box>
    </section>
  );
};

export default CartPage;
