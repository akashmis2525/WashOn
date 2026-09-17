import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Config } from '../../constants/config';
import { StorageService } from '../storage/storageService';

export const apiClient: AxiosInstance = axios.create({
  baseURL: Config.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor to attach Bearer token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { accessToken } = await StorageService.getAuthTokens();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Auto logout or trigger token refresh logic
      await StorageService.clearAuthTokens();
    }
    return Promise.reject(error);
  }
);
