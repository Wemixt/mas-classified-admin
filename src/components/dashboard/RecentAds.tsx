"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { dashboardService } from "@/services/dashboard.service";
import { RecentAd } from "@/types";

export default function RecentAds() {
  const [ads, setAds] = useState<RecentAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentAds = async () => {
      try {
        setIsLoading(true);
        const response = await dashboardService.getRecentAds();
        if (response.success) {
          setAds(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching recent ads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentAds();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[10px] overflow-hidden border-[0.5px] border-[#6C6C6C] h-full flex flex-col mt-4 p-8 items-center justify-center">
        <p className="text-[#5E5E5E]">Loading recent ads...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[10px] overflow-hidden border-[0.5px] border-[#6C6C6C] h-full flex flex-col mt-4">
      {/* Header */}
      <div className="flex items-center justify-between h-[44px] md:h-[50px] px-[16px] md:px-[20px] bg-[#0F467F] mb-4 md:mb-6 shrink-0">
        <h3
          className="text-white text-[16px] md:text-[20px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Recent Ads
        </h3>
        <Link
          href="/published-ads"
          className="text-white text-[11px] md:text-[12px] font-normal leading-[150%] hover:underline transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Ad items */}
      <div className="flex flex-col flex-1 overflow-y-auto max-h-[400px]">
        {ads.length === 0 ? (
          <div className="p-8 text-center text-[#5E5E5E]">No recent ads found</div>
        ) : (
          ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`px-[14px] md:px-[20px] py-[10px] md:py-[14px] ${
                index < ads.length - 1 ? "border-b border-[#E8E8E8] mb-2 md:mb-3" : ""
              }`}
            >
              <div className="flex gap-[10px] md:gap-[14px]">
                {/* Product image: responsive size */}
                <div className="w-[60px] md:w-[77px] h-[64px] md:h-[81px] rounded-[4px] overflow-hidden bg-[#F0F0F0] shrink-0 relative">
                  <Image
                    src={ad.imageUrl || "/images/placeholder-car.jpg"}
                    alt={ad.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  {/* Title row with date */}
                  <div className="flex items-start justify-between gap-[6px]">
                    <p className="text-[#000000] text-[13px] md:text-[16px] font-semibold leading-[150%] truncate">
                      {ad.title}
                    </p>
                    <span className="text-[#5E5E5E] text-[9px] md:text-[10px] font-semibold leading-[150%] shrink-0 pt-[3px]">
                      {formatDate(ad.createdAt)}
                    </span>
                  </div>
                  {/* Category */}
                  <span className="text-[#5E5E5E] text-[9px] md:text-[10px] font-normal leading-[150%] block">
                    {ad.categoryName}
                  </span>
                  {/* Price + button row */}
                  <div className="flex items-center justify-between mt-[2px]">
                    <p className="text-[#ED1C24] text-[13px] md:text-[18px] font-medium leading-[150%]">
                      Rs.{parseFloat(ad.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <Link
                      href={`/all-ads?search=${ad.title}`}
                      className="flex items-center justify-center w-[80px] md:w-[110px] h-[26px] md:h-[30px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[10px] md:text-[12px] font-normal leading-[150%] hover:bg-[#C0C0C0] transition-colors shrink-0"
                    >
                      View Ad details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
