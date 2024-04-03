import { createSlice } from "@reduxjs/toolkit";
import {
  SingleProductDetailAction,
  getAllCategoriesAction,
  getAllProductsAction,
  getAllProductsWithQueryAction,
} from "../../api/product-api";

const initialState = {
  loading: false,
  products: [],
  error: null,
  totalPages: 0,
  filteredProductsCount: 0,
  productPerPage: 0,
};

const allProductsWithQuerySlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsWithQueryAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getAllProductsWithQueryAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.products = payload.filteredProducts;
        state.totalPages = payload.totalPages;
        state.filteredProductsCount = payload.filteredProductsCount;
        state.productPerPage = payload.productPerPage;
      }
    );
    builder.addCase(
      getAllProductsWithQueryAction.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const allProductsWithQueryReducer = allProductsWithQuerySlice.reducer;

const allProductsSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProductsAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    });
    builder.addCase(getAllProductsAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const allProductsReducer = allProductsSlice.reducer;

const allCategoriesSlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    error: null,
    allCategories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCategoriesAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allCategories = payload;
    });
    builder.addCase(getAllCategoriesAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const allCategoriesReducer = allCategoriesSlice.reducer;

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SingleProductDetailAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      SingleProductDetailAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.product = payload;
      }
    );
    builder.addCase(
      SingleProductDetailAction.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const productDetailReducer = productDetailSlice.reducer;
