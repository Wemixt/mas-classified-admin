import type { MenuItem, UserRole } from "@/types";

export const menuItems: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", roles: ["admin", "moderator", "super_admin"] },
  { label: "Ad Review", path: "/ad-review", roles: ["admin", "moderator", "super_admin"] },
  { label: "Published Ads", path: "/published-ads", roles: ["admin", "moderator", "super_admin"] },
  { label: "Rejected Ads", path: "/rejected-ads", roles: ["admin", "moderator", "super_admin"] },
  { label: "Sellers", path: "/sellers", roles: ["admin", "moderator", "super_admin"] },
  { label: "Messages", path: "/messages", roles: ["moderator"] },
  { label: "Reports", path: "/reports", roles: ["moderator"] },
  { label: "Moderators", path: "/moderators", roles: ["admin", "super_admin"] },
  { label: "Categories", path: "/categories", roles: ["admin", "moderator", "super_admin"] },
  { label: "All Users", path: "/all-users", roles: ["admin", "super_admin"] },
  { label: "Settings", path: "/settings", roles: ["admin", "moderator", "super_admin"] },
];

export function getMenuForRole(role: UserRole): MenuItem[] {
  return menuItems.filter((item) => item.roles.includes(role));
}