import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthLoginResponse,
  AuthLoginPayload,
  RegisterUserPayload,
  ForgotPasswordPayload,
} from "../type/Type";
import { url } from "inspector";

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
    AuthRegister: builder.mutation<void, RegisterUserPayload>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    AuthForgotPassword: builder.mutation<void, ForgotPasswordPayload>({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
  }),
});

export const { useAuthLoginMutation, useAuthRegisterMutation, useAuthForgotPasswordMutation } =
  AuthenticationApi;
