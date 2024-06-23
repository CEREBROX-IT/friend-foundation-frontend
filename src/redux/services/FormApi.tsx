import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormPayload, FormResponse, UnansweredFormsResponse } from "../type/Type";

export const FormApi = createApi({
  reducerPath: "FormApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    CreateNewForm: builder.mutation<FormResponse, FormData>({
      query: (data) => ({
        url: "/form/create",
        method: "POST",
        body: data,
      }),
    }),
    FetchUnansweredForm: builder.query<UnansweredFormsResponse, void>({
      query: () => "/form/unanswered",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useCreateNewFormMutation, useFetchUnansweredFormQuery } = FormApi;
