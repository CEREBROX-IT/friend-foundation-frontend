import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChurchPayload, ChurchResponse } from "../type/Type";

export const ChurchApi = createApi({
  reducerPath: "ChurchApi",
  tagTypes: ["Church"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    FetchChurchListAdmin: builder.query<ChurchResponse, void>({
      query: () => "/church/list/admin",
      keepUnusedDataFor: 60,
      providesTags: ["Church"],
    }),
    CreateChurch: builder.mutation<void, ChurchPayload>({
      query: (data) => ({
        url: "/church/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Church"],
    }),
  }),
});

export const { useFetchChurchListAdminQuery, useCreateChurchMutation } =
  ChurchApi;
