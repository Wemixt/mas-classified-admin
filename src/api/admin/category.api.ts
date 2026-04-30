import apiClient from "../client";
import { CategoryListResponse, SubCategoryListResponse, CreateCategoryDto, CreateCategoryResponse, CreateSubCategoryDto, CreateSubCategoryResponse, UpdateCategoryDto, UpdateSubCategoryDto } from "@/types";

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

  /**
   * Create a new subcategory (Admin access)
   */
  createSubCategory: async (data: CreateSubCategoryDto): Promise<CreateSubCategoryResponse> => {
    const response = await apiClient.post("/api/v1/categories/sub/create", data);
    return response.data;
  },

  /**
   * Update a main category by UUID (Admin access)
   */
  updateMainCategory: async (uuid: string, data: UpdateCategoryDto): Promise<CreateCategoryResponse> => {
    const response = await apiClient.put(`/api/v1/categories/main/update/${uuid}`, data);
    return response.data;
  },

  /**
   * Update a subcategory by UUID (Admin access)
   */
  updateSubCategory: async (uuid: string, data: UpdateSubCategoryDto): Promise<CreateSubCategoryResponse> => {
    const response = await apiClient.put(`/api/v1/categories/sub/update/${uuid}`, data);
    return response.data;
  },

  /**
   * Delete a main category by UUID (Admin access)
   */
  deleteMainCategory: async (uuid: string): Promise<any> => {
    const response = await apiClient.delete(`/api/v1/categories/main/delete/${uuid}`);
    return response.data;
  },

  /**
   * Delete a subcategory by UUID (Admin access)
   */
  deleteSubCategory: async (uuid: string): Promise<any> => {
    const response = await apiClient.delete(`/api/v1/categories/sub/delete/${uuid}`);
    return response.data;
  },
};
