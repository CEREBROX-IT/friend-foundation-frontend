import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  NumberOfUsers,
  FormsCountResponse,
  FormSubmissionCountResponse,
  ChurchCountResponse,
  HeadPastorCountResponse,
} from "../type/Type";
export const StatsApi = createApi({
  reducerPath: "StatsApi",
  tagTypes: ["CreateForm", "SubmitForm", "ChurchCount", "CreateUser"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    FetchNoOfUser: builder.query<NumberOfUsers, void>({
      query: () => "/stats/user-counts",
      keepUnusedDataFor: 60,
      providesTags: ["CreateUser"],
    }),
    FetchNoOfForms: builder.query<FormsCountResponse, void>({
      query: () => "/stats/report-form-status/me",
      keepUnusedDataFor: 60,
      providesTags: ["CreateForm"],
    }),
    FetchNoFormSubmission: builder.query<FormSubmissionCountResponse, void>({
      query: () => "/stats/submission-counts",
      keepUnusedDataFor: 60,
      providesTags: ["SubmitForm"],
    }),
    FetchNoChurchCount: builder.query<ChurchCountResponse, void>({
      query: () => "/stats/churches-count",
      keepUnusedDataFor: 60,
      providesTags: ["ChurchCount"],
    }),
    FetchNoHeadPastorCount: builder.query<HeadPastorCountResponse, void>({
      query: () => "/stats/head-pastor-count",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useFetchNoOfUserQuery,
  useFetchNoOfFormsQuery,
  useFetchNoFormSubmissionQuery,
  useFetchNoChurchCountQuery,
  useFetchNoHeadPastorCountQuery
} = StatsApi;
