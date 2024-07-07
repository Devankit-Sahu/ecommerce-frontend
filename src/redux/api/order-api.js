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
      providesTags: ["Order"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({ url: `${id}`, credentials: "include" }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    deleteSingleOrder: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        credentials: "include",
        method: "DELETE",
      }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    getOrdersByAdmin: builder.query({
      query: () => ({ url: "admin/all", credentials: "include" }),
      invalidatesTags: ["Order"],
    }),
    getOrderDetailsByAdmin: builder.query({
      query: (id) => ({ url: `admin/${id}`, credentials: "include" }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    updateOrderByAdmin: builder.mutation({
      query: ({ orderId, orderStatus, deliveredAt }) => ({
        url: `admin/${orderId}`,
        credentials: "include",
        method: "PUT",
        body: { orderId, orderStatus, deliveredAt },
      }),
    }),
  }),
});

export default orderApi;
export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useDeleteSingleOrderMutation,
  useGetOrdersByAdminQuery,
  useGetOrderDetailsByAdminQuery,
  useUpdateOrderByAdminMutation,
} = orderApi;
