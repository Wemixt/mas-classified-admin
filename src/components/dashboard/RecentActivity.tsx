"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { dashboardService } from "@/services/dashboard.service";
import { RecentAd } from "@/types";

function ClockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
      <path d="M6 3V6.5L8.5 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<RecentAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const response = await dashboardService.getRecentAds();
        if (response.success) {
          setActivities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="bg-[#EAEAEA] rounded-[10px] overflow-hidden h-full flex flex-col mt-4 p-8 items-center justify-center">
        <p className="text-[#5E5E5E]">Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#EAEAEA] rounded-[10px] overflow-hidden h-full flex flex-col mt-4">
      {/* Header */}
      <div className="flex items-center justify-between h-[44px] md:h-[50px] px-[16px] md:px-[20px] bg-[#0F467F] shrink-0">
        <h3
          className="text-white text-[14px] md:text-[20px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Recent User Activity
        </h3>
        <Link
          href="/all-ads"
          className="text-white text-[11px] md:text-[12px] font-normal leading-[150%] hover:underline flex items-center gap-[4px]"
        >
          View All
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Activity items */}
      <div className="flex flex-col flex-1 overflow-y-auto max-h-[500px]">
        {activities.length === 0 ? (
          <div className="p-8 text-center text-[#5E5E5E]">No recent activity found</div>
        ) : (
          activities.map((ad, index) => (
            <div
              key={ad.id}
              className={`flex gap-[10px] md:gap-[12px] px-[14px] md:px-[20px] py-[10px] md:py-[12px] ${
                index < activities.length - 1 ? "border-b border-[#D8D8D8]" : ""
              }`}
            >
              {/* Avatar: Placeholder based on initial */}
              <div className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] rounded-full overflow-hidden bg-[#D0D0D0] shrink-0 flex items-center justify-center text-[#0F467F] font-bold text-[14px]">
                {ad.sellerName.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* User + action */}
                <p className="text-[11px] md:text-[12px] leading-[150%]">
                  <span className="font-semibold text-[#000000]">{ad.sellerName}</span>{" "}
                  <span className="font-semibold text-[#000000]">published a new ad:</span>
                </p>

                {/* Detail */}
                <p className="text-[#000000] text-[9px] md:text-[10px] font-normal leading-[150%] mt-[1px]">
                  "{ad.title}" in {ad.categoryName}
                </p>

                {/* Status Badge */}
                <div className="mt-1">
                  <span className={`text-[8px] px-2 py-0.5 rounded-full ${
                    ad.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ad.status}
                  </span>
                </div>

                {/* Footer timestamp */}
                <div className="flex items-center justify-end gap-[4px] md:gap-[6px] mt-[3px] flex-wrap">
                  <span className="text-[9px] md:text-[10px] font-semibold leading-[150%] text-[#000000]/60">
                    {formatDate(ad.createdAt)}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-[#000000]/60">&gt;</span>
                  <span className="text-[8px] font-normal leading-[150%] text-[#000000]/80 flex items-center gap-[3px]">
                    <ClockIcon />
                    {formatDate(ad.createdAt)} at {formatTime(ad.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
