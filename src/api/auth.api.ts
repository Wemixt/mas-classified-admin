import apiClient from "./client";
import type { LoginCredentials, LoginResponse } from "@/types";

export const authApi = {
  login: (credentials: LoginCredentials) => 
    apiClient.post<LoginResponse>("/api/v1/auth/login", credentials),
  // logout: () => apiClient.post("/auth/logout"),
  // getMe: () => apiClient.get("/auth/me"),
};
