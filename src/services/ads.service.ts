import { adsApi } from "@/api/ads.api";

export const adsService = {
  getMyAds: async (page: number = 1, limit: number = 10) => {
    try {
      const res = await adsApi.getMyAds(page, limit);
      return { success: true, data: res.data };
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to fetch ads";
      return { success: false, data: null, message };
    }
  },

  updateAdReview: async (uuid: string, status: "APPROVED" | "REJECTED" | "CHANGES_REQUESTED") => {
    try {
      const res = await adsApi.updateAdReview(uuid, status);
      return { success: true, data: res.data };
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to update ad status";
      return { success: false, data: null, message };
    }
  },
};
