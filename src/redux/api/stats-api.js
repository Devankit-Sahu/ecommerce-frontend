import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../config/config";

const statsApi = createApi({
  reducerPath: "stats-api",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1/stats/` }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "dashboard",
        credentials: "include",
      }),
      invalidatesTags: ["Stats"],
    }),
  }),
});

export default statsApi;
export const { useGetDashboardDataQuery } = statsApi;
