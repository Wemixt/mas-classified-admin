"use client";

import { createContext, useState, ReactNode } from "react";
import type { User, UserRole } from "@/types";

interface AuthContextType {
  user: User;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
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

  const login = (email: string, password: string) => {
    // Basic testing login logic
    if (email === "admin@mas.com") {
      setUser(hardcodedUsers.admin);
      setRole("admin");
    } else {
      setUser(hardcodedUsers.moderator);
      setRole("moderator");
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(hardcodedUsers.moderator);
    setRole("moderator");
    setIsAuthenticated(false);
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
