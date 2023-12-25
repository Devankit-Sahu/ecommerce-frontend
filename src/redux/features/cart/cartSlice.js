import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItems(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.cartItemId === item.cartItemId
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.cartItemId === isItemExist.cartItemId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    removeItems(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.cartItemId !== action.payload
        ),
      };
    },
  },
});

export const { addItems, removeItems } = cartSlice.actions;
export default cartSlice.reducer;
