import { categoryApi } from "@/api/admin/category.api";
import { Category, SubCategory } from "@/types";

/**
 * Service to handle category related business logic for Admin
 */
export const categoryService = {
  /**
   * Fetch all main categories for administrative management
   */
  async getMainCategories(): Promise<Category[]> {
    try {
      const response = await categoryApi.getMainCategories();
      return response.data;
    } catch (error) {
      console.error("Error fetching main categories:", error);
      throw error;
    }
  },

  /**
   * Fetch all subcategories for administrative management
   */
  async getSubCategories(): Promise<SubCategory[]> {
    try {
      const response = await categoryApi.getSubCategories();
      return response.data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  },
};
