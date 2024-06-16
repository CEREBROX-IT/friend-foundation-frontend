import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UnAssignedUserResponse, ApproveUserPayload } from "../type/Type";
import { StatsApi } from "./StatsApi";
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
      providesTags: ["User"],
    }),
    ApproveUser: builder.mutation<void, ApproveUserPayload>({
      query: (targetId) => ({
        url: "/user/approve",
        method: "PATCH",
        body: targetId,
      }),
      async onQueryStarted(targetId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(StatsApi.util.invalidateTags(["User"]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useFetchUnassignedUserQuery, useApproveUserMutation } =
  UserApi;
