import { authApi } from "@/api/auth.api";
import type { LoginCredentials } from "@/types";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    return response.data;
  },
  logout: async () => {
    const response = await authApi.logout();
    return response.data;
  },
  getDetails: async (token?: string) => {
    const response = await authApi.getDetails(token);
    return response.data;
  },
  refresh: async (refreshToken: string) => {
    const response = await authApi.refresh(refreshToken);
    return response.data;
  },
};
