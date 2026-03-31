"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { getMenuForRole } from "@/config/menuConfig";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const { user, role, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = getMenuForRole(role);
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* My Profile */}
        <div className="border-t border-[#FAFAFA]/30 mx-[20px]" />
        <Link
          href="/profile"
          onClick={close}
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
        
        {/* Logout */}
        <button
          onClick={async () => {
            await logout();
            document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            router.push("/login");
            close();
          }}
          className="flex items-center gap-[10px] h-[50px] px-[20px] hover:bg-[#0E63A0]/50 transition-colors w-full text-left pb-[6px]"
        >
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span
            className="text-[#FAFAFA] text-[16px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Logout
          </span>
        </button>
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
