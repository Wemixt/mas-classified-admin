import apiClient from "../client";

export const userApi = {
  getAdminUsers: (role: string, page = 1, limit = 10) => 
    apiClient.get(`/api/v1/users/admin/list`, {
      params: { role, page, limit }
    }),
  updateUserStatus: (id: string, status: string) => 
    apiClient.put(`/api/v1/users/admin/status/update/${id}`, { status }),
  registerStaff: (data: any) => 
    apiClient.post(`/api/v1/auth/register/staff`, data),
};
