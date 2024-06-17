import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ChurchPayload,
  ChurchResponse,
  HeadDistrictChurchListDetailsResponse,
  RemoveChurchPayload,
} from "../type/Type";
import { UserApi } from "./UserApi";
import { StatsApi } from "./StatsApi";

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
    FetchChurchListHeadDistrict: builder.query<
      HeadDistrictChurchListDetailsResponse,
      void
    >({
      query: () => "/church/list",
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
      async onQueryStarted(_data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(UserApi.util.invalidateTags(["User"]));
          dispatch(StatsApi.util.invalidateTags(["ChurchCount"]));
        } catch (error) {
          console.error("Error creating church:", error);
        }
      },
    }),
    RemoveChurch: builder.mutation<void, RemoveChurchPayload>({
      query: ({ id }) => ({
        url: `/church/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Church"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(StatsApi.util.invalidateTags(["ChurchCount"]));
        } catch (error) {
          console.error("Error creating church:", error);
        }
      },
    }),
  }),
});

export const {
  useFetchChurchListAdminQuery,
  useCreateChurchMutation,
  useFetchChurchListHeadDistrictQuery,
  useRemoveChurchMutation
} = ChurchApi;
