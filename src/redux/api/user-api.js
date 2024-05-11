import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../config/config";

const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1/user/` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export default userApi;

export const { useLoginMutation } = userApi;
