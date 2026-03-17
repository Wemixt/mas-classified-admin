"use client";

import { useState } from "react";

const weeklyData = [
  { day: "Monday", published: 65, pending: 10 },
  { day: "Tuesday", published: 70, pending: 8 },
  { day: "Wednesday", published: 55, pending: 12 },
  { day: "Thursday", published: 60, pending: 6 },
  { day: "Friday", published: 75, pending: 15 },
  { day: "Saturday", published: 40, pending: 5 },
  { day: "Sunday", published: 30, pending: 8 },
];

const shortDay = (day: string) => {
  if (day === "Wednesday") return "Wednes\nday";
  return day;
};

export default function AdStatistics() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const maxValue = 90;

  return (
    <div className="bg-white rounded-[10px] p-[20px]">
      <div className="flex items-center justify-between mb-[16px]">
        <h3
          className="text-[#333333] text-[16px] font-semibold"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Ad Statistics
        </h3>
        <div className="flex rounded-[6px] overflow-hidden border border-[#E0E0E0]">
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-[12px] py-[4px] text-[10px] font-medium transition-colors ${
              period === "weekly"
                ? "bg-[#0F467F] text-white"
                : "bg-white text-[#666666] hover:bg-[#F5F5F5]"
            }`}
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-[12px] py-[4px] text-[10px] font-medium transition-colors ${
              period === "monthly"
                ? "bg-[#0F467F] text-white"
                : "bg-white text-[#666666] hover:bg-[#F5F5F5]"
            }`}
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="flex items-end gap-[2px] h-[180px]">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-full pr-[8px] pb-[24px]">
          {[90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((v) => (
            <span key={v} className="text-[9px] text-[#999999] leading-none text-right min-w-[16px]">
              {v}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end justify-between h-full pb-[24px] border-b border-[#E0E0E0] relative">
          {weeklyData.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-[2px] flex-1">
              <div className="flex items-end gap-[3px]">
                <div
                  className="w-[12px] bg-[#1174BB] rounded-t-[2px]"
                  style={{ height: `${(item.published / maxValue) * 140}px` }}
                />
                <div
                  className="w-[12px] bg-[#2EC4B6] rounded-t-[2px]"
                  style={{ height: `${(item.pending / maxValue) * 140}px` }}
                />
              </div>
              <span className="text-[8px] text-[#666666] text-center mt-[4px] whitespace-pre-line leading-[1.2]">
                {shortDay(item.day)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-[20px] mt-[12px]">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-[#1174BB]" />
          <span className="text-[10px] text-[#666666]" style={{ fontFamily: "Eurostile, sans-serif" }}>
            Published ad
          </span>
        </div>
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-[#2EC4B6]" />
          <span className="text-[10px] text-[#666666]" style={{ fontFamily: "Eurostile, sans-serif" }}>
            Pending ads
          </span>
        </div>
      </div>
    </div>
  );
}
