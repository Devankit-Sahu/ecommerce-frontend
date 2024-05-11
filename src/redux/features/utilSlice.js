import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isPaymentCompleted: false,
};

const utilsSlice = createSlice({
  name: "utils",
  initialState: initialState,
  reducers: {
    setIsPaymentCompleted(state, action) {
      state.isPaymentCompleted = action.payload;
    },
  },
});

export const { setIsPaymentCompleted } = utilsSlice.actions;

export default utilsSlice;
