import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cart/cartSlice";
import productApi from "./api/product-api";
import userApi from "./api/user-api";
import categoryApi from "./api/category-api";
import orderApi from "./api/order-api";
import utilsSlice from "./features/utilSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [utilsSlice.name]: utilsSlice.reducer,
  },
  middleware: (defaultMiddleWare) => [
    ...defaultMiddleWare(),
    productApi.middleware,
    userApi.middleware,
    categoryApi.middleware,
    orderApi.middleware,
  ],
});

export default store;
