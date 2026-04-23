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
    { label: "Ads review", icon: "review", path: "/ad-review" },
    { label: "Manage\nModerator", icon: "moderator", path: "/moderators" },
    { label: "Setting", icon: "setting", path: "/settings" },
    { label: "View\nCategories", icon: "categories", path: "/categories" },
  ],
  moderator: [
    { label: "Ads review", icon: "review", path: "/ad-review" },
    { label: "Manage\nsellers", icon: "sellers", path: "/sellers" },
    { label: "Setting", icon: "setting", path: "/settings" },
    { label: "View\nCategories", icon: "categories", path: "/categories" },
  ],
  super_admin: [
    { label: "Ads review", icon: "review", path: "/ad-review" },
    { label: "Manage\nModerator", icon: "moderator", path: "/moderators" },
    { label: "Setting", icon: "setting", path: "/settings" },
    { label: "View\nCategories", icon: "categories", path: "/categories" },
  ],
};

function ActionIcon({ type }: { type: string }) {
  switch (type) {
    case "review":
      return (
        <svg width="42" height="42" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H28V22H14L4 29V4Z" fill="white"/>
          <path d="M16 9L17.5 14.5L23 16L17.5 17.5L16 23L14.5 17.5L9 16L14.5 14.5L16 9Z" fill="#13467B"/>
        </svg>
      );
    case "moderator":
    case "sellers":
      return (
        <svg width="42" height="42" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="11" r="5" />
          <path d="M3 25C3 20.5 9 18 12 18C14.2 18 16.5 18.8 18.2 20.2C17.5 21.6 17.1 23.2 17.3 25H3Z" />
          <path d="M30 22.5l-1.5-.5c-.2-.6-.5-1.1-.9-1.6l1-1.4-2-2-1.4 1c-.5-.4-1-.7-1.6-.9l-.5-1.5h-2.8l-.5 1.5c-.6.2-1.1.5-1.6.9l-1.4-1-2 2 1 1.4c-.4.5-.7 1-.9 1.6l-1.5.5v2.8l1.5.5c.2.6.5 1.1.9 1.6l-1 1.4 2 2 1.4-1c.5.4 1 .7 1.6.9l.5 1.5h2.8l.5-1.5c.6-.2 1.1-.5 1.6-.9l1.4 1 2-2-1-1.4c.4-.5.7-1 .9-1.6l1.5-.5v-2.8zM24.6 26c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4 1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4z"/>
        </svg>
      );
    case "setting":
      return (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
        </svg>
      );
    case "categories":
      return (
        <svg width="42" height="42" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2 L28 17 H4 Z" />
          <rect x="5" y="20" width="10" height="10" />
          <circle cx="23" cy="25" r="5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function QuickActions() {
  const { role } = useAuth();
  const actions = role ? actionsByRole[role as UserRole] || actionsByRole["admin"] : actionsByRole["admin"];

  return (
    <div className="bg-[#E2F0FF] rounded-[10px] overflow-hidden mt-4 shadow-sm border border-[#C6E0FF]">
      {/* Header */}
      <div className="flex items-center justify-between h-[54px] md:h-[64px] px-[20px] md:px-[24px] bg-[#0F467F]">
        <span
          className="text-white text-[18px] md:text-[22px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Dashboard
        </span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[16px] p-[16px] md:p-[24px]">
        {(actions || []).map((action) => (
          <Link
            key={action.label}
            href={action.path}
            className="flex flex-col items-center justify-center gap-[12px] md:gap-[16px] h-[110px] md:h-[134px] bg-[#13467B] rounded-[8px] text-white text-[13px] md:text-[15px] font-semibold hover:bg-[#0E355F] transition-colors p-[12px] text-center shadow-md"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <ActionIcon type={action.icon} />
            <span className="leading-[1.2] whitespace-pre-wrap">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
