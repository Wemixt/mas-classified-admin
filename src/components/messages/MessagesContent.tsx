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
  }
];

export default function MessagesContent() {
  const [expandedId, setExpandedId] = useState<string>("1");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  const handleClear = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate clearing or dismissing message
    console.log(`Cleared message ${id}`);
  };

  return (
    <div className="pt-[28px] pl-[28px] pb-[28px] flex flex-col min-h-full">
      {/* Page Title */}
      <div>
        <h1
          className="text-[#5E5E5E] text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Messages
        </h1>
        <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />
      </div>

      <div className="mt-[20px] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_2fr_1fr] bg-[#1174BB] rounded-[8px] h-[49px] items-center mb-[20px]">
          <div className="pl-[24px] text-white text-[17px] font-normal" style={{ fontFamily: "Eurostile, sans-serif" }}>
            Name
          </div>
          <div className="text-white text-[17px] font-normal text-center" style={{ fontFamily: "Eurostile, sans-serif" }}>
            Subject
          </div>
          <div className="pr-[24px] text-white text-[17px] font-normal text-right" style={{ fontFamily: "Eurostile, sans-serif" }}>
            Received Time
          </div>
        </div>

        {/* Message Data Rows */}
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
                {/* Top Row Elements */}
                <div className="grid grid-cols-[1fr_2fr_1fr] h-[49px] items-center">
                  <div className="pl-[24px] text-[#000000] text-[12px] font-normal leading-[150%]">
                    {msg.name}
                  </div>
                  <div className="text-[#000000] text-[12px] font-semibold leading-[100%] text-center">
                    {msg.subject}
                  </div>
                  <div className="text-[#5E5E5E] text-[12px] font-normal text-right pr-[24px]">
                    {msg.receivedTime}
                  </div>
                </div>

                {/* Expanded Content Area */}
                {isExpanded && (
                  <div className="px-[24px] pb-[16px] cursor-default" onClick={(e) => e.stopPropagation()}>
                    {/* Divider Line */}
                    <div className="w-full h-[1px] bg-[#D2D2D2]" />
                    
                    <div className="flex flex-col pt-[12px]">
                      <div className="flex w-full justify-between items-start">
                        <div className="text-[#000000] text-[12px] font-normal whitespace-pre-line leading-[150%] mr-[40px]">
                          {msg.body}
                        </div>
                        <span className="text-[#000000] text-[11px] font-bold shrink-0 whitespace-nowrap mt-[2px]">
                          {msg.timestamp}
                        </span>
                      </div>
                      
                      <div className="flex justify-end mt-[12px]">
                        <button
                          onClick={(e) => handleClear(msg.id, e)}
                          className="h-[28px] px-[24px] bg-[#1174BB] text-white text-[12.5px] font-bold rounded-[14px] hover:bg-[#0E63A0] transition-colors"
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
