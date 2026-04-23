"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { getMenuForRole } from "@/config/menuConfig";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const { user, role } = useAuth();
  const pathname = usePathname();
  const menuItems = role ? getMenuForRole(role) : [];
  const { isOpen, close } = useSidebar();

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === "/" || pathname === "/dashboard";
    return pathname === path;
  };

  const SidebarContent = () => (
    <aside className="w-full h-full bg-[#1174BB] flex flex-col relative">
      {/* Close Button — inside sidebar, top-right corner, mobile only */}
      <button
        onClick={close}
        className="lg:hidden absolute top-[14px] right-[14px] z-10 w-[30px] h-[30px] bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Close sidebar"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L15 15M15 1L1 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Account Heading */}
      <h2
        className="text-white text-[20px] font-normal leading-[100%] tracking-normal pt-[24px] pb-[18px] pl-[20px] pr-[50px] lg:pr-[20px]"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Account
      </h2>

      {/* Menu Items */}
      <nav className="flex flex-col flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={item.label}>
            {index > 0 && (
              <div className="border-t border-white/15 mx-[14px]" />
            )}
            <Link
              href={item.path}
              onClick={close}
              className={`flex items-center justify-between h-[44px] mx-[8px] px-[12px] text-white text-[14px] font-normal leading-[100%] tracking-normal rounded-[6px] transition-colors ${
                isActive(item.path)
                  ? "bg-[#0E63A0]"
                  : "hover:bg-[#0E63A0]/50"
              }`}
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              {item.label}
              <svg width="7" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        ))}

        {/* Flexible gap — pushes Settings to the bottom */}
        <div className="flex-1" />

        {/* Settings row — pinned at bottom */}
        {/* Figma: avatar is a separate link to /profile; "Settings" text → /settings */}
        <div className="mx-[14px] border-t border-white/15" />
        <div className="flex items-center h-[56px] mx-[8px] mb-[8px] gap-[4px]">

          {/* ── Profile avatar — links to /profile ── */}
          <Link
            href="/profile"
            onClick={close}
            className={`shrink-0 w-[44px] h-[44px] flex items-center justify-center rounded-[6px] transition-colors ${
              isActive("/profile")
                ? "bg-[#0E63A0]"
                : "hover:bg-[#0E63A0]/50"
            }`}
            aria-label="Go to profile"
          >
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
              <Image
                src={user?.avatar || "/logos/mass logo.png"}
                alt="Profile"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>

          {/* ── Settings text + chevron — links to /settings ── */}
          <Link
            href="/settings"
            onClick={close}
            className={`flex-1 flex items-center justify-between h-[44px] px-[10px] rounded-[6px] transition-colors ${
              isActive("/settings")
                ? "bg-[#0E63A0]"
                : "hover:bg-[#0E63A0]/50"
            }`}
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            <span
              className="text-white text-[16px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Settings
            </span>
            <svg width="7" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

        </div>
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible ≥ lg */}
      <div className="hidden lg:block w-[260px] xl:w-[390px] shrink-0 h-full">
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Mobile Drawer — slides in from left */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-[280px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}
