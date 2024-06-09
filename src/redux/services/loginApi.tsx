import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  email: string;
  password: string;
  first_name: string
  last_name: string
  middle_name: string
  suffix: string
  age: number
  contact_no: number
  birthdate: string
  title: string
  gender: string
}



interface LoginResponse {
  message?: string;
  token?: string;
  // other properties if any
}

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginResponse, Partial<User>>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    postForgotPassword: builder.mutation<void, Partial<User>>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    postRegisterUser: builder.mutation<void, Partial<User>>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostLoginMutation, usePostForgotPasswordMutation, usePostRegisterUserMutation } = loginApi;
