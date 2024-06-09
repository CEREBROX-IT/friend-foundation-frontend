import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "typescript-cookie";

interface User {
  first_name: string;
  title: string;
  role: string;
}

interface UserListResponse {
  data: User[];
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
      transformResponse: (response: UserListResponse) => response.data,
    }),
  }),
});

export const { useGetUserListQuery } = userApi;
