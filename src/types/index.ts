export type UserRole = "admin" | "moderator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
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
