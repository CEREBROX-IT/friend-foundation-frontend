import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Stats {
  active_user: number;
  pending_user: number;
  submitted_pastors: number;
  not_submitted_pastors: number;
  total_churches: number;
  completed_forms: number;
  pending_forms: number
}
export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserCount: builder.query<Stats, void>({
      query: () => ({
        url: "/stats/user-counts",
        method: "GET",
      }),
    }),
    getFormSubmissionCount: builder.query<Stats, void>({
      query: () => ({
        url: "/stats/submission-counts",
        method: "GET",
      }),
    }),
    getChurchCount: builder.query<Stats, void>({
      query: () => ({
        url: "/stats/churches-count",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserCountQuery, useGetFormSubmissionCountQuery, useGetChurchCountQuery } = statsApi;
