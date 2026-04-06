"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks";
import { useSidebar } from "@/context/SidebarContext";

export default function Header() {
  const { user } = useAuth();
  const { toggle } = useSidebar();

  return (
    <header 
      suppressHydrationWarning
      className="w-full bg-white border-b border-[#E0E0E0] shrink-0"
    >
      {/*
        Layout strategy — single flat flex row, all elements shrink-0 except
        the two flex-1 spacer divs which absorb leftover space.

        [hamburger] [logo] [flex-1] [All Ads] [flex-1-sm] [avatar?] [name] [bell] [heart]

        At 320px (288px usable after px-3 padding):
          hamburger(26) + gap(6) + logo(68) + spacer + AllAds(58) + gap(6) + bell(24) + gap(4) + heart(24) = ~216px min → fits
        Avatar + name are hidden below sm (640px) but bell+heart always visible.
        Name hidden below sm. Avatar hidden below sm.
      */}
      <div
        className="
          flex items-center w-full
          h-[58px] px-3
          sm:h-[68px] sm:px-4
          md:h-[80px] md:px-6
          xl:h-[96px] xl:px-[65px]
        "
      >

        {/* ── Hamburger: mobile/tablet only (< lg) ── */}
        <button
          onClick={toggle}
          className="lg:hidden flex-shrink-0 flex flex-col justify-center items-center gap-[4px]
            w-[27px] h-[27px]
            sm:w-[32px] sm:h-[32px]
            rounded-[5px] hover:bg-[#F0F0F0] transition-colors mr-[6px] sm:mr-[10px]"
          aria-label="Toggle menu"
        >
          <span className="block w-[16px] sm:w-[18px] h-[2px] bg-[#0F467F] rounded-full" />
          <span className="block w-[16px] sm:w-[18px] h-[2px] bg-[#0F467F] rounded-full" />
          <span className="block w-[16px] sm:w-[18px] h-[2px] bg-[#0F467F] rounded-full" />
        </button>

        {/* ── Logo ── */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logos/mass logo.png"
            alt="MAS Logo"
            width={156}
            height={60}
            priority
            className="object-contain h-auto
              w-[68px]
              sm:w-[96px]
              md:w-[120px]
              xl:w-[156px]"
          />
        </Link>

        {/* ── Flex spacer: pushes All Ads away from logo ── */}
        <div className="flex-1" />

        {/* ── All Ads button ── */}
        <Link
          href="/ads"
          className="flex-shrink-0 flex items-center justify-center rounded-[8px] xl:rounded-[10px]
            bg-[#0F467F] text-white font-normal leading-[100%] tracking-normal
            hover:bg-[#0F467F]/90 transition-colors
            w-[58px] h-[26px] text-[10px]
            sm:w-[75px] sm:h-[32px] sm:text-[13px]
            md:w-[80px] md:h-[36px] md:text-[14px]
            xl:w-[100px] xl:h-[40px] xl:text-[16px] xl:-translate-x-68"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          All Ads
        </Link>

        {/* ── Spacer between All Ads and right section ── */}
        <div className="flex-1 max-w-[12px] sm:max-w-none" />

        {/* ── Avatar (hidden below sm) ── */}
        <div className="hidden sm:block flex-shrink-0 rounded-full overflow-hidden
          w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] xl:w-[38px] xl:h-[38px]
          mr-[6px] xl:mr-[7px]">
          <Image
            src={user?.avatar || "/logos/mass logo.png"}
            alt="Profile"
            width={38}
            height={38}
            className="object-cover w-full h-full"
          />
        </div>

        {/* ── Name (hidden below md) ── */}
        <span
          className="hidden md:block flex-shrink-0 text-[#5E5E5E] font-normal leading-[100%] tracking-normal whitespace-nowrap
            text-[14px] md:text-[16px] xl:text-[20px]
            mr-[10px] xl:mr-[30px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          {user?.fullName || "Guest Account"}
        </span>

        {/* ── Notification bell (always visible) ── */}
        <button
          className="flex-shrink-0 relative flex items-center justify-center rounded-[4px] bg-[#E9E9E9] hover:bg-[#DFDFDF] transition-colors
            w-[26px] h-[26px]
            sm:w-[29px] sm:h-[30px]
            md:w-[32px] md:h-[34px]
            xl:w-[35px] xl:h-[37px]"
        >
          <svg
            viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] md:w-[17px] md:h-[17px] xl:w-[18px] xl:h-[18px]"
          >
            <path d="M10 2C7.79 2 6 3.79 6 6V9.5L4.71 10.79C4.52 10.98 4.42 11.23 4.42 11.5V12.17C4.42 12.63 4.79 13 5.25 13H14.75C15.21 13 15.58 12.63 15.58 12.17V11.5C15.58 11.23 15.48 10.98 15.29 10.79L14 9.5V6C14 3.79 12.21 2 10 2Z" fill="#757575" />
            <path d="M10 18C11.1 18 12 17.1 12 16H8C8 17.1 8.9 18 10 18Z" fill="#757575" />
          </svg>
          <span className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] xl:w-[12px] xl:h-[12px] bg-[#0F467F] text-white text-[5px] xl:text-[6px] font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* ── Heart / Favorites (always visible) ── */}
        <button
          className="flex-shrink-0 relative flex items-center justify-center rounded-[4px] bg-[#E9E9E9] hover:bg-[#DFDFDF] transition-colors
            w-[26px] h-[26px]
            sm:w-[29px] sm:h-[30px]
            md:w-[32px] md:h-[34px]
            xl:w-[35px] xl:h-[37px]
            ml-[4px] sm:ml-[6px] md:ml-[8px] xl:ml-[13px]"
        >
          <svg
            viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] md:w-[17px] md:h-[17px] xl:w-[18px] xl:h-[18px]"
          >
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#757575" />
          </svg>
          <span className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] xl:w-[12px] xl:h-[12px] bg-[#0F467F] text-white text-[5px] xl:text-[6px] font-bold rounded-full flex items-center justify-center">
            1
          </span>
        </button>

      </div>
    </header>
  );
}
