import axios from "axios";
import { getApiBaseUrl } from "@/config/env";

/**
 * Custom Axios instance for the project.
 * Handles base URL, common headers, and interceptors.
 */
const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Auth Token if available
apiClient.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// To prevent infinite loop if refresh fails
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle specific status codes (e.g., 401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (typeof document !== "undefined") {
          const refreshToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("refresh_token="))
            ?.split("=")[1];

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await axios.post(
            `${getApiBaseUrl()}/api/v1/auth/refresh`,
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );

          if (response.data?.success && response.data?.data) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            document.cookie = `auth_token=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
            document.cookie = `refresh_token=${newRefreshToken}; path=/; max-age=604800; SameSite=Lax`;
            
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            
            processQueue(null, accessToken);
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Dispatch custom event to trigger logout in UI
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event('auth_error'));
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
