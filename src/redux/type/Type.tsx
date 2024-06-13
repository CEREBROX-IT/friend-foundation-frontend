export interface AuthLoginResponse {
    message: string
    token: string
    data : {
        error: string
    }
}

export interface AuthLoginPayload {
    email: string
    password: string
}

export interface RegisterUserPayload {
  email: string;
  password: string;
  confirm_password?: string
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
    email: string
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
    
}