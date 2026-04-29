import apiClient from "../client";

export const userApi = {
  getAdminUsers: (role: string, page = 1, limit = 10) => 
    apiClient.get(`/api/v1/users/admin/list`, {
      params: { role, page, limit }
    }),
};
