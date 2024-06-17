import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChurchDetails } from "../../components/admin-components/add-churhc-modal";
import { UnassignedPayload } from "../type/Type";

interface ChurchListResponse {
  data: ChurchDetails[];
}
interface User {
  email: string;
  password: string;
  date_created: string;
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
  id: number;
}

interface Stats {
  active_user: number | undefined;
  pending_user: number;
  submitted_pastors: number;
  not_submitted_pastors: number;
  total_churches: number;
  completed_forms: number;
  pending_forms: number;
  head_pastors: number
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
  birth_date: string; 
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
  id: number;
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
  district_id?: number;
  district_name: string;
  head_district_assign: number;
  date_establish: string;
  head_district_full_name?: string;
  district_region: string;
  district_province: string;
  district_municipal: string;
  headquarters_address: string;
  date_updated?: string;
  date_created?: string;
}

interface DistrictList {
  data: DistrictDetails[];
  id?: number;
}

interface Unassigned {
  id: number;
  full_name: string;
}

interface UnassignedResponse {
  message: string;
  data: Unassigned[];
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
  date_created: string;
}

interface AssignedLogsResponse {
  data: AssingedLogs[];
}

interface FormDetails {
  form_title: string;
  form_description: string;
  attachment_file: string;
  active_status: string;
  total: string;
  deadline: string;
  id: number;
}

interface Form {
  id: number;
  form_title: string;
  map: any;
  form_description: string;
  attachment_file: string;
  active_status: boolean;
  date_created: string;
  length: any;
  date_updated: string;
  status: "pending" | "done"; // Define possible status values
}

interface TDelete {
  id: number;
}

interface ChurchDistrict {
  district_belong: string;
  church_belong: string;
}

interface LackingReportForm {
  [index: number]: string;
}

interface UserResponse {
  user_id: number;
  user_full_name: string;
  district_belong: string;
  church_belong: string;
  status: string;
  lacking_report_form: LackingReportForm;
}

interface UnassignedChurch {
  [index: number] : string
}

interface UnassignResponse {
  message: string;
  data: UnassignedChurch;
}

interface FormLog {
  id: number | undefined;
  report_form_id: number | undefined;
  user_id: number | undefined;
  district_belong: string | undefined;
  church_belong: string | undefined;
  response_file: string | undefined;
  date_completed: string | undefined;
  form_title: string | undefined;
  form_description: string | undefined;
  submitted_by: string | undefined;
  email: string | undefined;
  data: []
}

interface FormLogResponse {
  data?: FormLog 
}
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: [
    "Users",
    "DISTRICT",
    "Church",
    "Form",
    "profile",
    "unansweredForm",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
  
    getAssignedLogs: builder.query<AssingedLogs[], void>({
      query: () => "/assignee_logs/",
      keepUnusedDataFor: 60,
      transformResponse: (response: AssignedLogsResponse) => response.data,
      providesTags: ["Church"],
    }),
    postUploadProfile: builder.mutation<void, FormData>({
      query: (data) => ({
        url: `/user/update-profile-display/me`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    getUnansweredForms: builder.query<Form, void>({
      query: () => "/form/unanswered",
      keepUnusedDataFor: 60,
      providesTags: ["unansweredForm"],
    }),
    getAnsweredFormr: builder.query<Form, void>({
      query: () => "/form/answered",
      keepUnusedDataFor: 60,
    }),
    getChurchDistrictBelong: builder.query<ChurchDistrict, void>({
      query: () => "/form/user-church-details",
      keepUnusedDataFor: 60,
    }),

    getHeadPastorCount: builder.query<Stats, void>({
      query: () => "/stats/head-pastor-count",
      keepUnusedDataFor: 60,
      providesTags: ["Form"],
    }),
    getIncompleteForm: builder.query<UserResponse[], void>({
      query: () => "/form/incomplete",
      keepUnusedDataFor: 60,
      providesTags: ["Form"],
    }),
    getUnassignedChurch: builder.query<UnassignResponse[], void>({
      query: () => "/church/unassigned",
      keepUnusedDataFor: 60,
      providesTags: ["Church"],
    }),
    getFormLog: builder.query<FormLogResponse[], void>({
      query: () => "/form/submitted-forms-logs",
      keepUnusedDataFor: 60,
      providesTags: ["Form"],
    }),
  }),
});

export const {
  useGetAssignedLogsQuery,
  usePostUploadProfileMutation,
  useGetAnsweredFormrQuery,
  useGetUnansweredFormsQuery,
  useGetChurchDistrictBelongQuery,
  useGetHeadPastorCountQuery,
  useGetIncompleteFormQuery,
  useGetUnassignedChurchQuery,
  useGetFormLogQuery
} = userApi;
