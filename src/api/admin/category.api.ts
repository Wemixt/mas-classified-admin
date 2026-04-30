import apiClient from "../client";
import { CategoryListResponse, SubCategoryListResponse } from "@/types";

/**
 * Category API handlers for Admin
 */
export const categoryApi = {
  /**
   * Get all main categories with their subcategories (Admin/Moderator access)
   */
  getMainCategories: async (): Promise<CategoryListResponse> => {
    const response = await apiClient.get("/api/v1/categories/admin/main/list");
    return response.data;
  },

  /**
   * Get all subcategories (Admin/Moderator access)
   */
  getSubCategories: async (): Promise<SubCategoryListResponse> => {
    const response = await apiClient.get("/api/v1/categories/admin/sub/list");
    return response.data;
  },
};
