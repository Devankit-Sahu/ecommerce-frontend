import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { MyButton } from "../components";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const incquantity = (item, quantity, stock) => {
    const newquantity = quantity + 1;
    if (stock <= quantity) return;
    dispatch(
      addItems({
        cartItemId: item.cartItemId,
        name: item.name,
        category: item.category,
        description: item.description,
        image: item.image,
        price: item.price,
        stock: item.stock,
        seller: item.seller,
        quantity: newquantity,
      })
    );
  };
  const decquantity = (item, quantity) => {
    const newquantity = quantity - 1;
    if (quantity <= 1) return;
    dispatch(
      addItems({
        cartItemId: item.cartItemId,
        name: item.name,
        category: item.category,
        description: item.description,
        image: item.image,
        price: item.price,
        stock: item.stock,
        seller: item.seller,
        quantity: newquantity,
      })
    );
  };
  const removeItem = (id) => {
    dispatch(removeItems(id));
    toast.success("Item remove successfully!!!");
  };
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      {cartItems && cartItems.length !== 0 ? (
        <div className="mx-auto max-w-2xl bg-white px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <h2 className="my-4 text-2xl font-bold tracking-tight text-gray-900">
            Cart
          </h2>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.cartItemId} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <div>
                            <h3>
                              <p>{item.name}</p>
                            </h3>
                            <h4 className="text-[#777777] font-medium">
                              <p>
                                Category :{" "}
                                <span className=" font-mono text-black">
                                  {item.category}
                                </span>
                              </p>
                            </h4>
                          </div>
                          <p className="ml-4">${item.price * item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <div className="flex items-center h-8 justify-center w-[120px] border-[1px] border-[#b4b2b2]">
                            <div
                              onClick={() => decquantity(item, item.quantity)}
                              className=" cursor-pointer w-10 flex items-center justify-center h-full text-[#777777] text-[22px] border-r-[1px] border-r-[#b4b2b2]"
                            >
                              -
                            </div>
                            <input
                              className="w-10 text-center font-bold outline-none"
                              type="text"
                              readOnly
                              value={item.quantity}
                            />
                            <div
                              onClick={() =>
                                incquantity(item, item.quantity, item.stock)
                              }
                              className=" cursor-pointer w-10 flex items-center justify-center h-full text-[#777777] text-[22px]  border-l-[1px] border-l-[#b4b2b2]"
                            >
                              +
                            </div>
                          </div>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => removeItem(item.cartItemId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                $
                {cartItems.reduce(
                  (acc, element) => acc + element.quantity * element.price,
                  0
                )}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <MyButton
                content="Checkout"
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              />
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link
                  to="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[90vh] mx-auto max-w-2xl flex justify-center items-center">
          <div className=" flex justify-center items-center w-[100%] flex-col">
            <p className=" text-[20px]">OOPs!!! Your cart is empty...</p>
            <button
              className="mt-2 rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => navigate("/products")}
            >
              Go to shop
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
