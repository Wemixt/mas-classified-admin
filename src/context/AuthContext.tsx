"use client";

import { createContext, useState, ReactNode } from "react";
import type { User, UserRole } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthContextType {
  user: User;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const hardcodedUsers: Record<UserRole, User> = {
  admin: {
    id: "1",
    name: "Ishan",
    email: "ishan@mas.com",
    role: "admin",
    avatar: "/logos/mass logo.png",
  },
  moderator: {
    id: "2",
    name: "Ishan",
    email: "ishan@mas.com",
    role: "moderator",
    avatar: "/logos/mass logo.png",
  },
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(hardcodedUsers.moderator);
  const [role, setRole] = useState<UserRole>("moderator");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      
      if (response && response.success && response.data) {
        const { accessToken } = response.data;
        // Currently API only returns tokens, so we'll set a default user to prevent crashes
        setUser(hardcodedUsers.admin);
        setRole("admin");
        setIsAuthenticated(true);
        // Set the token securely so the Next.js middleware allows navigation
        document.cookie = `auth_token=${accessToken}; path=/`;
        return { success: true };
      }
      
      return { success: false, message: response?.message || "Login failed" };
    } catch (error: any) {
      // Check if it's our custom API Error format from Axios
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
      setUser(hardcodedUsers.moderator);
      setRole("moderator");
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
