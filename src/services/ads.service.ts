import { adsApi } from "@/api/ads.api";

export const adsService = {
  getMyAds: async (page: number = 1, limit: number = 10) => {
    const response = await adsApi.getMyAds(page, limit);
    return response.data;
  },

  updateAdReview: async (uuid: string, status: "APPROVED" | "REJECTED" | "CHANGES_REQUESTED", reason?: string) => {
    const response = await adsApi.reviewAd(uuid, status, reason);
    return response.data;
  },
};
