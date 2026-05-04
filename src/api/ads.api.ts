import apiClient from "./client";

export const adsApi = {
  getMyAds: (page: number = 1, limit: number = 10) =>
    apiClient.get(`/api/v1/ads/pending`, { params: { page, limit } }),

  updateAdReview: (uuid: string, status: "APPROVED" | "REJECTED" | "CHANGES_REQUESTED") =>
    apiClient.patch(`/api/v1/ads/${uuid}/review`, { status }),
};
