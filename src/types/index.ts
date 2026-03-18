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
