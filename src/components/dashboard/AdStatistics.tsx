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

const dayLabel = (day: string) => {
  if (day === "Wednesday") return "Wednes\nday";
  return day;
};

export default function AdStatistics() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const maxValue = 90;
  const yTicks = [90, 80, 70, 60, 50, 0];
  const chartHeight = 180;

  return (
    <div className="bg-[#DAECFF] rounded-[10px] p-[20px] pb-[16px] mt-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-[16px]">
        <h3 className="text-[#202020] text-[20px] font-semibold leading-[32px]">
          Ad Statistics
        </h3>
        {/* Toggle: pill shape */}
        <div className="flex items-center gap-[2px]">
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-[16px] py-[5px] flex items-center justify-center rounded-[10px] text-[10px] leading-[100%] transition-colors ${
              period === "weekly"
                ? "bg-[#1174BB] text-white font-medium"
                : "text-[#000000] font-normal hover:opacity-70"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-[12px] py-[5px] flex items-center justify-center rounded-[10px] text-[10px] leading-[100%] transition-colors ${
              period === "monthly"
                ? "bg-[#1174BB] text-white font-medium"
                : "text-[#000000] font-normal hover:opacity-70"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart area */}
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pr-[8px]" style={{ height: `${chartHeight}px` }}>
          {yTicks.map((v) => (
            <span key={v} className="text-[9px] text-[#999999] leading-none text-right min-w-[14px] font-normal">
              {v}
            </span>
          ))}
        </div>

        {/* Chart + X-axis */}
        <div className="flex-1 flex flex-col">
          {/* Bars area with horizontal grid lines */}
          <div className="relative" style={{ height: `${chartHeight}px` }}>
            {/* Horizontal grid lines */}
            {yTicks.map((v) => (
              <div
                key={v}
                className={`absolute left-0 right-0 border-t ${
                  v === 0 ? "border-[#BBBBBB]/60" : "border-[#CCCCCC]/25"
                }`}
                style={{ top: `${((maxValue - v) / maxValue) * chartHeight}px` }}
              />
            ))}

            {/* Dashed average trend line at ~65 */}
            <div
              className="absolute left-0 right-0 border-t-[1.5px] border-dashed border-[#90B8D8]/60"
              style={{ top: `${((maxValue - 65) / maxValue) * chartHeight}px` }}
            />

            {/* Bar groups */}
            <div className="absolute inset-0 flex items-end justify-around px-[4px]">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex items-end gap-[3px]">
                  <div
                    className="w-[12px] bg-[#0095FF] rounded-[2px]"
                    style={{ height: `${(item.published / maxValue) * chartHeight}px` }}
                  />
                  <div
                    className="w-[12px] bg-[#00E096] rounded-[2px]"
                    style={{ height: `${(item.pending / maxValue) * chartHeight}px` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* X-axis day labels */}
          <div className="flex justify-around pt-[10px] px-[4px]">
            {weeklyData.map((item) => (
              <span
                key={item.day}
                className="text-[10px] text-[#555555] text-center font-normal whitespace-pre-line leading-[1.2]"
              >
                {dayLabel(item.day)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-[28px] mt-[16px]">
        <div className="flex items-center gap-[8px]">
          <span className="w-[10px] h-[10px] rounded-full bg-[#0095FF]" />
          <span className="text-[10px] text-[#555555] font-normal">
            Published ad
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="w-[10px] h-[10px] rounded-full bg-[#00E096]" />
          <span className="text-[10px] text-[#555555] font-normal">
            Pending ads
          </span>
        </div>
      </div>
    </div>
  );
}
