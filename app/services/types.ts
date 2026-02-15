// Auth Types
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: any; // Simplified for now
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type RegisterRequest = {
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type RegisterResponse = {
  user: any; // Simplified for now
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

// Generic Response Types
export type ApiErrorResponse = {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
};