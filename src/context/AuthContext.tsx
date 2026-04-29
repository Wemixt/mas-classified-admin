"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import type { User, UserRole } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const normalizeRole = (role: string): UserRole => {
    const lowerRole = role.toLowerCase();
    if (lowerRole === "admin" || lowerRole === "moderator" || lowerRole === "super_admin" || lowerRole === "superadmin") {
      return (lowerRole === "superadmin" ? "super_admin" : lowerRole) as UserRole;
    }
    return "moderator"; // Default fallback
  };

  const fetchUserDetails = async () => {
    try {
      const response = await authService.getDetails();
      if (response && response.success && response.data?.user) {
        const userData = response.data.user;
        setUser(userData);
        setRole(normalizeRole(userData.role));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
      }
    } catch (error) {
      console.error("Failed to fetch user details", error);
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (token) {
      fetchUserDetails();
    } else {
      setIsLoading(false);
    }

    const handleAuthError = () => {
      logout();
    };

    window.addEventListener('auth_error', handleAuthError);
    return () => window.removeEventListener('auth_error', handleAuthError);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      
      if (response && response.success && response.data) {
        const { accessToken, refreshToken } = response.data;
        // Set the token securely so the Next.js middleware allows navigation
        document.cookie = `auth_token=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
        if (refreshToken) {
          document.cookie = `refresh_token=${refreshToken}; path=/; max-age=604800; SameSite=Lax`;
        }
        
        // Fetch real user details with the token immediately
        const detailsResponse = await authService.getDetails(accessToken);
        if (detailsResponse && detailsResponse.success && detailsResponse.data?.user) {
          const userData = detailsResponse.data.user;
          setUser(userData);
          setRole(normalizeRole(userData.role));
          setIsAuthenticated(true);
          return { success: true, user: userData };
        }
        
        return { success: false, message: "Failed to retrieve profile details" };
      }
      
      return { success: false, message: response?.message || "Login failed" };
    } catch (error: any) {
      if (error.response?.data?.message) {
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: "An unexpected error occurred." };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    await fetchUserDetails();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole: (r) => setRole(r as UserRole),
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
