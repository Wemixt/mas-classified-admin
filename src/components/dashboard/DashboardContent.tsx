"use client";

import { useAuth } from "@/hooks";
import StatCard from "./StatCard";
import QuickActions from "./QuickActions";
import AdStatistics from "./AdStatistics";
import RecentAds from "./RecentAds";
import RecentActivity from "./RecentActivity";
import Messages from "./Messages";

const stats = [
  { value: 245, label: "Total Ads", bgColor: "#0F467F" },
  { value: 180, label: "Published Ads", bgColor: "#1174BB" },
  { value: 26, label: "Pending Ads", bgColor: "#005AA1" },
  { value: 11, label: "Rejected Ads", bgColor: "#0F467F" },
];

export default function DashboardContent() {
  const { role } = useAuth();

  return (
    <div className="py-[28px] pl-[28px]">
      {/* Title */}
      <h1
        className="text-[#333333] text-[28px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Dashboard
      </h1>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Subtitle */}
      <p
        className="text-[#333333] text-[14px] font-normal leading-[100%] tracking-normal opacity-60 mt-[10px]"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Overview Of ad and user statistics in your marketplace.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-[16px] mt-[20px]">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* 2-Column Layout: both columns equal height, bottom cards stretch to align */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] mt-[20px]">
        <div className="flex flex-col gap-[16px]">
          <QuickActions />
          <div className="flex-1 flex flex-col">
            <RecentAds />
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <AdStatistics />
          <div className="flex-1 flex flex-col">
            {role === "admin" ? <RecentActivity /> : <Messages />}
          </div>
        </div>
      </div>
    </div>
  );
}
