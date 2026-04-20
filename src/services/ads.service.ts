import { adsApi } from "@/api/ads.api";

export const adsService = {
  getMyAds: async (page: number = 1, limit: number = 10) => {
    // Logic removed
  },

  reviewAd: async (uuid: string, status: "APPROVED" | "REJECTED" | "CHANGES_REQUESTED", reason?: string) => {
    // Logic removed
  },
};
