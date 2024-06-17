import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UnAssignedUserResponse,
  ApproveUserPayload,
  UserDetailsResponse,
  RemoveUser,
  UserProfileResponse,
  UpdateUserProfileDetailsPayload,
} from "../type/Type";
import { StatsApi } from "./StatsApi";
export const UserApi = createApi({
  reducerPath: "UserApi",
  tagTypes: ["User", "CreateUser", "ApproveUser", "RemoveUsers", "UserProfile"],
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
      invalidatesTags: ["ApproveUser", "User"],
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
      providesTags: ["CreateUser", "ApproveUser", "RemoveUsers"],
    }),
    RemoveUser: builder.mutation<void, RemoveUser>({
      query: (id) => ({
        url: `/user/remove?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["RemoveUsers", "User"],
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(StatsApi.util.invalidateTags(["CreateUser"]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    FetchUserProfile: builder.query<UserProfileResponse, void>({
      query: () => "/user/me",
      keepUnusedDataFor: 120,
      providesTags: ["UserProfile"],
    }),
    UpdateUserDetails: builder.mutation<void, UpdateUserProfileDetailsPayload>({
      query: ({ data, id }) => ({
        url: `/user/update?id=${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    UploadProfilePicture: builder.mutation<void, FormData>({
      query: (data) => ({
        url: `/user/update-profile-display/me`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    
  }),
});

export const {
  useFetchUnassignedUserQuery,
  useApproveUserMutation,
  useFetchUsersQuery,
  useRemoveUserMutation,
  useFetchUserProfileQuery,
  useUpdateUserDetailsMutation,
  useUploadProfilePictureMutation
} = UserApi;
