import type { AdListResponse, AdStatus } from "@/types";
import apiClient from "../client";

export const adApi = {
  adminList: (status: AdStatus, page = 1, limit = 10) => 
    apiClient.get<AdListResponse>(`/api/v1/ads/admin/list`, {
      params: { status, page, limit }
    }),
};
