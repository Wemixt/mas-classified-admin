import { userApi } from "@/api/admin/user.api";

export const userService = {
  getAdminUsers: async (role: string, page = 1, limit = 10) => {
    const response = await userApi.getAdminUsers(role, page, limit);
    return response.data;
  },
  updateUserStatus: async (id: string, status: string) => {
    const response = await userApi.updateUserStatus(id, status);
    return response.data;
  },
  registerStaff: async (data: any) => {
    const response = await userApi.registerStaff(data);
    return response.data;
  },
};
