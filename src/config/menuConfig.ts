import type { MenuItem, UserRole } from "@/types";

export const menuItems: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", roles: ["admin", "moderator"] },
  { label: "Ad Review", path: "/ad-review", roles: ["admin", "moderator"] },
  { label: "Published Ads", path: "/published-ads", roles: ["admin", "moderator"] },
  { label: "Rejected Ads", path: "/rejected-ads", roles: ["admin", "moderator"] },
  { label: "Sellers", path: "/sellers", roles: ["admin", "moderator"] },
  { label: "Messages", path: "/messages", roles: ["moderator"] },
  { label: "Reports", path: "/reports", roles: ["moderator"] },
  { label: "Moderators", path: "/moderators", roles: ["admin"] },
  { label: "Categories", path: "/categories", roles: ["admin", "moderator"] },
  { label: "All Users", path: "/all-users", roles: ["admin"] },
  { label: "Settings", path: "/settings", roles: ["admin", "moderator"] },
];

export function getMenuForRole(role: UserRole): MenuItem[] {
  return menuItems.filter((item) => item.roles.includes(role));
}