// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface sampleData {
    id: number,
    title: string,
    body: string
}
// Define a service using a base URL and expected endpoints
export const sampleApi = createApi({
  reducerPath: 'sampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getSampleData: builder.query<sampleData, void>({
      query: () => `/posts`,

    }),
  }),   
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSampleDataQuery } = sampleApi