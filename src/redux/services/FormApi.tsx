import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AnsweredFormsResponse,
  ApprovePayload,
  DeleteFormPayload,
  DistrictChurchBelongResponse,
  FormResponse,
  IncompleteFormsResponse,
  SubmittedFormPayload,
  SubmittedFormResponse,
  SubmittedFormsResponse,
  UnansweredFormsResponse,
  CustomFormData
} from "../type/Type";




export const FormApi = createApi({
  reducerPath: "FormApi",

  tagTypes: [
    "UnansweredForms",
    "DistrictAndChurchBelongsTo",
    "AnsweredForms",
    "SubmittedForm",
    "SubmittedLogs",
    "IncompleteForms",
    "ActiveForm"
  ],
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
      invalidatesTags: ["UnansweredForms", "ActiveForm"],
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
    FetchSubmittedForm: builder.query<
      SubmittedFormResponse[],
      SubmittedFormPayload
    >({
      query: ({ id }) => `/form/submitted-forms?report_form_id=${id}`,
      keepUnusedDataFor: 60,
      providesTags: ["SubmittedForm"],
    }),
    ApproveSubmitted: builder.mutation<void, ApprovePayload>({
      query: ({ id }) => ({
        url: `/form/approve-submission?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["SubmittedForm"],
    }),
    DeleteFromSubmitted: builder.mutation({
      query: (id) => ({
        url: `/form/submitted-forms-logs/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubmittedForm"],
    }),
    AddRemark: builder.mutation<void, ApprovePayload>({
      query: ({ id, remarks }) => ({
        url: `/form/review-add-remarks?id=${id}`,
        method: "PUT",
        body: remarks,
      }),
      invalidatesTags: ["SubmittedForm"],
    }),
    FetchSubmittedLogs: builder.query<SubmittedFormsResponse, void>({
      query: () => "/form/submitted-forms-logs",
      keepUnusedDataFor: 60,
      providesTags: ["SubmittedLogs"],
    }),
    FetchIncompleteForms: builder.query<IncompleteFormsResponse, void>({
      query: () => "/form/incomplete",
      keepUnusedDataFor: 60,
      providesTags: ["IncompleteForms"],
    }),
    EditForm: builder.mutation<void, CustomFormData>({
      query: ({id, data}) => ({
        url: `/form/edit-response?id=${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["SubmittedLogs"]
    }),
    FetchActiveForm : builder.query<UnansweredFormsResponse, void>({
      query: () => "/stats/active-forms-stats",
      keepUnusedDataFor: 60,
      providesTags: ["ActiveForm"]
    }),
    DeleteReportForms: builder.mutation<void, DeleteFormPayload>({
      query: ({id}) => ({
        url: `/form/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ActiveForm"],
    }),
  }),
});

export const {
  useCreateNewFormMutation,
  useFetchUnansweredFormQuery,
  useFetchDistrictChurchBelongToQuery,
  useSubmitFormMutation,
  useFetchAnsweredFormsQuery,
  useFetchSubmittedFormQuery,
  useApproveSubmittedMutation,
  useDeleteFromSubmittedMutation,
  useAddRemarkMutation,
  useFetchSubmittedLogsQuery,
  useFetchIncompleteFormsQuery,
  useEditFormMutation,
  useFetchActiveFormQuery,
  useDeleteReportFormsMutation
} = FormApi;
