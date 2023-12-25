import React, { useEffect } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductDetail } from "../../redux/features/product/productDetailAction";
import { addItems } from "../../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import Loader from "../Loader";

const reviews = { href: "#", average: 4, totalCount: 117 };

const ProductDetail = () => {
  const { product, loading } = useSelector((state) => state.productDetail);
  const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  const dispatch = useDispatch();

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
      toast.success("Item added to cart!!!");
    }
  };
  useEffect(() => {
    dispatch(SingleProductDetail(id));
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [dispatch, cartItems, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white">
          {product && (
            <div className="mx-auto max-w-6xl pt-6 grid grid-cols-2 gap-x-3">
              {/* Image gallery */}
              <div className="grid grid-cols-1">
                <div className=" aspect-h-2">
                  <img
                    src={product.images ? product.images[0].url : ""}
                    alt="Model wearing plain black basic tee."
                    className="h-full w-full object-cover object-center "
                  />
                </div>
              </div>
              {/* Product info */}
              <div className="p-10">
                <h1 className="text-2xl tracking-tight text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarBorderOutlinedIcon
                        key={rating}
                        sx={{ color: "black" }}
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
                <p className="text-2xl mt-5 tracking-tight text-gray-900">
                  ${product.price}
                </p>
                <div className="h-8 text-2xl mt-3">
                  <p>
                    Stock :
                    <span
                      className={` text-xl pl-2 ${
                        product.stock < 1 ? " text-red-500" : " text-green-500"
                      }`}
                    >
                      {product.stock < 1
                        ? "OutOfStock"
                        : `InStock ${product.stock}`}
                    </span>
                  </p>
                </div>
                <button
                  disabled={product.stock > 0 ? false : true}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#1976d2] text-white px-8 py-3 text-base font-medium hover:text-black hover:bg-[#51a3f4] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>

                <div className="mt-8">
                  <h3 className="text-x font-black">Description</h3>
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
