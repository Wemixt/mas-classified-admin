"use client";

import { createContext, useState, ReactNode } from "react";
import type { User, UserRole } from "@/types";

interface AuthContextType {
  user: User;
  role: UserRole;
  setRole: (role: UserRole) => void;
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
  const [role, setRole] = useState<UserRole>("admin");

  const user = hardcodedUsers[role];

  return (
    <AuthContext.Provider value={{ user, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
