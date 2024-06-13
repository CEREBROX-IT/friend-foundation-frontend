import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChurchResponse } from "../type/Type";

export const ChurchApi = createApi({
  reducerPath: "ChurchApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    FetchChurchListAdmin: builder.query<ChurchResponse, void>({
      query: () => "/church/list/admin",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useFetchChurchListAdminQuery } = ChurchApi;
