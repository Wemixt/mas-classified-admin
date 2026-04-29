import type { AdStatus } from "@/types";
import { adApi } from "@/api/moderator/ad.api";

export const adService = {
  getAdminAds: async (status: AdStatus, page = 1, limit = 10) => {
    const response = await adApi.adminList(status, page, limit);
    return response.data;
  },
  updateAdStatus: async (id: string, status: AdStatus, rejectionReason?: string) => {
    const response = await adApi.updateAdStatus(id, status, rejectionReason);
    return response.data;
  },
  getAdById: async (id: string) => {
    const response = await adApi.getAd(id);
    return response.data;
  },
};
