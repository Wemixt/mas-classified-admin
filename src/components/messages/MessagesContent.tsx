"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type MessageStatus = "update_requested" | "active" | "resolved";
type DotColor = "orange" | "green" | "red";

interface ChatMessage {
  id: string;
  sender: "admin" | "seller";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  adTitle: string;
  preview: string;
  timeAgo: string;
  dot: DotColor;
  status: MessageStatus;
  messages: ChatMessage[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const conversations: Conversation[] = [
  {
    id: "1",
    adTitle: "iPhone 11 – 128GB Black",
    preview: "Please add clearer images of the product...",
    timeAgo: "2h ago",
    dot: "orange",
    status: "update_requested",
    messages: [
      {
        id: "m1",
        sender: "admin",
        text: "Please upload at least 3 clear images and update the description with condition details.",
        time: "10:32 AM",
      },
      {
        id: "m2",
        sender: "seller",
        text: "Sure, I'll update the images today.",
        time: "11:26 AM",
      },
    ],
  },
  {
    id: "2",
    adTitle: "BRAND NEW LUXURY HOUSE ...",
    preview: "Please add clearer images of the product...",
    timeAgo: "2h ago",
    dot: "orange",
    status: "update_requested",
    messages: [
      {
        id: "m1",
        sender: "admin",
        text: "The property listing needs more details about the location and amenities.",
        time: "09:15 AM",
      },
    ],
  },
  {
    id: "3",
    adTitle: "Latitude 5410 i5 10th Gen 4...",
    preview: "Please add clearer images of the product...",
    timeAgo: "2h ago",
    dot: "green",
    status: "active",
    messages: [
      {
        id: "m1",
        sender: "admin",
        text: "Please verify the laptop serial number and add more product images.",
        time: "08:45 AM",
      },
      {
        id: "m2",
        sender: "seller",
        text: "I have added 5 new photos. Please review.",
        time: "09:10 AM",
      },
    ],
  },
  {
    id: "4",
    adTitle: "Spice Grinder Semi Stainless...",
    preview: "Please add clearer images of the product...",
    timeAgo: "2h ago",
    dot: "red",
    status: "resolved",
    messages: [
      {
        id: "m1",
        sender: "admin",
        text: "Your ad has been rejected due to insufficient product information.",
        time: "07:30 AM",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const dotColorClass: Record<DotColor, string> = {
  orange: "bg-[#E07B00]",
  green:  "bg-[#27AE60]",
  red:    "bg-[#C0392B]",
};

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: MessageStatus }) {
  const map: Record<MessageStatus, { label: string; cls: string }> = {
    update_requested: {
      label: "Update Requested",
      cls: "bg-[#E07B00]",
    },
    active: {
      label: "Active",
      cls: "bg-[#27AE60]",
    },
    resolved: {
      label: "Resolved",
      cls: "bg-[#5E5E5E]",
    },
  };
  const { label, cls } = map[status];
  return (
    <span
      className={`shrink-0 h-[30px] px-[14px] md:px-[16px] ${cls} rounded-full text-white text-[11px] md:text-[12px] font-semibold flex items-center whitespace-nowrap`}
      style={{ fontFamily: "Eurostile, sans-serif" }}
    >
      {label}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ size = 34 }: { size?: number }) {
  return (
    <div
      className="shrink-0 rounded-full overflow-hidden flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #C8956C 0%, #A0714F 100%)",
      }}
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="8" r="4.2" fill="rgba(255,255,255,0.85)" />
        <path
          d="M3.5 21c0-4.5 3.8-7.5 8.5-7.5s8.5 3 8.5 7.5"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ─── Three-dots icon ──────────────────────────────────────────────────────────

function DotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5"  r="1.6" fill="#888" />
      <circle cx="12" cy="12" r="1.6" fill="#888" />
      <circle cx="12" cy="19" r="1.6" fill="#888" />
    </svg>
  );
}

// ─── Conversation Card ────────────────────────────────────────────────────────

function ConvCard({
  conv,
  isActive,
  onClick,
}: {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-[14px] px-[16px] py-[14px] transition-all duration-150 cursor-pointer
        ${isActive
          ? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.09)]"
          : "bg-white hover:shadow-[0_1px_6px_rgba(0,0,0,0.07)]"}
      `}
    >
      {/* Row 1: title + time + dot */}
      <div className="flex items-center gap-[8px]">
        <span
          className="flex-1 text-[13px] md:text-[14px] font-bold leading-[130%] text-[#1A1A1A] truncate"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          {conv.adTitle}
        </span>
        <span
          className="shrink-0 text-[#9A9A9A] text-[11px] font-normal whitespace-nowrap"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          {conv.timeAgo}
        </span>
        <span
          className={`shrink-0 w-[10px] h-[10px] rounded-full ${dotColorClass[conv.dot]}`}
        />
      </div>

      {/* Row 2: preview text */}
      <p
        className="text-[#9A9A9A] text-[12px] font-normal leading-[140%] mt-[5px] truncate"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        {conv.preview}
      </p>
    </button>
  );
}

// ─── Chat Bubble Row ──────────────────────────────────────────────────────────

function BubbleRow({ msg }: { msg: ChatMessage }) {
  const isAdmin = msg.sender === "admin";

  return (
    <div
      className={`flex items-end gap-[10px] ${
        isAdmin ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar — always on the outer edge */}
      <Avatar size={36} />

      {/* Bubble */}
      <div
        className={`max-w-[58%] px-[16px] md:px-[20px] py-[10px] md:py-[13px] text-[12px] md:text-[13px] font-normal leading-[160%] text-[#1A1A1A] ${
          isAdmin
            ? "bg-[#EFEFEF] rounded-[15px] rounded-tr-[3px]"
            : "bg-[#F0F0F0] rounded-[15px] rounded-tl-[3px]"
        }`}
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        {msg.text}
      </div>

      {/* Time — aligned to bottom, outside bubble, inner side */}
      <span
        className="self-end shrink-0 text-[#9A9A9A] text-[10px] md:text-[11px] font-normal leading-[100%] pb-[2px]"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        {msg.time}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MessagesContent() {
  const [activeId, setActiveId] = useState("1");
  const [inputText, setInputText] = useState("");
  const [convData, setConvData] = useState<Conversation[]>(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = convData.find((c) => c.id === activeId) ?? convData[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, activeConv?.messages.length]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    const timeStr = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setConvData((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: `m${Date.now()}`, sender: "admin", text, time: timeStr },
              ],
            }
          : c
      )
    );
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Build display title for chat header
  const chatTitle = activeConv.adTitle.includes("(Used)")
    ? activeConv.adTitle
    : `${activeConv.adTitle}...(Used)`;

