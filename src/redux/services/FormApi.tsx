import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormPayload } from "../type/Type";

export const FormApi = createApi({
  reducerPath: "FormApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    CreateNewForm: builder.mutation<void, FormData>({
      query: (data) => ({
        url: "/form/create",
        method: "POST",
        body: data
      }),
    }),
  }),
});


export const {useCreateNewFormMutation} = FormApi