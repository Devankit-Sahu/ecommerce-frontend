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
import ShippingFrom from "../components/ShippingFrom";
import { useAddShippingDetailsMutation } from "../redux/api/user-api";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [isShippingDetailsUpdated, setIsShippingDetailsUpdated] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addShippingDetailsMutation] = useAddShippingDetailsMutation();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
    setIsShippingDetailsUpdated(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !(shippingInfo.address1 || shippingInfo.address2) ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.country ||
      !shippingInfo.pincode
    ) {
      toast.error("Please enter all the fields");
      return;
    }
    if (isShippingDetailsUpdated) {
      addShippingDetailsMutation(shippingInfo)
        .unwrap()
        .then(() => {
          localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
          navigate("/payment");
        })
        .catch((error) =>
          toast.error(error?.data?.message || "Internal Server Error")
        );
    } else {
      navigate("/payment");
    }
  };

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      const total = cartItems.reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0);
      setSubTotal(total);
    }
    const storedShippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
    if (storedShippingInfo) {
      setShippingInfo(storedShippingInfo);
    }
  }, [cartItems]);

  return (
    <section className="cart min-h-[calc(100vh-120px)] w-full px-10 2xl:px-20 pb-5">
      {cartItems.length > 0 ? (
        <>
          <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#3d3e3f] border-b border-solid border-b-[#ced0d5] capitalize">
            shopping cart
          </h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full mb-10">
              <thead>
                <tr>
                  <th className="p-2 text-zinc-500 text-left">Product</th>
                  <th className="p-2 text-zinc-500 text-left">Quantity</th>
                  <th className="p-2 text-zinc-500 text-left">Price</th>
                  <th className="p-2 text-zinc-500 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr key={item.productId}>
                    <td className="p-2 text-left flex gap-3">
                      <img
                        src={item.image}
                        alt="product-preview"
                        className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16"
                      />
                      <div>
                        <h1 className="font-semibold capitalize text-xs sm:text-sm md:text-xl w-10 sm:w-16 md:w-[160px] lg:w-[220px] text-ellipsis overflow-hidden whitespace-nowrap">
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
                    <td className="p-2 text-left">
                      <div>
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
                    <td className="p-2 text-left">₹ {item.price}</td>
                    <td className="p-2 text-left">₹ {item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={submitHandler} noValidate>
            <div className="bg-gray-200  px-5 pb-5 w-full md:w-1/2">
              <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#3d3e3f] border-b border-solid border-b-[#ced0d5] capitalize">
                order summary
              </h2>
              <div className="flex justify-between items-center my-2 capitalize">
                <h1 className="text-black font-semibold">items</h1>
                <h2>{cartItems.length}</h2>
              </div>
              <div className="flex justify-between items-center my- py-3 capitalize border-t border-solid border-[#ced0d5]">
                <h1 className="text-black font-semibold capitalize">
                  subtotal
                </h1>
                <h2>₹ {subTotal}</h2>
              </div>
            </div>
            <h1 className="capitalize text-xl font-semibold text-[#3d3e3f] my-3">
              Add shipping details
            </h1>
            <ShippingFrom
              shippingInfo={shippingInfo}
              handleInputChange={handleInputChange}
            />
            <button type="submit" className="capitalize w-full md:w-fit px-3 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded">
              checkout
            </button>
          </form>
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
