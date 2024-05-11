import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
      },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemsToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.productId === item.productId
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.productId === isItemExist.productId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    removeItemsFromCart(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.productId !== action.payload
        ),
      };
    },
    increaseItemQuantity(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.productId === action.payload.productId) {
            return {
              ...item,
              quantity: action.payload.newQuantity,
              totalPrice: action.payload.newQuantity * item.price,
            };
          }
          return item;
        }),
      };
    },
    decreaseItemQuantity(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.productId === action.payload.productId) {
            return {
              ...item,
              quantity: action.payload.newQuantity,
              totalPrice: action.payload.newQuantity * item.price,
            };
          }
          return item;
        }),
      };
    },
    addShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
    resetCart(state) {
      state.cartItems = [];
      state.shippingInfo = {
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
      };
    },
  },
});

export const {
  addItemsToCart,
  removeItemsFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  addShippingInfo,
  resetCart,
} = cartSlice.actions;

export default cartSlice;
