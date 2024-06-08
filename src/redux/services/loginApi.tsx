import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  email: string;
  password: string;
}

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    postLogin: builder.mutation<void, Partial<User>>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;
