import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminNotificationResponse, DataNotificationResponse } from "../type/Type";

export const NotificationApi = createApi({
  reducerPath: "NotificationApi",
  tagTypes: ["Notification"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
   
  }),

  endpoints: (builder) => ({
   FetchNotificationUserLogin : builder.query<DataNotificationResponse, void>({
    query: () => "/notifications/me",
    keepUnusedDataFor: 60,
    providesTags: ['Notification']
   }),
    FetchNotificationAdmin : builder.query<AdminNotificationResponse, void>({
    query: () => "/notifications/admin",
    keepUnusedDataFor: 60
   }),
   ReadNotification: builder.mutation<void, void>({
    query: () => ({
        url: `/notifications/read`,
        method: "PUT"
    }),
    invalidatesTags: ["Notification"]
   })
  }),
});

export const {
useFetchNotificationUserLoginQuery,
useReadNotificationMutation,
useFetchNotificationAdminQuery
} = NotificationApi;
