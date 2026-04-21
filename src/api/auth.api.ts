import apiClient from "./client";
import type { LoginResponse, UserDetailsResponse } from "@/types";

export const authApi = {
  sso: (code: string) => 
    apiClient.post<LoginResponse>("/api/v1/auth/sso", { code }),
  getDetails: (token?: string) => 
    apiClient.get<UserDetailsResponse>("/api/v1/auth/details", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};
