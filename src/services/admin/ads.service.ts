import { adsApi } from "@/api/admin/ads.api";
import { AdminAdListResponse } from "@/types";

/**
 * Service to handle ads related business logic for Admin
 */
export const adsService = {
  /**
   * Get all ads for admin list
   */
  async getAdminAds(page: number = 1, limit: number = 20): Promise<AdminAdListResponse> {
    try {
      return await adsApi.getAdminAds(page, limit);
    } catch (error) {
      console.error("Error fetching admin ads:", error);
      throw error;
    }
  },

  /**
   * Get ad details for admin
   */
  async getAdminAdDetails(uuid: string): Promise<any> {
    try {
      return await adsApi.getAdminAd(uuid);
    } catch (error) {
      console.error("Error fetching admin ad details:", error);
      throw error;
    }
  },
};
