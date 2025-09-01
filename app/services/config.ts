export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  enableMock: boolean;
  BASE_URL: string;
};

const API_CONFIG: AppConfig = {
  apiPrefix: '/api',
  authenticatedEntryPath: '/home',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'en',
  enableMock: false,
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.116:3000',
};

export { API_CONFIG };
export default API_CONFIG;
