import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  age: number;
  contact_no: number;
  birthdate: string;
  title: string;
  gender: string;
  role: string;
}

interface DeleteUser {
  id: number
}
interface Stats {
  active_user: number | undefined;
  pending_user: number;
  submitted_pastors: number;
  not_submitted_pastors: number;
  total_churches: number;
  completed_forms: number;
  pending_forms: number;
}

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  middle_name: string;
  suffix: string;
  age: number;
  gender: string;
  contact_no: string;
  birth_date: string; // Date string in ISO format
  salutation: string | null;
  title: string;
  role: string;
  profile_display: string | null;
  id: number;
  user_id: number;
  street: string | null;
  barangay: string | null;
  municipal: string | null;
  province: string | null;
  postal_code: string | null;
  region: string | null;
  country: string | null;
  date_of_marriage: string | null;
  spouse_first_name: string | null;
  spouse_last_name: string | null;
  spouse_middle_name: string | null;
  spouse_contact: string | null;
  father_first_name: string | null;
  father_last_name: string | null;
  father_middle_name: string | null;
  father_suffix_name: string | null;
  mother_first_name: string | null;
  mother_last_name: string | null;
  mother_middle_name: string | null;
  mother_suffix_name: string | null;
}

interface UserDataResponse {
  data: UserDetails;
  message: string;
}

interface Approved {
  targetUserId: {};
}

interface UserListResponse {
  data: User[];
}

interface DistrictDetails {
  id: number;
  union_conference: string;
  district_name: string;
  head_district_assign: number | ""; // user ID or empty string for null
  date_establish: string; // ISO 8601 date string
  head_district_full_name: string
  district_region: string;
  district_province: string;
  district_municipal: string;
  headquarters_address: string;
  date_updated: string;
  date_created: string;
}

interface DistrictList {
  data: DistrictDetails[]
}

interface Unassigned {
  id: number
  full_name: string
}

interface UnassignedResponse {
  message: string
  data: Unassigned[]
}

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users", "DISTRICT"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getUserList: builder.query<User[], void>({
      query: () => "/user",
      transformResponse: (response: UserListResponse) => response.data,
      keepUnusedDataFor: 60,
      providesTags: ["Users"],
    }),
    postApproveUser: builder.mutation<void, Partial<Approved>>({
      query: (data) => ({
        url: "/user/approve",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getUserCount: builder.query<Stats, void>({
      query: () => "/stats/user-counts",
      keepUnusedDataFor: 60,
      providesTags: ["Users"],
    }),
    getFormSubmissionCount: builder.query<Stats, void>({
      query: () => "/stats/submission-counts",
      keepUnusedDataFor: 60,
    }),
    getChurchCount: builder.query<Stats, void>({
      query: () => "/stats/churches-count",
      keepUnusedDataFor: 60,
    }),
    postRegisterUser: builder.mutation<void, Partial<User>>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    postRemoveUser: builder.mutation<void, Partial<DeleteUser>>({
      query: ({ id }) => ({
        url: `/user/remove?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    getUserDetails: builder.query<UserDataResponse, void>({
      query: () => "/user/me",
    }),
    postNewDistrict: builder.mutation<void, Partial<DistrictDetails>>({
      query: (data) => ({
        url: "/district/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DISTRICT"],
    }),
    getUnassignedUser: builder.query<UnassignedResponse, void>({
      query: () => "/district/unassigned-users",
      keepUnusedDataFor: 60,
      providesTags: ["DISTRICT"],
    }),
    getDistrictList: builder.query<DistrictDetails[], void>({
      query: () => "/district/list",
      keepUnusedDataFor: 60,
      transformResponse: (response: DistrictList) => response.data,
      providesTags: ["DISTRICT"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  usePostApproveUserMutation,
  usePostRegisterUserMutation,
  useGetUserCountQuery,
  useGetFormSubmissionCountQuery,
  useGetChurchCountQuery,
  usePostRemoveUserMutation,
  useGetUserDetailsQuery,
  usePostNewDistrictMutation,
  useGetUnassignedUserQuery,
  useGetDistrictListQuery
} = userApi;
