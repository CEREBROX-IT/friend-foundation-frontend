import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateNewDistrictPayload,
  DistrictDetailsResponse,
} from "../type/Type";
import { UserApi } from "./UserApi";

export const DistrictApi = createApi({
  reducerPath: "DistrictApi",
  tagTypes: ["DistrictList"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    CreateNewDistrict: builder.mutation<void, CreateNewDistrictPayload>({
      query: (data) => ({
        url: "/district/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DistrictList"],
      async onQueryStarted(_data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(UserApi.util.invalidateTags(["User"]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    FetchDistrictList: builder.query<DistrictDetailsResponse, void>({
      query: () => "/district/list",
      keepUnusedDataFor: 60,
      providesTags: ["DistrictList"]
    }),
  }),
});

export const { useCreateNewDistrictMutation, useFetchDistrictListQuery } = DistrictApi;
