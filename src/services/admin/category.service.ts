import { categoryApi } from "@/api/admin/category.api";
import { Category, SubCategory, CreateCategoryDto, CreateSubCategoryDto } from "@/types";

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

  /**
   * Create a new main category
   */
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    try {
      const response = await categoryApi.createMainCategory(data);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  /**
   * Create a new subcategory
   */
  async createSubCategory(data: CreateSubCategoryDto): Promise<SubCategory> {
    try {
      const response = await categoryApi.createSubCategory(data);
      return response.data;
    } catch (error) {
      console.error("Error creating subcategory:", error);
      throw error;
    }
  },
};
