import { createSlice } from "@reduxjs/toolkit";
import { SingleProductDetail } from "./productDetailAction";

const initialState = {
  loading: false,
  product: {},
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SingleProductDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(SingleProductDetail.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    });
    builder.addCase(SingleProductDetail.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default productDetailSlice.reducer;
