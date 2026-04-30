import apiClient from "../client";
import { CategoryListResponse, SubCategoryListResponse, CreateCategoryDto, CreateCategoryResponse } from "@/types";

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

  /**
   * Create a new main category (Admin access)
   */
  createMainCategory: async (data: CreateCategoryDto): Promise<CreateCategoryResponse> => {
    const response = await apiClient.post("/api/v1/categories/main/create", data);
    return response.data;
  },
};
