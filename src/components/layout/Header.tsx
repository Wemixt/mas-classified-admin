import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-[96px] bg-white flex items-center px-6 xl:px-[160px] shadow-sm">
      {/* Logo */}
      <Link href="/" className="shrink-0">
        <Image
          src="/logos/mass logo.png"
          alt="MAS Logo"
          width={163}
          height={62}
          className="object-contain"
          priority
        />
      </Link>

      {/* All Ads Button - left:522 on 1728 design, logo ends at 323, gap=199px */}
      <Link
        href="/ads"
        className="ml-auto xl:ml-[199px] shrink-0 flex items-center justify-center w-[134px] h-[44px] rounded-[10px] bg-[#0F467F] text-white text-[20px] font-normal leading-[100%] tracking-normal hover:bg-[#0F467F]/90 transition-colors"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        All Ads
      </Link>

      <div className="flex-1" />

      {/* Right Section */}
      <div className="flex items-center shrink-0">
        {/* Profile Image - 38x38, radius 19px */}
        <div className="w-[38px] h-[38px] rounded-full overflow-hidden shrink-0">
          <Image
            src="/logos/mass logo.png"
            alt="Profile"
            width={38}
            height={38}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Profile Name - EuroStyle 20px #5E5E5E */}
        <span
          className="ml-[7px] text-[#5E5E5E] text-[20px] font-normal leading-[100%] tracking-normal whitespace-nowrap"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Ishan
        </span>

        {/* Notification Icon - 35x37 bg #E9E9E9 radius 4.22px */}
        <button className="relative ml-[30px] w-[35px] h-[37px] rounded-[4.22px] bg-[#E9E9E9] flex items-center justify-center hover:bg-[#DFDFDF] transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2C7.79 2 6 3.79 6 6V9.5L4.71 10.79C4.52 10.98 4.42 11.23 4.42 11.5V12.17C4.42 12.63 4.79 13 5.25 13H14.75C15.21 13 15.58 12.63 15.58 12.17V11.5C15.58 11.23 15.48 10.98 15.29 10.79L14 9.5V6C14 3.79 12.21 2 10 2Z"
              fill="#757575"
            />
            <path
              d="M10 18C11.1 18 12 17.1 12 16H8C8 17.1 8.9 18 10 18Z"
              fill="#757575"
            />
          </svg>
          {/* Badge - 12x12 navy circle */}
          <span className="absolute -top-[4px] -right-[4px] w-[12px] h-[12px] bg-[#0F467F] text-white text-[6px] font-bold leading-[150%] rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* Heart / Favorites Icon - 35x37 bg #E9E9E9 */}
        <button className="relative ml-[13px] w-[35px] h-[37px] rounded-[4.22px] bg-[#E9E9E9] flex items-center justify-center hover:bg-[#DFDFDF] transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
              fill="#757575"
            />
          </svg>
          {/* Badge - 12x12 navy circle */}
          <span className="absolute -top-[4px] -right-[4px] w-[12px] h-[12px] bg-[#0F467F] text-white text-[6px] font-bold leading-[150%] rounded-full flex items-center justify-center">
            1
          </span>
        </button>
      </div>
    </header>
  );
}
