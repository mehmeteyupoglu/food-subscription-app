import ApiService from './ApiService';
import type {
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
} from './types';

export async function apiSignIn(data: LoginRequest) {
  return ApiService.fetchData<LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data,
  });
}

export async function apiSignUp(data: RegisterRequest) {
  return ApiService.fetchData<RegisterResponse>({
    url: '/api/users',
    method: 'post',
    data,
  });
}

export async function apiSignOut() {
  return ApiService.fetchData({
    url: '/auth/logout',
    method: 'post',
  });
}

export async function apiForgotPassword(data: ForgotPasswordRequest) {
  return ApiService.fetchData({
    url: '/auth/forgot-password',
    method: 'post',
    data,
  });
}

export async function apiResetPassword(data: ResetPasswordRequest) {
  return ApiService.fetchData({
    url: '/auth/reset-password',
    method: 'post',
    data,
  });
}

export async function apiRefreshToken(refreshToken: string) {
  return ApiService.fetchData<LoginResponse>({
    url: '/auth/refresh-token',
    method: 'post',
    data: { refresh_token: refreshToken },
  });
}

export async function apiGetCurrentUser() {
  return ApiService.fetchData({
    url: '/user/profile',
    method: 'get',
  });
}

// Default export for Expo Router compatibility
export default {
  apiSignIn,
  apiSignUp,
  apiSignOut,
  apiForgotPassword,
  apiResetPassword,
  apiRefreshToken,
  apiGetCurrentUser,
};
