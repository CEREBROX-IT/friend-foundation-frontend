import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthLoginResponse,
  AuthLoginPayload,
  RegisterUserPayload,
  ForgotPasswordPayload,
} from "../type/Type";
import { StatsApi } from "./StatsApi";

export const AuthenticationApi = createApi({
  reducerPath: "AuthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(StatsApi.util.invalidateTags(["User"]));
         
        } catch (error) {
          console.error("Error creating User:", error);
        }
      },
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
