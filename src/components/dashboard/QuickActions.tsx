"use client";

import Link from "next/link";
import { useAuth } from "@/hooks";
import type { UserRole } from "@/types";

interface QuickAction {
  label: string;
  icon: string;
  path: string;
}

const actionsByRole: Record<UserRole, QuickAction[]> = {
  admin: [
    { label: "Manage Moderator", icon: "moderator", path: "/moderators" },
    { label: "Manage sellers", icon: "sellers", path: "/sellers" },
    { label: "Ad Reports", icon: "reports", path: "/reports" },
    { label: "Add Categories", icon: "categories", path: "/categories" },
  ],
  moderator: [
    { label: "Review Ads", icon: "review", path: "/ad-review" },
    { label: "Manage sellers", icon: "sellers", path: "/sellers" },
    { label: "View Reports", icon: "reports", path: "/reports" },
    { label: "View Categories", icon: "categories", path: "/categories" },
  ],
};

function ActionIcon({ type }: { type: string }) {
  switch (type) {
    case "moderator":
    case "sellers":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/>
        </svg>
      );
    case "review":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h5v7l-2.5-1.5L12 12V5zM7 17l3.5-4.5 2.5 3.01L15.5 12l3.5 5H7z" fill="white"/>
        </svg>
      );
    case "reports":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z" fill="white"/>
        </svg>
      );
    case "categories":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="white"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function QuickActions() {
  const { role } = useAuth();
  const actions = actionsByRole[role];

  return (
    <div className="bg-[#DAECFF] rounded-[10px] overflow-hidden mt-4">
      {/* Header */}
      <div className="flex items-center justify-between h-[44px] md:h-[50px] px-[16px] md:px-[20px] bg-[#0F467F] rounded-t-[10px]">
        <span
          className="text-white text-[14px] md:text-[16px] font-medium leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Dashboard
        </span>
        <svg width="7" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Action buttons: 2×2 grid, responsive padding */}
      <div className="grid grid-cols-2 gap-[10px] md:gap-[16px] px-[16px] md:px-[34px] pt-[14px] md:pt-[18px] pb-[20px] md:pb-[32px]">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.path}
            className="flex items-center justify-center gap-[6px] md:gap-[8px] h-[38px] md:h-[42px] bg-[#1174BB] rounded-[8px] text-white text-[11px] md:text-[14px] font-medium leading-[100%] hover:bg-[#0E63A0] transition-colors px-[4px] text-center"
          >
            <ActionIcon type={action.icon} />
            <span className="leading-[1.2]">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
