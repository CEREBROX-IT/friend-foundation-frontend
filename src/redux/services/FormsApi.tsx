import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const FormsApi = createApi({
  reducerPath: "FormsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    
  }),
});

export const {
  
} = FormsApi;
