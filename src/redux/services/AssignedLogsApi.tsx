import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AssignedLogsDetailsResponse } from "../type/Type";

export const AssignedLogsApi = createApi({
  reducerPath: "AssignedLogsApi",
  tagTypes: ["AssignLogs"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    FetchAssignedLogs: builder.query<AssignedLogsDetailsResponse ,void>({
      query: () => "/assignee_logs/",
      keepUnusedDataFor: 60,
      providesTags: ["AssignLogs"],
    }),
  }),
});

export const { useFetchAssignedLogsQuery } = AssignedLogsApi;
