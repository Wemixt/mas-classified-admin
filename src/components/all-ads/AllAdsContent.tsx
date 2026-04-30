"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { adsService } from "@/services/admin/ads.service";
import { AdminAd } from "@/types";
import toast from "react-hot-toast";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: string, currency: string): string {
  const numPrice = parseFloat(price);
  return `${currency} ${numPrice.toLocaleString("en-IN")}.00`;
}

// ─── Ad Thumbnail ─────────────────────────────────────────────────────────────

function AdThumbnail({ src, alt }: { src?: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  const Placeholder = () => (
    <div className="w-full h-full flex items-center justify-center bg-[#D9D9D9]">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#AAAAAA" strokeWidth="1.5" />
        <circle cx="8.5" cy="10.5" r="1.5" fill="#AAAAAA" />
        <path d="M3 16L8 11L11 14L15 10L21 16" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
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

function AdCard({ ad }: { ad: AdminAd }) {
  const locationText = ad.districtName && ad.cityName
      ? `${ad.cityName}, ${ad.districtName}`
      : ad.cityName || ad.districtName;

  return (
    <div className="bg-[#F4F4F4] rounded-[8px] flex items-stretch overflow-hidden cursor-pointer hover:shadow-md hover:bg-[#EBEBEB] transition-all duration-200 group min-h-[110px]">
      <AdThumbnail src={undefined} alt={ad.title} />

      <div className="flex flex-col flex-1 min-w-0 px-[14px] md:px-[18px] py-[14px] md:py-[16px]">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-[#1A1A1A] text-[14px] md:text-[15px] font-bold leading-[140%] tracking-normal line-clamp-2 group-hover:text-[#1174BB] transition-colors" style={{ fontFamily: "Eurostile, sans-serif" }}>
            {ad.title}
          </h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
            ad.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
            ad.status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            {ad.status.replace('_', ' ')}
          </span>
        </div>

        <span className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal leading-[100%] mt-[6px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
          {ad.condition.replace('_', ' ')} • {ad.categoryName}
        </span>

        {locationText && (
          <span className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal leading-[100%] mt-[8px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
            {locationText}
          </span>
        )}

        <div className="flex justify-between items-end mt-auto pt-[14px]">
          <span className="text-[#ED1C24] text-[13px] md:text-[14px] font-bold leading-[100%]" style={{ fontFamily: "Eurostile, sans-serif" }}>
            {formatPrice(ad.price, ad.currency)}
          </span>
          <span className="text-[#9E9E9E] text-[11px]">
            {new Date(ad.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function SearchIcon({ focused }: { focused: boolean }) {
  const color = focused ? "#1174BB" : "#9E9E9E";
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="9" cy="9" r="6.5" stroke={color} strokeWidth="1.8" />
      <path d="M14 14L18 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="5" height="9" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L7 7L1 13" stroke="#5E5E5E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AllAdsContent() {
  const [ads, setAds] = useState<AdminAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1
  });

  useEffect(() => {
    fetchAds(1);
  }, []);

  const fetchAds = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await adsService.getAdminAds(page, 20);
      setAds(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      toast.error("Failed to load ads");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAds = useMemo(() => {
    if (!searchQuery.trim()) return ads;
    const q = searchQuery.toLowerCase();
    return ads.filter(
      (ad) =>
        ad.title.toLowerCase().includes(q) ||
        ad.categoryName.toLowerCase().includes(q) ||
        ad.districtName.toLowerCase().includes(q) ||
        ad.cityName.toLowerCase().includes(q) ||
        ad.userName.toLowerCase().includes(q)
    );
  }, [searchQuery, ads]);

  return (
    <div className="py-4 md:pt-[28px] md:pb-[40px] px-4 md:pl-[28px] md:pr-4 w-full max-w-full overflow-hidden">
      <h1 className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal" style={{ fontFamily: "Eurostile, sans-serif" }}>
        All Ads
      </h1>

      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-[16px] sm:gap-[24px] mt-[24px]">
        <h2 className="text-[#1A1A1A] text-[20px] md:text-[22px] font-bold leading-[100%] tracking-normal whitespace-nowrap underline decoration-[#1A1A1A] underline-offset-[3px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
          All Categories
        </h2>

        <div className="flex-1">
          <div className={`flex items-center gap-[10px] h-[44px] md:h-[46px] rounded-[8px] border px-[14px] md:px-[16px] bg-white transition-all duration-150 ${
            searchFocused ? "border-[#1174BB] shadow-[0_0_0_3px_rgba(17,116,187,0.13)]" : "border-[#C5C5C5]"
          }`}>
            <SearchIcon focused={searchFocused} />
            <input
              type="text"
              placeholder="Search by title, category, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent text-[#242424] text-[13px] md:text-[14px] font-normal outline-none placeholder:text-[#B0B0B0]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[8px] mt-[14px] flex-wrap">
        <span className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal" style={{ fontFamily: "Eurostile, sans-serif" }}>All Categories</span>
        <Chevron />
        <span className="text-[#5E5E5E] text-[12px] md:text-[13px] font-normal" style={{ fontFamily: "Eurostile, sans-serif" }}>All ads in Sri Lanka</span>
        {searchQuery && (
          <>
            <Chevron />
            <span className="text-[#1174BB] text-[12px] md:text-[13px] font-normal" style={{ fontFamily: "Eurostile, sans-serif" }}>&ldquo;{searchQuery}&rdquo;</span>
          </>
        )}
      </div>

      <p className="text-[#5E5E5E] text-[12px] mt-[6px] opacity-70" style={{ fontFamily: "Eurostile, sans-serif" }}>
        {isLoading ? "Loading..." : `${filteredAds.length} result${filteredAds.length !== 1 ? "s" : ""} found`}
      </p>

      {isLoading ? (
        <div className="flex justify-center py-[100px]">
          <div className="w-10 h-10 border-4 border-[#1174BB] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredAds.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] md:gap-[16px] mt-[18px] md:mt-[22px]">
            {filteredAds.map((ad) => (
              <AdCard key={ad.uuid} ad={ad} />
            ))}
          </div>

          {meta.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={() => fetchAds(meta.page - 1)}
                disabled={meta.page === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-[#5E5E5E]">
                Page {meta.page} of {meta.totalPages}
              </span>
              <button 
                onClick={() => fetchAds(meta.page + 1)}
                disabled={meta.page === meta.totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-[60px] mt-[20px]">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-[14px] opacity-25">
            <circle cx="11" cy="11" r="7.5" stroke="#5E5E5E" strokeWidth="1.5" />
            <path d="M17 17L21 21" stroke="#5E5E5E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-[#5E5E5E] text-[14px] font-normal opacity-60 text-center" style={{ fontFamily: "Eurostile, sans-serif" }}>
            No ads found
          </p>
        </div>
      )}
    </div>
  );
}
