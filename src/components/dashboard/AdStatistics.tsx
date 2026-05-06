"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";
import { AdChartItem } from "@/types";

export default function AdStatistics() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [chartData, setChartData] = useState<AdChartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        const response = await dashboardService.getAdChartData(period);
        if (response.success) {
          setChartData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching ad chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [period]);

  // Dynamically calculate max value for scaling
  const allValues = chartData.flatMap(item => [item.published, item.submitted]);
  const maxValueRaw = allValues.length > 0 ? Math.max(...allValues, 10) : 10;
  // Round up to nearest 10 for cleaner y-axis
  const maxValue = Math.ceil(maxValueRaw / 10) * 10;
  
  const yTicks = [maxValue, Math.round(maxValue * 0.8), Math.round(maxValue * 0.6), Math.round(maxValue * 0.4), Math.round(maxValue * 0.2), 0];
  
  // Chart height: shorter on mobile (140px), full size on md+
  const chartHeightMobile = 130;
  const chartHeightDesktop = 180;

  const getLabel = (label: string) => {
    if (label === "Wednesday") return "Wednes\nday";
    return label;
  };

  const dayLabelShort = (label: string) => label.slice(0, 3);

  return (
    <div className="bg-[#DAECFF] rounded-[10px] p-[14px] md:p-[20px] pb-[12px] md:pb-[16px] mt-4 h-full flex flex-col">
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

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#555555] text-[12px]">Loading chart data...</p>
        </div>
      ) : (
        <div className="flex flex-1">
          {/* Chart + X-axis — mobile version */}
          <div className="flex-1 flex flex-col md:hidden">
            <div className="flex">
              {/* Y-axis labels (Mobile) */}
              <div
                className="relative pr-[6px] w-[20px]"
                style={{ height: `${chartHeightMobile}px` }}
              >
                {yTicks.map((v) => (
                  <span 
                    key={v} 
                    className="absolute right-[6px] text-[8px] text-[#999999] font-normal leading-none -translate-y-1/2"
                    style={{ top: `${((maxValue - v) / maxValue) * chartHeightMobile}px` }}
                  >
                    {v}
                  </span>
                ))}
              </div>

              {/* Chart Grid + Bars (Mobile) */}
              <div className="flex-1 relative" style={{ height: `${chartHeightMobile}px` }}>
                {yTicks.map((v) => (
                  <div
                    key={v}
                    className={`absolute left-0 right-0 border-t ${v === 0 ? "border-[#BBBBBB]/60" : "border-[#CCCCCC]/25"}`}
                    style={{ top: `${((maxValue - v) / maxValue) * chartHeightMobile}px` }}
                  />
                ))}
                <div
                  className="absolute left-0 right-0 border-t-[1.5px] border-dashed border-[#90B8D8]/60"
                  style={{ top: `${((maxValue - (maxValue * 0.7)) / maxValue) * chartHeightMobile}px` }}
                />
                <div className="absolute inset-0 flex items-end justify-around px-[2px]">
                  {chartData.map((item, idx) => (
                    <div key={`${item.label}-${idx}`} className="flex items-end gap-[2px]">
                      <div
                        className="w-[8px] bg-[#0095FF] rounded-[2px] transition-all duration-300"
                        style={{ height: `${(item.published / maxValue) * chartHeightMobile}px` }}
                      />
                      <div
                        className="w-[8px] bg-[#00E096] rounded-[2px] transition-all duration-300"
                        style={{ height: `${(item.submitted / maxValue) * chartHeightMobile}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* X-axis — short labels on mobile */}
            <div className="flex justify-around pt-[8px] px-[2px] pl-[20px]">
              {chartData.map((item, idx) => (
                <span key={`${item.label}-${idx}`} className="text-[8px] text-[#555555] text-center font-normal leading-[1.2] min-w-[20px]">
                  {period === "weekly" ? dayLabelShort(item.label) : item.label.replace("Week ", "W")}
                </span>
              ))}
            </div>
          </div>

          {/* Chart + X-axis — desktop version */}
          <div className="hidden md:flex flex-1 flex-col">
            <div className="flex">
              {/* Y-axis labels (Desktop) */}
              <div
                className="relative pr-[8px] w-[24px]"
                style={{ height: `${chartHeightDesktop}px` }}
              >
                {yTicks.map((v) => (
                  <span 
                    key={v} 
                    className="absolute right-[8px] text-[9px] text-[#999999] font-normal leading-none -translate-y-1/2"
                    style={{ top: `${((maxValue - v) / maxValue) * chartHeightDesktop}px` }}
                  >
                    {v}
                  </span>
                ))}
              </div>

              {/* Chart Grid + Bars (Desktop) */}
              <div className="flex-1 relative" style={{ height: `${chartHeightDesktop}px` }}>
                {yTicks.map((v) => (
                  <div
                    key={v}
                    className={`absolute left-0 right-0 border-t ${v === 0 ? "border-[#BBBBBB]/60" : "border-[#CCCCCC]/25"}`}
                    style={{ top: `${((maxValue - v) / maxValue) * chartHeightDesktop}px` }}
                  />
                ))}
                <div
                  className="absolute left-0 right-0 border-t-[1.5px] border-dashed border-[#90B8D8]/60"
                  style={{ top: `${((maxValue - (maxValue * 0.7)) / maxValue) * chartHeightDesktop}px` }}
                />
                <div className="absolute inset-0 flex items-end justify-around px-[4px]">
                  {chartData.map((item, idx) => (
                    <div key={`${item.label}-${idx}`} className="flex items-end gap-[3px]">
                      <div
                        className="w-[12px] bg-[#0095FF] rounded-[2px] transition-all duration-300"
                        style={{ height: `${(item.published / maxValue) * chartHeightDesktop}px` }}
                      />
                      <div
                        className="w-[12px] bg-[#00E096] rounded-[2px] transition-all duration-300"
                        style={{ height: `${(item.submitted / maxValue) * chartHeightDesktop}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* X-axis (Desktop) */}
            <div className="flex justify-around pt-[10px] px-[4px] pl-[24px]">
              {chartData.map((item, idx) => (
                <span key={`${item.label}-${idx}`} className="text-[10px] text-[#555555] text-center font-normal whitespace-pre-line leading-[1.2] min-w-[30px]">
                  {getLabel(item.label)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

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
