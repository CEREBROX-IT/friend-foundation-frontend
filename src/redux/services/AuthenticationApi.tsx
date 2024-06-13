import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthLoginResponse,
  AuthLoginPayload,
  RegisterUser,
} from "../type/Type";

export const AuthenticationApi = createApi({
  reducerPath: "AuthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    AuthLogin: builder.mutation<AuthLoginResponse, AuthLoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    AuthRegister: builder.mutation<void, RegisterUser>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAuthLoginMutation, useAuthRegisterMutation } = AuthenticationApi;
