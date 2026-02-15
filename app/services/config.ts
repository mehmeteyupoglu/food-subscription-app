import { Platform } from 'react-native';

// Debug when this file is imported
console.log('📁 config.ts file loaded at:', new Date().toISOString());

export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  enableMock: boolean;
  BASE_URL: string;
};

// Read API URL from environment variable
const getApiUrl = (): string => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  
  if (envUrl) {
    console.log('✅ Using environment variable:', envUrl);
    return envUrl;
  }
  
  // Fallback URLs for different platforms
  if (__DEV__) {
    if (Platform.OS === 'ios') {
      console.log('📱 iOS Simulator detected, using localhost');
      return 'http://localhost:3000';
    } else if (Platform.OS === 'android') {
      console.log('🤖 Android Emulator detected, using 10.0.2.2');
      return 'http://10.0.2.2:3000';
    }
  }
  
  console.log('⚠️ No environment variable found, using fallback');
  return 'http://192.168.1.116:3000';
};

// Debug environment variables
console.log('🔍 Environment Variables Debug:', {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  allEnvVars: Object.keys(process.env).filter(key => key.startsWith('EXPO_')),
  platform: Platform.OS,
  isDev: __DEV__,
});

const API_CONFIG: AppConfig = {
  apiPrefix: '/api',
  authenticatedEntryPath: '/home',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'en',
  enableMock: false,
  BASE_URL: getApiUrl(),
};

console.log('🔧 API_CONFIG created with:', {
  BASE_URL: API_CONFIG.BASE_URL,
  source: process.env.EXPO_PUBLIC_API_URL ? 'environment' : 'fallback',
});

export { API_CONFIG };
export default API_CONFIG;
