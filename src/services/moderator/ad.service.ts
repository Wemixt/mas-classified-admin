import type { AdStatus } from "@/types";
import { adApi } from "@/api/moderator/ad.api";

export const adService = {
  getAdminAds: async (status: AdStatus, page = 1, limit = 10) => {
    const response = await adApi.adminList(status, page, limit);
    return response.data;
  },
};
