import apiClient from "../client";
import { AdminAdListResponse } from "@/types";

/**
 * Ads API handlers for Admin
 */
export const adsApi = {
  /**
   * Get all ads with pagination (Admin/Moderator access)
   */
  getAdminAds: async (page: number = 1, limit: number = 20): Promise<AdminAdListResponse> => {
    const response = await apiClient.get(`/api/v1/ads/admin/list?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get single ad details (Admin/Moderator access)
   */
  getAdminAd: async (uuid: string): Promise<any> => {
    const response = await apiClient.get(`/api/v1/ads/admin/get/${uuid}`);
    return response.data;
  },
};
