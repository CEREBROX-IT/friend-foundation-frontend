import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NumberOfUsers, FormsCountResponse, FormSubmissionCountResponse} from "../type/Type";
export const StatsApi = createApi({
  reducerPath: "StatsApi",
  tagTypes: ["User", "Form", "SubmitForm"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    FetchNoOfUser: builder.query<NumberOfUsers, void>({
      query: () => "/stats/user-counts",
      keepUnusedDataFor: 60,
      providesTags: ["User"],
    }),
    FetchNoOfForms: builder.query<FormsCountResponse, void>({
      query: () => "/stats/report-form-status/me",
      keepUnusedDataFor: 60,
      providesTags: ["Form"],
    }),
    FetchNoFormSubmission: builder.query<FormSubmissionCountResponse, void>({
      query: () => "/stats/submission-counts",
      keepUnusedDataFor: 60,
      providesTags: ["SubmitForm"],
    }),
  }),
});

export const {useFetchNoOfUserQuery, useFetchNoOfFormsQuery, useFetchNoFormSubmissionQuery} = StatsApi
