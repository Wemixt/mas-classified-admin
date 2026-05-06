import { dashboardApi } from "@/api/dashboard.api";

export const dashboardService = {
  getOverview: async () => {
    const response = await dashboardApi.getOverview();
    return response.data;
  },
  getRecentAds: async () => {
    const response = await dashboardApi.getRecentAds();
    return response.data;
  },
  getAdChartData: async (period: "weekly" | "monthly") => {
    const response = await dashboardApi.getAdChartData(period);
    return response.data;
  },
};
