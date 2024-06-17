import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UnAssignedUserResponse, ApproveUserPayload, UserDetailsResponse } from "../type/Type";
import { StatsApi } from "./StatsApi";
export const UserApi = createApi({
  reducerPath: "UserApi",
  tagTypes: ["User","CreateUser", "ApproveUser"],
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
      invalidatesTags: ["ApproveUser"],
      async onQueryStarted(_targetId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(StatsApi.util.invalidateTags(["CreateUser"]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    FetchUsers: builder.query<UserDetailsResponse, void>({
      query: () => "/user",
      keepUnusedDataFor: 60,
      providesTags: ["CreateUser", "ApproveUser"],
    }),
  }),
});

export const { useFetchUnassignedUserQuery, useApproveUserMutation, useFetchUsersQuery } =
  UserApi;
