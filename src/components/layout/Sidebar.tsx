"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { getMenuForRole } from "@/config/menuConfig";

export default function Sidebar() {
  const { user, role } = useAuth();
  const pathname = usePathname();
  const menuItems = getMenuForRole(role);

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === "/" || pathname === "/dashboard";
    return pathname === path;
  };

  return (
    <aside className="w-[390px] bg-[#1174BB] flex flex-col shrink-0">
      {/* Account Heading */}
      <h2
        className="text-white text-[20px] font-normal leading-[100%] tracking-normal pt-[24px] pb-[18px] pl-[20px]"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Account
      </h2>

      {/* Menu Items */}
      <nav className="flex flex-col flex-1">
        {menuItems.map((item, index) => (
          <div key={item.label}>
            {index > 0 && (
              <div className="border-t border-white/15 mx-[14px]" />
            )}
            <Link
              href={item.path}
              className={`flex items-center justify-between h-[44px] mx-[8px] px-[12px] text-white text-[14px] font-normal leading-[100%] tracking-normal rounded-[6px] transition-colors ${
                isActive(item.path)
                  ? "bg-[#0E63A0]"
                  : "hover:bg-[#0E63A0]/50"
              }`}
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              {item.label}
              <svg
                width="7"
                height="12"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* My Profile */}
        <div className="border-t border-[#FAFAFA]/30 mx-[20px]" />
        <Link
          href="/profile"
          className="flex items-center gap-[10px] h-[50px] px-[20px] hover:bg-[#0E63A0]/50 transition-colors"
        >
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0">
            <Image
              src={user.avatar || "/logos/mass logo.png"}
              alt="Profile"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span
            className="text-[#FAFAFA] text-[16px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            My Profile
          </span>
        </Link>
      </nav>
    </aside>
  );
}
