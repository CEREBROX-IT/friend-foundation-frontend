import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const NotificationApi = createApi({
  reducerPath: "NotificationApi",
  
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
   FetchNotificationUserLogin : builder.query({
    query: () => "/notifications/me",
    keepUnusedDataFor: 60
   }),
    FetchNotificationAdmin : builder.query({
    query: () => "/notifications/admin",
    keepUnusedDataFor: 60
   }),
   ReadNotification: builder.mutation({
    query: (id) => ({
        url: `/notifications/read?id=${id}`,
        method: "PUT"
    })
   })
  }),
});

export const {

} = NotificationApi;
