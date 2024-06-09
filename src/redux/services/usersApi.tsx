import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "typescript-cookie";

interface User {
  first_name: string;
  title: string;
  role: string;
}
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserList: builder.query<User[], void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserListQuery } = userApi;
