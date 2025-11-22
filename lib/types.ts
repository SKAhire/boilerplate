// Authentication and user types
export type User = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthCredentials = {
  username: string;
  email: string;
  password: string;
};

export type SignupFormData = {
  username: string;
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type UserSecuritySettings = {
  totp_enabled: boolean;
  email_otp_enabled: boolean;
  two_factor_verified: boolean;
};

export type PasswordRecoveryData = {
  email: string;
  recovery_method: "email" | "totp";
  otp_code: string;
  new_password: string;
};
