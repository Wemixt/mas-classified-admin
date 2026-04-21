import { authApi } from "@/api/auth.api";
import type { LoginCredentials } from "@/types";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    // Logic removed
  },
  ssoLogin: async (code: string) => {
    const response = await authApi.sso(code);
    return response.data;
  },
  logout: async () => {
    // Logic removed
  },
  getDetails: async (token?: string) => {
    const response = await authApi.getDetails(token);
    return response.data;
  },
};
