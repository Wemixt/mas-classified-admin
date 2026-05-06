import apiClient from "./client";
import type { DashboardOverviewResponse, RecentAdsResponse, AdChartResponse } from "@/types";

export const dashboardApi = {
  getOverview: () => 
    apiClient.get<DashboardOverviewResponse>("/api/v1/dashboard/overview"),
  getRecentAds: () => 
    apiClient.get<RecentAdsResponse>("/api/v1/dashboard/recent-ads"),
  getAdChartData: (period: "weekly" | "monthly") => 
    apiClient.get<AdChartResponse>(`/api/v1/dashboard/charts/ads?period=${period}`),
};
