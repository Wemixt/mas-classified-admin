import apiClient from "../client";

export const userApi = {
  getModeratorUsers: (page = 1, limit = 10) => 
    apiClient.get(`/api/v1/users/moderator/users`, {
      params: { page, limit }
    }),
  updateUserStatus: (id: string, status: string) => 
    apiClient.put(`/api/v1/users/moderator/status/update/${id}`, { status }),
};
