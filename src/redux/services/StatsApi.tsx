import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NumberOfUsers } from "../type/Type";
export const StatsApi = createApi({
  reducerPath: "StatsApi",
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    FetchNoOfUser: builder.query<NumberOfUsers, void>({
      query: () => "/stats/user-counts",
      keepUnusedDataFor: 60,
      providesTags: ["User"]
    }),
  }),
});

export const {useFetchNoOfUserQuery} = StatsApi
