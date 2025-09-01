import axios from 'axios';
import { API_CONFIG } from './config';
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from './constants';

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token refresh handling
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(
        token
          ? {
              headers: {
                [REQUEST_HEADER_AUTH_KEY]: `${TOKEN_TYPE}${token}`,
              },
            }
          : undefined
      );
    }
  });

  failedQueue = [];
};

// Request interceptor
BaseService.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    
    if (token && config.headers) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
BaseService.interceptors.response.use(
  (response: any) => response,
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response && unauthorizedCode.includes(response.status)) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            // Handle logout
            clearAuthTokens();
            return Promise.reject(error);
          }

          // Refresh token request
          const { data } = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh-token`, {
            refresh_token: refreshToken,
          });

          const newAccessToken = (data as any).access_token;

          // Update tokens
          setAuthTokens(newAccessToken, refreshToken);
          processQueue(null, newAccessToken);

          // Retry original request with new token
          originalRequest.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${newAccessToken}`;
          return BaseService(originalRequest);
        } catch (err) {
          processQueue(err as Error, null);
          clearAuthTokens();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((config) => {
          return BaseService({
            ...originalRequest,
            ...(config || {}),
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    return Promise.reject(error);
  }
);

// Token management functions (to be implemented with AsyncStorage or SecureStore)
function getAuthToken(): string | null {
  // TODO: Implement with AsyncStorage or SecureStore
  // For now, return null
  return null;
}

function getRefreshToken(): string | null {
  // TODO: Implement with AsyncStorage or SecureStore
  // For now, return null
  return null;
}

function setAuthTokens(accessToken: string, refreshToken: string): void {
  // TODO: Implement with AsyncStorage or SecureStore
  console.log('Setting auth tokens:', { accessToken, refreshToken });
}

function clearAuthTokens(): void {
  // TODO: Implement with AsyncStorage or SecureStore
  console.log('Clearing auth tokens');
}

export default BaseService;
