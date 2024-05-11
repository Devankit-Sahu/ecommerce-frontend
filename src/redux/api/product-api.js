import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../config/config";

const productApi = createApi({
  reducerPath: "product-api",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1/product/` }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ key = "", category, price = [], page = 1 }) => {
        let url = "";
        if (key)
          url = `all?key=${key}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}`;
        else if (category)
          url = `all?category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}`;
        else url = "all";
        return {
          url,
          credentials: "include",
        };
      },
      invalidatesTags: ["Products"],
    }),
    productDetails: builder.query({
      query: ({ productId }) => ({
        url: `/${productId}`,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/admin/new",
        credentials: "include",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getProductsByAdmin: builder.query({
      query: () => ({
        url: "/admin/all",
        credentials: "include",
      }),
      providesTags: ["Products"],
    }),
    productDetailsByAdmin: builder.query({
      query: (productId) => ({
        url: `/admin/${productId}`,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    editProductByAdmin: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/admin/${productId}`,
        credentials: "include",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProductByAdmin: builder.mutation({
      query: (productId) => ({
        url: `/admin/${productId}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export default productApi;
export const {
  useGetProductsQuery,
  useProductDetailsQuery,
  useCreateProductMutation,
  useGetProductsByAdminQuery,
  useProductDetailsByAdminQuery,
  useEditProductByAdminMutation,
  useDeleteProductByAdminMutation,
} = productApi;
