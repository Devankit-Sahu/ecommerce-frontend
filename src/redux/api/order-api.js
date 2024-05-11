import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../config/config";

const orderApi = createApi({
  reducerPath: "order-api",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1/order/` }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "new",
        credentials: "include",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getMyOrders: builder.query({
      query: () => ({ url: "my", credentials: "include" }),
      invalidatesTags: ["Order"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({ url: `${id}`, credentials: "include" }),
      invalidatesTags: ["Order"],
    }),
    getOrdersByAdmin: builder.query({
      query: () => ({ url: "admin/all", credentials: "include" }),
      invalidatesTags: ["Order"],
    }),
    getOrderDetailsByAdmin: builder.query({
      query: (id) => ({ url: `admin/${id}`, credentials: "include" }),
      invalidatesTags: ["Order"],
    }),
    updateOrderByAdmin: builder.mutation({
      query: (id, data) => ({
        url: `admin/${id}`,
        credentials: "include",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export default orderApi;
export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetOrdersByAdminQuery,
  useGetOrderDetailsByAdminQuery,
  useUpdateOrderByAdminMutation,
} = orderApi;
