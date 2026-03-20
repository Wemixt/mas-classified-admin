"use client";

import { useState } from "react";

const weeklyData = [
  { day: "Monday", published: 67, pending: 15 },
  { day: "Tuesday", published: 74, pending: 8 },
  { day: "Wednesday", published: 52, pending: 10 },
  { day: "Thursday", published: 71, pending: 12 },
  { day: "Friday", published: 65, pending: 5 },
  { day: "Saturday", published: 74, pending: 20 },
  { day: "Sunday", published: 83, pending: 35 },
];

const dayLabelShort = (day: string) => day.slice(0, 3); // Mon, Tue etc.

export default function AdStatistics() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const maxValue = 90;
  const yTicks = [90, 80, 70, 60, 50, 0];
  // Chart height: shorter on mobile (140px), full size on md+
  const chartHeightMobile = 130;
  const chartHeightDesktop = 180;

  return (
    <div className="bg-[#DAECFF] rounded-[10px] p-[14px] md:p-[20px] pb-[12px] md:pb-[16px] mt-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-[12px] md:mb-[16px]">
        <h3 className="text-[#202020] text-[16px] md:text-[20px] font-semibold leading-[1.3]">
          Ad Statistics
        </h3>
        {/* Period toggle */}
        <div className="flex items-center gap-[2px]">
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-[10px] md:px-[16px] py-[5px] flex items-center justify-center rounded-[10px] text-[10px] leading-[100%] transition-colors ${
              period === "weekly"
                ? "bg-[#1174BB] text-white font-medium"
                : "text-[#000000] font-normal hover:opacity-70"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-[8px] md:px-[12px] py-[5px] flex items-center justify-center rounded-[10px] text-[10px] leading-[100%] transition-colors ${
              period === "monthly"
                ? "bg-[#1174BB] text-white font-medium"
                : "text-[#000000] font-normal hover:opacity-70"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart area — using CSS custom property via inline style for height */}
      <div className="flex">
        {/* Y-axis labels */}
        <div
          className="flex flex-col justify-between pr-[6px] md:pr-[8px]"
          style={{ height: `${chartHeightMobile}px` }}
        >
          {yTicks.map((v) => (
            <span key={v} className="text-[8px] md:text-[9px] text-[#999999] leading-none text-right min-w-[14px] font-normal">
              {v}
            </span>
          ))}
        </div>

        {/* Chart + X-axis — mobile version */}
        <div className="flex-1 flex flex-col md:hidden">
          <div className="relative" style={{ height: `${chartHeightMobile}px` }}>
            {yTicks.map((v) => (
              <div
                key={v}
                className={`absolute left-0 right-0 border-t ${v === 0 ? "border-[#BBBBBB]/60" : "border-[#CCCCCC]/25"}`}
                style={{ top: `${((maxValue - v) / maxValue) * chartHeightMobile}px` }}
              />
            ))}
            <div
              className="absolute left-0 right-0 border-t-[1.5px] border-dashed border-[#90B8D8]/60"
              style={{ top: `${((maxValue - 65) / maxValue) * chartHeightMobile}px` }}
            />
            <div className="absolute inset-0 flex items-end justify-around px-[2px]">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex items-end gap-[2px]">
                  <div
                    className="w-[8px] bg-[#0095FF] rounded-[2px]"
                    style={{ height: `${(item.published / maxValue) * chartHeightMobile}px` }}
                  />
                  <div
                    className="w-[8px] bg-[#00E096] rounded-[2px]"
                    style={{ height: `${(item.pending / maxValue) * chartHeightMobile}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* X-axis — short labels on mobile */}
          <div className="flex justify-around pt-[8px] px-[2px]">
            {weeklyData.map((item) => (
              <span key={item.day} className="text-[8px] text-[#555555] text-center font-normal leading-[1.2]">
                {dayLabelShort(item.day)}
              </span>
            ))}
          </div>
        </div>

        {/* Chart + X-axis — desktop version */}
        <div className="hidden md:flex flex-1 flex-col">
          <div className="relative" style={{ height: `${chartHeightDesktop}px` }}>
            {yTicks.map((v) => (
              <div
                key={v}
                className={`absolute left-0 right-0 border-t ${v === 0 ? "border-[#BBBBBB]/60" : "border-[#CCCCCC]/25"}`}
                style={{ top: `${((maxValue - v) / maxValue) * chartHeightDesktop}px` }}
              />
            ))}
            <div
              className="absolute left-0 right-0 border-t-[1.5px] border-dashed border-[#90B8D8]/60"
              style={{ top: `${((maxValue - 65) / maxValue) * chartHeightDesktop}px` }}
            />
            <div className="absolute inset-0 flex items-end justify-around px-[4px]">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex items-end gap-[3px]">
                  <div
                    className="w-[12px] bg-[#0095FF] rounded-[2px]"
                    style={{ height: `${(item.published / maxValue) * chartHeightDesktop}px` }}
                  />
                  <div
                    className="w-[12px] bg-[#00E096] rounded-[2px]"
                    style={{ height: `${(item.pending / maxValue) * chartHeightDesktop}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-around pt-[10px] px-[4px]">
            {weeklyData.map((item) => (
              <span key={item.day} className="text-[10px] text-[#555555] text-center font-normal whitespace-pre-line leading-[1.2]">
                {item.day === "Wednesday" ? "Wednes\nday" : item.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-[20px] md:gap-[28px] mt-[12px] md:mt-[16px]">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] md:w-[10px] h-[8px] md:h-[10px] rounded-full bg-[#0095FF] shrink-0" />
          <span className="text-[9px] md:text-[10px] text-[#555555] font-normal">Published ad</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] md:w-[10px] h-[8px] md:h-[10px] rounded-full bg-[#00E096] shrink-0" />
          <span className="text-[9px] md:text-[10px] text-[#555555] font-normal">Pending ads</span>
        </div>
      </div>
    </div>
  );
}
