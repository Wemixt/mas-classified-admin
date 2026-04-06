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
    console.log(`[apiClient Request] ${config.method?.toUpperCase()} ${config.url}`, { baseURL: config.baseURL });
    
    if (typeof document !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];

      if (token) {
        console.log("[apiClient Request] Attaching auth_token from cookie");
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("[apiClient Request] No auth_token found in cookies");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific status codes (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login or refreshing token...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
