import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TFormInput } from "../../pages/dashboard/unassigned-dashboard/unassigned-dashboard";
import { ChurchDetails } from "../../components/admin-components/add-churhc-modal";
import { CreateFormInput } from "../../components/admin-components/admin-add-form";

interface ChurchListResponse {
  data: ChurchDetails[]
}
interface User {
  email: string;
  password: string;
  date_created: string
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
  id: number
}

interface Approved {
  targetUserId: {};
}

interface UserListResponse {
  data: User[];
}

interface DistrictDetails {
  id?: number;
  union_conference: string;
  district_name: string;
  head_district_assign: number | ""; // user ID or empty string for null
  date_establish: string; // ISO 8601 date string
  head_district_full_name?: string
  district_region: string;
  district_province: string;
  district_municipal: string;
  headquarters_address: string;
  date_updated?: string;
  date_created?: string;
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


interface UpdateDistrictArgs {
  id: number;
  data: DistrictDetails;
}

interface UpdateChurchArgs {
  id: number;
  data: ChurchDetails;
}

interface AssingedLogs {
  
    user_full_name?: string;
    previous_assign?: string;
    current_assign?: string;
    date_created: string
  
}

interface AssignedLogsResponse {
  data: AssingedLogs[]
}

interface FormDetails {
  form_title: string;
  form_description: string;
  attachment_file: string;
  active_status: string;
  total: string
}


export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users", "DISTRICT", "Church", "Form"],
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
    getFormCount: builder.query<Stats, void>({
      query: () => "/stats/report-form-status/me",
      keepUnusedDataFor: 60,
      providesTags: ["Form"],
    }),

    getFormSubmissionCount: builder.query<Stats, void>({
      query: () => "/stats/submission-counts",
      keepUnusedDataFor: 60,
    }),
    getChurchCount: builder.query<Stats, void>({
      query: () => "/stats/churches-count",
      keepUnusedDataFor: 60,
      providesTags: ["Church"],
    }),
    postRegisterUser: builder.mutation<void, Partial<User>>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users", "DISTRICT", "Church"],
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
      providesTags: ["DISTRICT", "Church"],
    }),
    getDistrictList: builder.query<DistrictDetails[], void>({
      query: () => "/district/list",
      keepUnusedDataFor: 60,
      transformResponse: (response: DistrictList) => response.data,
      providesTags: ["DISTRICT"],
    }),
    postUpdateDistrict: builder.mutation<void, Partial<UpdateDistrictArgs>>({
      query: ({ data, id }) => ({
        url: `/district/update?id=${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["DISTRICT"],
    }),
    postDeleteDistrict: builder.mutation<void, Partial<DeleteUser>>({
      query: ({ id }) => ({
        url: `/district/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DISTRICT"],
    }),
    postUpdateUserDetails: builder.mutation<TFormInput, Partial<TFormInput>>({
      query: ({ id, data }) => ({
        url: `/user/update?id=${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    postAddChurch: builder.mutation<void, Partial<ChurchDetails>>({
      query: (data) => ({
        url: `/church/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Church"],
    }),
    getChurchList: builder.query<ChurchDetails[], void>({
      query: () => "/church/list",
      keepUnusedDataFor: 60,
      providesTags: ["Church"],
      transformResponse: (response: ChurchListResponse) => response.data,
    }),
    postDeleteChurch: builder.mutation<void, Partial<ChurchDetails>>({
      query: ({ id }) => ({
        url: `/church/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Church"],
    }),
    postUpdateChurch: builder.mutation<void, Partial<UpdateChurchArgs>>({
      query: ({ id, data }) => ({
        url: `/church/update?id=${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Church"],
    }),
    postCreateForm: builder.mutation<void, Partial<CreateFormInput>>({
      query: (data) => ({
        url: `/form/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Form']
    }),
    getAssignedLogs: builder.query<AssingedLogs[], void>({
      query: () => "/assignee_logs/",
      keepUnusedDataFor: 60,
      transformResponse: (response: AssignedLogsResponse) => response.data,
      providesTags: ["Church"],
    }),
    getFormStatus: builder.query<FormDetails[], void>({
      query: () => "/form/active-forms-stats",
      keepUnusedDataFor: 60,
      providesTags: ['Form']
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
  useGetDistrictListQuery,
  usePostUpdateDistrictMutation,
  usePostDeleteDistrictMutation,
  usePostUpdateUserDetailsMutation,
  usePostAddChurchMutation,
  useGetChurchListQuery,
  usePostDeleteChurchMutation,
  usePostUpdateChurchMutation,
  usePostCreateFormMutation,
  useGetFormCountQuery,
  useGetAssignedLogsQuery,
  useGetFormStatusQuery
} = userApi;
