import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UnAssignedUserResponse } from "../type/Type";

export const UserApi = createApi({
  reducerPath: "UserApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    FetchUnassignedUser: builder.query<UnAssignedUserResponse, void>({
      query: () => "/district/unassigned-users",
      keepUnusedDataFor: 60,
      providesTags: ["User"]
    }),
  }),
});

export const { useFetchUnassignedUserQuery } =
  UserApi;
