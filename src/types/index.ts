export type UserRole = "admin" | "moderator" | "super_admin";

export interface User {
  id: string;
  uuid: string;
  fullName: string;
  email: string;
  employeeId?: string;
  address?: string;
  nic?: string;
  phoneNo?: string;
  role: UserRole;
  status: "ACTIVE" | "INACTIVE";
  avatar?: string;
  createdAt?: string;
}

export interface MenuItem {
  label: string;
  path: string;
  roles: UserRole[];
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  error?: {
    code: string;
  };
  timestamp: string;
  path: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  } | null;
  meta?: {
    timestamp: string;
    path: string;
  };
}

export interface UserDetailsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    user: User;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

export type AdStatus = "ACTIVE" | "PENDING_REVIEW" | "REJECTED" | "DELETED" | "EXPIRED" | "DRAFT";

export interface Ad {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  brand: string;
  model: string;
  contactDetails: string;
  price: string;
  currency: string;
  isNegotiable: boolean;
  condition: string;
  status: AdStatus;
  viewCount: number;
  createdAt: string;
  countryName: string;
  districtName: string;
  cityName: string;
  categoryName: string;
  userName: string;
  userEmail: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface AdListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PaginatedResponse<Ad>;
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface SubCategory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  mainCategoryId: number;
  description: string | null;
  icon: string | null;
  order: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Category {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  subCategories?: SubCategory[];
}

export interface CategoryListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Category[];
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface SubCategoryListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SubCategory[];
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  icon?: string;
}

export interface CreateCategoryResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Category;
  meta: {
    timestamp: string;
    path: string;
  };
}
