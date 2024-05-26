import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../config/config";

const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1/user/` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        credentials: "include",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
        credentials: "include",
      }),
    }),
    getUsersByAdmin: builder.query({
      query: () => ({
        url: "admin/all",
        credentials: "include",
      }),
    }),
  }),
});

export default userApi;

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useGetUsersByAdminQuery,
} = userApi;
