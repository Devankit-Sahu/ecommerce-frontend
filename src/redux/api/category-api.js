import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../config/config";

const categoryApi = createApi({
  reducerPath: "category-api",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1/category/` }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/all",
      }),
      invalidatesTags: ["Category"],
    }),
    getCategoriesByAdmin: builder.query({
      query: () => ({
        url: "/admin/all",
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (categoryName) => ({
        url: "/admin/new",
        credentials: "include",
        method: "POST",
        body: categoryName,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/${categoryId}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export default categoryApi;
export const {
  useGetCategoriesQuery,
  useGetCategoriesByAdminQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
