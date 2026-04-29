import { userApi } from "@/api/moderator/user.api";

export const userService = {
  getModeratorUsers: async (page = 1, limit = 10) => {
    const response = await userApi.getModeratorUsers(page, limit);
    return response.data;
  },
  updateUserStatus: async (id: string, status: string) => {
    const response = await userApi.updateUserStatus(id, status);
    return response.data;
  },
};
