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
};
