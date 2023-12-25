import { createSlice } from "@reduxjs/toolkit";
import { getAllProductsAction } from "./allProductsAction";

const initialState = {
  loading: false,
  products: [],
  error: null,
  totalPage: 0,
  filteredProductsCount:0,
  productPerPage:0  
};

const allProductsSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProductsAction.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.products = payload.products;
      state.totalPage = payload.totalPage;
      state.filteredProductsCount = payload.filteredProductsCount;
      state.productPerPage = payload.productPerPage;
    });
    builder.addCase(getAllProductsAction.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default allProductsSlice.reducer;
