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