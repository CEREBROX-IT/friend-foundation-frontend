export interface AuthLoginResponse {
  message: string;
  token: string;
  data: {
    error: string;
  };
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface RegisterUserPayload {
  email: string;
  password: string;
  confirm_password?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  age: number;
  gender: string;
  contact_no: string;
  birth_date: string;
  title: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ChurchResponse {
  message: string;
  data: {
    id: number;
    district_id: number;
    district_name: string;
    church_name: string;
    pastor_assign: number;
    head_pastor_full_name: string;
    church_date_establish: string;
    church_address: string;
    date_updated: string;
    date_created: string;
  }[];
}

export interface ChurchPayload {
  district_id: number;
  church_name: string;
  pastor_assign: number;
  church_date_establish: string;
  church_address: string;
}

export interface UnAssignedUserResponse {
  message: string;
  data: {
    id: number;
    full_name: string;
  }[];
}

export interface NumberOfUsers {
  active_user: number;
  pending_user: number;
}

export interface ApproveUserPayload {
  targetUserId: number;
}

export interface UserDetailsResponse {
  message: string;
  data: UserDetails[];
}
export interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  middle_name: string;
  date_created: string;
  date_updated: string;
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

export interface FormsCountResponse {
  completed_forms: number;
  pending_forms: number;
}

export interface FormSubmissionCountResponse {
  submitted_pastors: number;
  not_submitted_pastors: number;
}

export interface ChurchCountResponse {
  total_churches: number;
}

export interface RemoveUser {
  id: number;
}

export interface UnassignedPayload {
  id?: number;
  data: {
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    middle_name?: string | null;
    suffix?: string | null;
    age?: number | null;
    gender?: string | null;
    contact_no?: string | null;
    birth_date?: string | null;
    salutation?: string | null;
    title?: string | null;
    street?: string | null;
    barangay?: string | null;
    municipal?: string | null;
    province?: string | null;
    postal_code?: string | null;
    region?: string | null;
    country?: string | null;
    date_of_marriage?: string | null;
    spouse_first_name?: string | null;
    spouse_last_name?: string | null;
    spouse_middle_name?: string | null;
    spouse_contact?: string | null;
    father_first_name?: string | null;
    father_last_name?: string | null;
    father_middle_name?: string | null;
    father_suffix_name?: string | null;
    mother_first_name?: string | null;
    mother_last_name?: string | null;
    mother_middle_name?: string | null;
    mother_suffix_name?: string | null;
  };
}

export interface UserProfileResponse {
  message: string;
  data: {
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
    date_created: string;
    date_updated: string;
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
  };
}

export interface CreateNewDistrictPayload {
  union_conference: string;
  district_name: string;
  head_district_assign: number | "";
  date_establish: string;
  district_region: string;
  district_province: string;
  district_municipal: string;
  headquarters_address: string;
}

export interface DistrictDetails {
  id: number;
  union_conference: string;
  district_name: string;
  head_district_assign: number;
  head_district_full_name: string;
  date_establish: string;
  district_region: string;
  district_province: string;
  district_municipal: string;
  headquarters_address: string;
  date_updated: string;
  date_created: string;
}

export interface DistrictDetailsResponse {
  message: string;
  data: DistrictDetails[];
}

export interface UpdateDistrict {
  union_conference: string;
  district_name: string;
  head_district_assign: number | "";
  date_establish: string;
  district_region: string;
  district_province: string;
  district_municipal: string;
  headquarters_address: string;
}

export interface UpdateDistrictPayload {
  id: number;
  data: UpdateDistrict;
}

export interface RemoveDistrictPayload {
  id: number;
}

export interface UpdateUserProfileDetailsPayload {
  id?: number;
  data: {
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    middle_name?: string | null;
    suffix?: string | null;
    age?: number | null;
    gender?: string | null;
    contact_no?: string | null;
    birth_date?: string | null;
    salutation?: string | null;
    title?: string | null;
    street?: string | null;
    barangay?: string | null;
    municipal?: string | null;
    province?: string | null;
    postal_code?: string | null;
    region?: string | null;
    country?: string | null;
    date_of_marriage?: string | null;
    spouse_first_name?: string | null;
    spouse_last_name?: string | null;
    spouse_middle_name?: string | null;
    spouse_contact?: string | null;
    father_first_name?: string | null;
    father_last_name?: string | null;
    father_middle_name?: string | null;
    father_suffix_name?: string | null;
    mother_first_name?: string | null;
    mother_last_name?: string | null;
    mother_middle_name?: string | null;
    mother_suffix_name?: string | null;
  };
}

export interface HeadDistrictChurchListDetails {
  id: number;
  district_id: number;
  district_name: string;
  church_name: string;
  pastor_assign: number;
  head_pastor_full_name: string;
  church_date_establish: string;
  church_address: string;
  date_updated: string;
  date_created: string;
}

export interface HeadDistrictChurchListDetailsResponse {
  message: string
  data: HeadDistrictChurchListDetails[]
}

export interface RemoveChurchPayload {
  id: number
}

export interface UpdateChurchPayload {
  id: number;
  data: {
    district_id: number; // automatic name addition for the district
    church_name: string;
    pastor_assign: number | string; // automatic full name addition for the user or "" for null
    church_date_establish: string;
    church_address: string;
  };
}

export interface AssignedLogsDetails {
  id: number;
  user_id: number;
  user_full_name: string;
  previous_assign: string;
  current_assign: string;
  date_created: string
}

export interface AssignedLogsDetailsResponse {
  message: string
  data: AssignedLogsDetails[]
}

export interface HeadPastorCountResponse {
  head_pastors: number
}



export interface UnassignResponse {
  message: string;
  data: {
    [index: number]: string;
  }[];
}

export type DistrictResponse = {
  message: string
  count: number
}


export interface FormPayload {
  form_title: string;
  form_description: string;
  deadline: string;
  dynamic_fields: { field_name: string; field_value: any; field_type: string }[];
  attachments: { field_name?: string; field_value?: any; field_type?: string }[];

};



export interface FormResponse {
  
  id: number;
  form_title: string;
  form_description: string;
  attachments: {}; // You can define a more specific type if you know the structure
  dynamic_fields: {}; // You can define a more specific type if you know the structure
  deadline: string; // Assuming deadline is always in ISO 8601 format
  active_status: boolean;
  date_created: string; // Assuming date_created is always in ISO 8601 format
  date_updated: string; // Assuming date_updated is always in ISO 8601 format

  
}

export type  UnansweredFormsResponse = {

    id: number;
    form_title: string;
    form_description: string;
    attachments?: {} | null;
    dynamic_fields: {
      type: string;
      field_name: string;
      field_value: string;
    }[];
    deadline: string;
    active_status: string;
    date_created: string;
    date_updated: string;
    status: string;
  
}[]

export type DistrictChurchBelongResponse = {
  district_belong: string;
  church_belong: string
};

type DynamicField = {
  field_name: string;
  field_value: string;
  type?: string;
};

export type SubmitFormPayload = {
  report_form_id: number;
  district_belong: string;
  church_belong: string;
  dynamic_fields: DynamicField[]
  attachment: {};
};

export type AnsweredFormsResponse = {
  id: number;
  form_title: string;
  form_description: string;
  dynamic_fields: DynamicField[];
  deadline: string;
  active_status: boolean;
  date_created: string;
  date_updated: string;
  status: string;
}