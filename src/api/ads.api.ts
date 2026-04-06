import apiClient from "./client";
import { Ad, PaginatedResponse } from "@/types";

export const adsApi = {
  getMyAds: (page: number = 1, limit: number = 10) => {
    console.log(`[adsApi] getMyAds called for page: ${page}, limit: ${limit}`);
    return apiClient.get<PaginatedResponse<Ad>>(`/api/v1/ads/my-ads`, {
      params: { page, limit },
    });
  },
  
  // We can add other methods like approve, reject here later
  reviewAd: (uuid: string, status: "APPROVED" | "REJECTED" | "CHANGES_REQUESTED", reason?: string) =>
    apiClient.patch(`/api/v1/ads/review/${uuid}`, { status, reason }),
};