  return (
    <div className="py-4 md:pt-[28px] md:pb-[28px] px-4 md:pl-[28px] md:pr-4 w-full max-w-full flex flex-col">

      {/* ── Page Title ── */}
      <h1
        className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Messages
      </h1>

      {/* ── Divider ── */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px] mb-[20px]" />

      {/* ── Main two-panel container ── */}
      <div
        className="flex rounded-[16px] border border-[#DEDEDE] overflow-hidden bg-white"
        style={{ minHeight: "600px" }}
      >

        {/* ══════════════ LEFT PANEL ══════════════ */}
        <div className="hidden sm:flex w-[280px] md:w-[310px] xl:w-[330px] shrink-0 flex-col bg-[#EFEFEF]">

          {/* "All Conversations" heading */}
          <div className="px-[20px] md:px-[24px] pt-[22px] pb-[18px]">
            <h2
              className="text-[#1A1A1A] text-[20px] md:text-[22px] font-extrabold leading-[100%] tracking-tight"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              All Conversations
            </h2>
          </div>

          {/* List of conversation cards */}
          <div className="flex-1 overflow-y-auto px-[12px] md:px-[14px] pb-[14px] flex flex-col gap-[10px]">
            {convData.map((conv) => (
              <ConvCard
                key={conv.id}
                conv={conv}
                isActive={conv.id === activeId}
                onClick={() => {
                  setActiveId(conv.id);
                  setInputText("");
                }}
              />
            ))}
          </div>
        </div>

        {/* ══════════════ RIGHT PANEL ══════════════ */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">

          {/* Chat header */}
          <div className="px-[20px] md:px-[24px] pt-[16px] md:pt-[18px] pb-0">
            <div className="flex items-center justify-between gap-[12px]">
              <h3
                className="text-[#1A1A1A] text-[14px] md:text-[16px] font-bold leading-[100%] truncate"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {chatTitle}
              </h3>
              <div className="flex items-center gap-[10px] md:gap-[12px] shrink-0">
                <StatusBadge status={activeConv.status} />
                <button
                  className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                  aria-label="More options"
                >
                  <DotsIcon />
                </button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E0E0E0] mt-[14px] md:mt-[16px]" />
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-[20px] md:px-[28px] py-[24px] flex flex-col gap-[22px]">
            {activeConv.messages.map((msg) => (
              <BubbleRow key={msg.id} msg={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input + Send */}
          <div className="px-[16px] md:px-[20px] py-[14px] md:py-[16px]">
            <div className="flex items-center gap-[10px] md:gap-[12px]">
              {/* Text input */}
              <div className="flex-1 h-[46px] md:h-[48px] rounded-[10px] border border-[#D8D8D8] bg-white flex items-center px-[16px] md:px-[18px]">
                <input
                  type="text"
                  placeholder="Write your message here.."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-[#1A1A1A] text-[12px] md:text-[13px] font-normal outline-none placeholder:text-[#C0C0C0]"
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                />
              </div>

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="h-[46px] md:h-[48px] px-[26px] md:px-[32px] bg-[#0F3460] hover:bg-[#0A2647] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] text-white text-[13px] md:text-[14px] font-bold leading-[100%] transition-colors cursor-pointer shrink-0"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: Conversation list ── */}
      <div className="sm:hidden mt-[16px] rounded-[14px] border border-[#DEDEDE] overflow-hidden bg-[#EFEFEF]">
        <div className="px-[16px] pt-[18px] pb-[14px]">
          <h2
            className="text-[#1A1A1A] text-[18px] font-extrabold leading-[100%]"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            All Conversations
          </h2>
        </div>
        <div className="px-[10px] pb-[12px] flex flex-col gap-[8px]">
          {convData.map((conv) => (
            <ConvCard
              key={conv.id}
              conv={conv}
              isActive={conv.id === activeId}
              onClick={() => {
                setActiveId(conv.id);
                setInputText("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
