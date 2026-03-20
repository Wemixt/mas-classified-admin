"use client";

import { useState } from "react";

interface Message {
  id: string;
  name: string;
  subject: string;
  receivedTime: string;
  timestamp: string;
  body: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    name: "Ishan Nayanajith",
    subject: "Regarding my ad approval",
    receivedTime: "5 minutes ago",
    timestamp: "Today, 10:05 AM",
    body: "Hello Admin,\n\nI updated my ad details and added new images. Could you please review it and approve?",
  },
  {
    id: "2",
    name: "Kavindu Perera",
    subject: "Please check my rejected ad",
    receivedTime: "13 minutes ago",
    timestamp: "Today, 09:50 AM",
    body: "Hi,\nWhy was my ad rejected? I fixed the description and images as asked.",
  },
  {
    id: "3",
    name: "Kasun Dulara",
    subject: "Regarding my ad approval",
    receivedTime: "56 minutes ago",
    timestamp: "Today, 08:20 AM",
    body: "Hello Admin,\n\nCan you check my submission please?",
  },
];

export default function MessagesContent() {
  const [expandedId, setExpandedId] = useState<string>("1");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  const handleClear = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Cleared message ${id}`);
  };

  return (
    <div className="py-4 md:pt-[28px] md:pb-[28px] px-4 md:pl-[28px] md:pr-4 flex flex-col min-h-full">
      {/* Page Title */}
      <div>
        <h1
          className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Messages
        </h1>
        <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />
      </div>

      <div className="mt-[20px] overflow-hidden">
        {/* ── Desktop Table Header (sm+) ── */}
        <div className="hidden sm:grid grid-cols-[1fr_2fr_1fr] bg-[#1174BB] rounded-[8px] h-[49px] items-center mb-[16px] md:mb-[20px]">
          <div
            className="pl-[16px] md:pl-[24px] text-white text-[14px] md:text-[17px] font-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Name
          </div>
          <div
            className="text-white text-[14px] md:text-[17px] font-normal text-center"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Subject
          </div>
          <div
            className="pr-[16px] md:pr-[24px] text-white text-[14px] md:text-[17px] font-normal text-right"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Received
          </div>
        </div>

        {/* ── Mobile Header (< sm) ── */}
        <div className="sm:hidden bg-[#1174BB] rounded-[8px] h-[40px] flex items-center px-[12px] mb-[12px]">
          <span
            className="text-white text-[14px] font-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Inbox
          </span>
        </div>

        {/* Message Rows */}
        <div className="flex flex-col gap-[8px]">
          {mockMessages.map((msg) => {
            const isExpanded = expandedId === msg.id;
            const bgColor = isExpanded ? "bg-[#F0F9FF]" : "bg-[#F4F4F4]";

            return (
              <div
                key={msg.id}
                className={`${bgColor} rounded-[8px] transition-colors cursor-pointer w-full overflow-hidden`}
                onClick={() => toggleExpand(msg.id)}
              >
                {/* ── Desktop Row (sm+) ── */}
                <div className="hidden sm:grid grid-cols-[1fr_2fr_1fr] h-[49px] items-center">
                  <div className="pl-[16px] md:pl-[24px] text-[#000000] text-[12px] font-normal leading-[150%] truncate pr-[8px]">
                    {msg.name}
                  </div>
                  <div className="text-[#000000] text-[12px] font-semibold leading-[100%] text-center px-[4px]">
                    {msg.subject}
                  </div>
                  <div className="text-[#5E5E5E] text-[12px] font-normal text-right pr-[16px] md:pr-[24px] whitespace-nowrap">
                    {msg.receivedTime}
                  </div>
                </div>

                {/* ── Mobile Row (< sm) ── */}
                <div className="sm:hidden flex items-start justify-between px-[12px] py-[10px] gap-[8px]">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#000000] text-[13px] font-semibold leading-[130%] truncate">
                      {msg.name}
                    </p>
                    <p className="text-[#5E5E5E] text-[11px] font-normal mt-[2px] truncate">
                      {msg.subject}
                    </p>
                  </div>
                  <span className="text-[#5E5E5E] text-[10px] font-normal shrink-0 mt-[2px]">
                    {msg.receivedTime}
                  </span>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    className="px-[12px] md:px-[24px] pb-[14px] md:pb-[16px] cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full h-[1px] bg-[#D2D2D2]" />

                    <div className="flex flex-col pt-[10px] md:pt-[12px]">
                      <div className="flex w-full justify-between items-start gap-[12px]">
                        <div className="text-[#000000] text-[12px] font-normal whitespace-pre-line leading-[150%] flex-1 min-w-0">
                          {msg.body}
                        </div>
                        <span className="text-[#000000] text-[10px] md:text-[11px] font-bold shrink-0 whitespace-nowrap mt-[2px]">
                          {msg.timestamp}
                        </span>
                      </div>

                      <div className="flex justify-end mt-[10px] md:mt-[12px]">
                        <button
                          onClick={(e) => handleClear(msg.id, e)}
                          className="h-[28px] px-[20px] md:px-[24px] bg-[#1174BB] text-white text-[12px] md:text-[12.5px] font-bold rounded-[14px] hover:bg-[#0E63A0] transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
