import type { AdListResponse, AdStatus } from "@/types";
import apiClient from "../client";

export const adApi = {
  adminList: (status: AdStatus, page = 1, limit = 10) => 
    apiClient.get<AdListResponse>(`/api/v1/ads/admin/list`, {
      params: { status, page, limit }
    }),
  updateAdStatus: (id: string, status: AdStatus, rejectionReason?: string) => {
    const body: any = { status };
    if (rejectionReason) body.rejectionReason = rejectionReason;
    return apiClient.put(`/api/v1/ads/status/update/${id}`, body);
  },
  getAd: (id: string) => apiClient.get(`/api/v1/ads/admin/get/${id}`),
};
