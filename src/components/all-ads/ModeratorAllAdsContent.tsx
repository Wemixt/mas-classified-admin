"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AllAd {
  id: string;
  title: string;
  condition: "Brand New" | "Used";
  location: string;
  category: string;
  price: number;
  image: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const allAdsData: AllAd[] = [
  {
    id: "1",
    title: "Dell inspire i7 11th Gen Laptop...",
    condition: "Brand New",
    location: "Kurunegala",
    category: "",
    price: 1195000,
    image: "",
  },
  {
    id: "2",
    title: "JBL T50 Bluetooth Wireless...",
    condition: "Used",
    location: "Mullativu",
    category: "Motorbikes",
    price: 35000,
    image: "",
  },
  {
    id: "3",
    title: "Cotten M T shirt - Hi quality..",
    condition: "Brand New",
    location: "Rajagiriya",
    category: "",
    price: 2500,
    image: "",
  },
  {
    id: "4",
    title: "Rent a car Raize 202....",
    condition: "Used",
    location: "Mullativu",
    category: "Motorbikes",
    price: 35000,
    image: "",
  },
  {
    id: "5",
    title: "Samsung Galaxy S23 Ultra 256GB...",
    condition: "Used",
    location: "Colombo",
    category: "Mobile Phones",
    price: 185000,
    image: "",
  },
  {
    id: "6",
    title: "Apple MacBook Pro M2 14 inch...",
    condition: "Brand New",
    location: "Kandy",
    category: "Laptops",
    price: 520000,
    image: "",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return `Rs.${price.toLocaleString("en-IN")}.00`;
}

// ─── Ad Thumbnail ─────────────────────────────────────────────────────────────

function AdThumbnail({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  const Placeholder = () => (
    <div className="w-full h-full flex items-center justify-center bg-[#D9D9D9]">
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="#AAAAAA"
          strokeWidth="1.5"
        />
        <circle cx="8.5" cy="10.5" r="1.5" fill="#AAAAAA" />
        <path
          d="M3 16L8 11L11 14L15 10L21 16"
          stroke="#AAAAAA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return (
    /* Figma shows thumbnail ~160px wide × full card height */
    <div className="w-[140px] md:w-[160px] shrink-0 self-stretch rounded-[6px] overflow-hidden bg-[#D9D9D9]">
      {!src || imgError ? (
        <Placeholder />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={160}
          height={120}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}

// ─── Ad Card ─────────────────────────────────────────────────────────────────

function AdCard({ ad }: { ad: AllAd }) {
  const locationText =
    ad.location && ad.category
      ? `${ad.location}, ${ad.category}`
      : ad.location || ad.category;

  return (
    <div className="bg-[#F4F4F4] rounded-[8px] flex items-stretch overflow-hidden cursor-pointer hover:shadow-md hover:bg-[#EBEBEB] transition-all duration-200 group min-h-[110px]">
      {/* Thumbnail — flush left, full height */}
      <AdThumbnail src={ad.image} alt={ad.title} />

      {/* Info block */}
      <div className="flex flex-col flex-1 min-w-0 px-[14px] md:px-[18px] py-[14px] md:py-[16px]">
        {/* Title */}
        <h3
          className="text-[#1A1A1A] text-[14px] md:text-[15px] font-bold leading-[140%] tracking-normal line-clamp-2 group-hover:text-[#1174BB] transition-colors"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          {ad.title}
        </h3>

        {/* Condition */}
        <span
          className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal leading-[100%] mt-[6px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          {ad.condition}
        </span>

        {/* Location & Category */}
        {locationText && (
          <span
            className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal leading-[100%] mt-[8px]"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            {locationText}
          </span>
        )}

        {/* Price */}
        <span
          className="text-[#ED1C24] text-[13px] md:text-[14px] font-bold leading-[100%] mt-auto pt-[14px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          {formatPrice(ad.price)}
        </span>
      </div>
    </div>
  );
}

// ─── Search Icon ─────────────────────────────────────────────────────────────

function SearchIcon({ focused }: { focused: boolean }) {
  const color = focused ? "#1174BB" : "#9E9E9E";
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="6.5" stroke={color} strokeWidth="1.8" />
      <path
        d="M14 14L18 18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Breadcrumb Chevron ───────────────────────────────────────────────────────

function Chevron() {
  return (
    <svg
      width="5"
      height="9"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7L1 13"
        stroke="#5E5E5E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ModeratorAllAdsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredAds = useMemo(() => {
    if (!searchQuery.trim()) return allAdsData;
    const q = searchQuery.toLowerCase();
    return allAdsData.filter(
      (ad) =>
        ad.title.toLowerCase().includes(q) ||
        ad.category.toLowerCase().includes(q) ||
        ad.location.toLowerCase().includes(q) ||
        ad.condition.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="py-4 md:pt-[28px] md:pb-[40px] px-4 md:pl-[28px] md:pr-4 w-full max-w-full overflow-hidden">

      {/* ── Page Title ── */}
      <h1
        className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        All Ads
      </h1>

      {/* ── Divider ── */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* ── "All Categories" heading + Search Row ── */}
      {/*
          Figma: heading is ~22–24px bold on the left, search input is wide
          and stretches to fill remaining space. They sit on the same row.
      */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-[16px] sm:gap-[24px] mt-[24px]">

        {/* "All Categories" — bold, larger, underlined (Figma uses text-decoration underline) */}
        <h2
          className="text-[#1A1A1A] text-[20px] md:text-[22px] font-bold leading-[100%] tracking-normal whitespace-nowrap underline decoration-[#1A1A1A] underline-offset-[3px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          All Categories
        </h2>

        {/* Search Input — tall rounded, takes remaining space */}
        <div className="flex-1">
          <div
            className={`flex items-center gap-[10px] h-[44px] md:h-[46px] rounded-[8px] border px-[14px] md:px-[16px] bg-white transition-all duration-150 ${
              searchFocused
                ? "border-[#1174BB] shadow-[0_0_0_3px_rgba(17,116,187,0.13)]"
                : "border-[#C5C5C5]"
            }`}
          >
            <SearchIcon focused={searchFocused} />
            <input
              id="all-ads-search"
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent text-[#242424] text-[13px] md:text-[14px] font-normal outline-none placeholder:text-[#B0B0B0]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="shrink-0 w-[18px] h-[18px] rounded-full bg-[#CCCCCC] hover:bg-[#BBBBBB] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 9M9 1L1 9"
                    stroke="#555"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-[8px] mt-[14px] flex-wrap">
        <span
          className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          All Categories
        </span>
        <Chevron />
        <span
          className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          All ads in Srilanka
        </span>
        {searchQuery && (
          <>
            <Chevron />
            <span
              className="text-[#1174BB] text-[12px] md:text-[13px] font-normal leading-[100%]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              &ldquo;{searchQuery}&rdquo;
            </span>
          </>
        )}
      </div>

      {/* ── Search result count ── */}
      {searchQuery && (
        <p
          className="text-[#5E5E5E] text-[12px] mt-[6px] opacity-70"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          {filteredAds.length} result{filteredAds.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* ── Ads Grid ── */}
      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] md:gap-[16px] mt-[18px] md:mt-[22px]">
          {filteredAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-[60px] mt-[20px]">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-[14px] opacity-25"
          >
            <circle cx="11" cy="11" r="7.5" stroke="#5E5E5E" strokeWidth="1.5" />
            <path
              d="M17 17L21 21"
              stroke="#5E5E5E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8.5 11.5H13.5M11 9V14"
              stroke="#5E5E5E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p
            className="text-[#5E5E5E] text-[14px] font-normal opacity-60 text-center"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            No ads found for &ldquo;{searchQuery}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
