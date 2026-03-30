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
    // You can add token retrieval logic here (e.g. from localStorage or Cookies)
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
