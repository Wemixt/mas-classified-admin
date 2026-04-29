import apiClient from "./client";
import type { LoginCredentials, LoginResponse, UserDetailsResponse } from "@/types";
import axios from "axios";
import { getApiBaseUrl } from "@/config/env";

export const authApi = {
  login: (credentials: LoginCredentials) => 
    apiClient.post<LoginResponse>("/api/v1/auth/login", credentials),
  logout: () => apiClient.post("/api/v1/auth/logout"),
  getDetails: (token?: string) => 
    apiClient.get<UserDetailsResponse>("/api/v1/auth/details", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  refresh: (refreshToken: string) => 
    axios.post<LoginResponse>(
      `${getApiBaseUrl()}/api/v1/auth/refresh`,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    ),
};
