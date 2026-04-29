import { userApi } from "@/api/admin/user.api";

export const userService = {
  getAdminUsers: async (role: string, page = 1, limit = 10) => {
    const response = await userApi.getAdminUsers(role, page, limit);
    return response.data;
  },
};
