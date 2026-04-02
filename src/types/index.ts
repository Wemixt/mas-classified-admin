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
