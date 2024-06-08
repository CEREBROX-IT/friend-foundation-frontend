import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  email: string;
  password: string;
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
  }),
});

export const { usePostLoginMutation } = loginApi;
