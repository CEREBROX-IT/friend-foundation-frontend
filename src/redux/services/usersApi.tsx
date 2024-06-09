import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 interface User {
   email: string;
   password: string;
   first_name: string;
   last_name: string;
   middle_name: string;
   suffix: string;
   age: number;
   contact_no: number;
   birthdate: string;
   title: string;
   gender: string;
   role: string
 }

interface Approved {
  targetUserId: {};
}

interface UserListResponse {
  data: User[] ;
}

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getUserList: builder.query<User[], void>({
      query: () => "/user",
      transformResponse: (response: UserListResponse) => response.data,
      keepUnusedDataFor: 60,
      providesTags: ["Users"],
    }),
    postApproveUser: builder.mutation<void, Partial<Approved>>({
      query: (data) => ({
        url: "/user/approve",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    postRegisterUser: builder.mutation<void, Partial<User>>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUserListQuery, usePostApproveUserMutation, usePostRegisterUserMutation } = userApi;
