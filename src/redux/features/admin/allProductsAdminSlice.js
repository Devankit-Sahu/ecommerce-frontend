import { createSlice } from "@reduxjs/toolkit";
import { getAllProductsAdminAction } from "../../api/admin-api";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

const allProductsAdminSlice = createSlice({
  name: "admin/all",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAdminAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getAllProductsAdminAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.products = payload.products;
      }
    );
    builder.addCase(
      getAllProductsAdminAction.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export default allProductsAdminSlice.reducer;
