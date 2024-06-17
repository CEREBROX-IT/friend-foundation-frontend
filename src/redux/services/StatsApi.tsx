import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NumberOfUsers, FormsCountResponse } from "../type/Type";
export const StatsApi = createApi({
  reducerPath: "StatsApi",
  tagTypes: ['User', "Form"],
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
    FetchNoOfForms: builder.query<FormsCountResponse, void>({
      query: () => "/stats/report-form-status/me",
      keepUnusedDataFor: 60,
      providesTags: ["Form"]
    })
  }),
});

export const {useFetchNoOfUserQuery, useFetchNoOfFormsQuery} = StatsApi
