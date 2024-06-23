import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AnsweredFormsResponse,
  DistrictChurchBelongResponse,
  FormResponse,
  UnansweredFormsResponse,
} from "../type/Type";

export const FormApi = createApi({
  reducerPath: "FormApi",

  tagTypes: ["UnansweredForms", "DistrictAndChurchBelongsTo", "AnsweredForms"],
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
      invalidatesTags: ["UnansweredForms"],
    }),
    FetchUnansweredForm: builder.query<UnansweredFormsResponse, void>({
      query: () => "/form/unanswered",
      keepUnusedDataFor: 60,
      providesTags: ["UnansweredForms"],
    }),
    FetchDistrictChurchBelongTo: builder.query<
      DistrictChurchBelongResponse,
      void
    >({
      query: () => "/form/user-church-details",
      keepUnusedDataFor: 60,
      providesTags: ["DistrictAndChurchBelongsTo"],
    }),
    SubmitForm: builder.mutation<void, FormData>({
      query: (data) => ({
        url: "/form/submit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UnansweredForms", "AnsweredForms"],
    }),
    FetchAnsweredForms: builder.query<AnsweredFormsResponse[], void>({
      query: () => "/form/answered",
      keepUnusedDataFor: 60,
      providesTags: ["AnsweredForms"],
    }),
  }),
});

export const {
  useCreateNewFormMutation,
  useFetchUnansweredFormQuery,
  useFetchDistrictChurchBelongToQuery,
  useSubmitFormMutation,
  useFetchAnsweredFormsQuery
} = FormApi;
