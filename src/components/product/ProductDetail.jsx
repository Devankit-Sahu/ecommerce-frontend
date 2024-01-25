import React, { useEffect } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductDetail } from "../../redux/features/product/productDetailAction";
import { addItems } from "../../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import Loader from "../Loader";
import img from "../../laptop2.jpeg";

const reviews = { href: "#", average: 4, totalCount: 117 };

const ProductDetail = () => {
  // const { product, loading } = useSelector((state) => state.productDetail);
  // const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  // const dispatch = useDispatch();

  // const addToCartHandler = () => {
  //   if (product.stock > 0) {
  //     dispatch(
  //       addItems({
  //         cartItemId: product._id,
  //         name: product.name,
  //         category: product.category,
  //         description: product.description,
  //         price: product.price,
  //         image: product.images[0].url,
  //         stock: product.stock,
  //         seller: product.seller,
  //         quantity: 1,
  //       })
  //     );
  //     toast.success("Item added to cart!!!");
  //   }
  // };
  // useEffect(() => {
  //   dispatch(SingleProductDetail(id));
  //   localStorage.setItem("cartItem", JSON.stringify(cartItems));
  // }, [dispatch, cartItems, id]);

  return (
    <div className="container mx-auto px-5 2xl:px-40 mt-5 mb-20">
      <div className=" grid grid-cols-2 gap-x-3">
        <div className="w-full flex gap-x-3">
          <div className="w-20 flex flex-col gap-3">
            <img src={img} className="w-full h-20 cursor-pointer" />
            <img src={img} className="w-full h-20 cursor-pointer" />
            <img src={img} className="w-full h-20 cursor-pointer" />
          </div>
          <div className="h-96">
            <img
              src={img}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full">

        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductDetail;
