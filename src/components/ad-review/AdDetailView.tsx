"use client";

import { useState } from "react";

export interface AdDetail {
  id: string;
  title: string;
  price: number;
  negotiable: boolean;
  category: string;
  condition: string;
  deviceType: string;
  brand: string;
  model: string;
  description: string;
  images: string[];
  dateSubmitted: string;
  timeSubmitted: string;
  seller: {
    name: string;
    username: string;
    avatar: string;
    badge?: string;
  };
}

interface AdDetailViewProps {
  ad: AdDetail;
  onBack: () => void;
  onAccept: (adId: string) => void;
  onReject: (adId: string, reason: string) => void;
  onRequestChanges?: (adId: string, reason: string) => void;
}

export default function AdDetailView({
  ad,
  onBack,
  onAccept,
  onReject,
  onRequestChanges,
}: AdDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalAction, setModalAction] = useState<"reject" | "requestChanges" | "done" | null>(null);
  const [reason, setReason] = useState("");

  const formattedPrice = new Intl.NumberFormat("en-LK").format(ad.price);

  return (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-[6px] text-[#1174BB] text-[13px] font-medium mb-[16px] hover:underline w-fit cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="#1174BB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to list
      </button>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pr-[4px] md:pr-[12px] pb-[24px]">
        {/* Title row — title left, Accept button + date/time stacked right */}
        <div className="flex items-start justify-between gap-[12px]">
          <h2
            className="text-[#000000] text-[18px] md:text-[22px] font-normal leading-[150%] flex-1 min-w-0"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.title}
          </h2>

          {/* Right column: Accept button on top, date & time below */}
          <div className="flex flex-col items-end gap-[6px] shrink-0">
            <button
              onClick={() => onAccept(ad.id)}
              className="h-[34px] px-[24px] rounded-full text-white text-[13px] md:text-[14px] font-semibold leading-[100%] tracking-wide cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "Poppins, sans-serif",
                background: "#148729",
                boxShadow: "0 2px 8px rgba(20,135,41,0.30)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#117523")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#148729")}
            >
              Accept
            </button>
            <p
              className="text-[#000000] text-[11px] md:text-[12px] font-normal leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {ad.dateSubmitted}
            </p>
            <p
              className="text-[#000000] text-[11px] md:text-[12px] font-normal leading-[150%] opacity-60"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {ad.timeSubmitted}
            </p>
          </div>
        </div>

        {/* Price */}
        <p
          className="text-[#ED1C24] text-[24px] md:text-[30px] font-normal leading-[100%] tracking-[0.04em] mt-[12px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Rs {formattedPrice}
        </p>

        {/* Negotiable */}
        {ad.negotiable && (
          <p
            className="text-[#5E5E5E] text-[12px] font-normal leading-[150%] mt-[2px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Negotiable
          </p>
        )}

        {/* Category badge */}
        <div className="mt-[12px]">
          <span
            className="inline-flex items-center justify-center h-[30px] px-[16px] bg-[#1174BB] text-white text-[12px] font-medium rounded-[15px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.category}
          </span>
        </div>

        {/* Specs */}
        <div className="mt-[16px] md:mt-[18px] flex flex-col gap-[4px] md:gap-[6px]">
          {[
            { label: "Condition", value: ad.condition },
            { label: "Device type", value: ad.deviceType },
            { label: "Brand", value: ad.brand },
            { label: "Model", value: ad.model },
          ].map((spec) => (
            <div key={spec.label} className="flex items-center">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[100%] tracking-[0.04em]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {spec.label} :
              </span>
              <span
                className="text-[#5E5E5E] text-[14px] md:text-[16px] font-normal leading-[100%] tracking-[0.04em] ml-[8px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-[28px] md:mt-[40px]">
          <h3
            className="text-[#000000] text-[17px] md:text-[20px] font-normal leading-[100%] tracking-[0.04em]"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Description
          </h3>

          <p
            className="text-[#5E5E5E] text-[13px] md:text-[14px] font-normal leading-[162%] mt-[10px] text-justify"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.description}
          </p>
        </div>

        {/* Image gallery */}
        {ad.images.length > 0 && (
          <div className="mt-[20px] md:mt-[24px]">
            <div className="flex gap-[10px] md:gap-[16px] flex-wrap">
              {ad.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] xl:w-[160px] xl:h-[160px] bg-[#D9D9D9] border-2 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#1174BB] shadow-md"
                      : "border-transparent hover:border-[#D2D2D2]"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom action bar — #E9E9E9, full-width flush to right edge */}
      <div
        className="bg-[#E9E9E9] mt-auto -mx-4 md:ml-[-28px] md:mr-[-40px] xl:mr-[-66px]"
      >
        <div
          className="flex items-center justify-between flex-wrap gap-[12px] py-[16px] md:py-0 md:h-[90px] px-4 md:pl-[28px] md:pr-6 xl:pr-[50px]"
        >
          {/* Seller info */}
          <div className="flex items-center gap-[10px] md:gap-[12px]">
            {/* Avatar */}
            <div className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] rounded-full bg-[#D2D2D2] shrink-0 flex items-center justify-center text-[#5E5E5E] text-[15px] md:text-[18px] font-bold">
              {ad.seller.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="flex items-center gap-[6px]">
                <span
                  className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {ad.seller.name}
                </span>
                {ad.seller.badge && (
                  <span className="bg-[#E6CA56] text-[#000000] text-[9px] font-bold px-[6px] py-[2px] rounded-[5px]">
                    {ad.seller.badge}
                  </span>
                )}
              </div>
              <span
                className="text-[#000000] text-[11px] md:text-[12px] font-normal leading-[150%] opacity-70"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                @{ad.seller.username}
              </span>
            </div>
          </div>

          {/* Action buttons — Figma: Reject (dark red pill) + Request Changes (orange pill) */}
          <div className="flex items-center gap-[12px] md:gap-[16px]">
            {/* Reject button */}
            <button
              onClick={() => setModalAction("reject")}
              className="h-[40px] md:h-[44px] px-[28px] md:px-[36px] rounded-full text-white text-[13px] md:text-[15px] font-bold leading-[100%] tracking-wide transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "Poppins, sans-serif",
                background: "#8B1A1A",
                boxShadow: "0 2px 8px rgba(139,26,26,0.35)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#7A1515")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#8B1A1A")}
            >
              Reject
            </button>

            {/* Request Changes button */}
            <button
              onClick={() => setModalAction("requestChanges")}
              className="h-[40px] md:h-[44px] px-[20px] md:px-[28px] rounded-full text-white text-[13px] md:text-[15px] font-bold leading-[100%] tracking-wide transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "Poppins, sans-serif",
                background: "#C85A00",
                boxShadow: "0 2px 8px rgba(200,90,0,0.35)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#B55000")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C85A00")}
            >
              Request Changes
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div 
            className="bg-white w-full max-w-[600px] min-h-[360px] rounded-[16px] p-[24px] md:p-[32px] flex flex-col shadow-2xl relative"
          >
            {modalAction === "done" ? (
              <div className="flex flex-col items-center justify-center flex-1 h-full py-[20px]">
                {/* Close Icon */}
                <button
                  onClick={() => {
                    setModalAction(null);
                    setReason("");
                    // In final implementation, call the actual API / parent handlers here
                  }}
                  className="absolute top-[24px] right-[24px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Checkmark Icon */}
                <div className="w-[130px] h-[130px] rounded-full bg-[#1174BB] flex items-center justify-center mb-[20px]">
                  <svg width="55" height="40" viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 25L22 43L60 4" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Text */}
                <h2 
                  className="text-[#000000] text-[32px] font-normal leading-[100%]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Done!
                </h2>
              </div>
            ) : (
              <>
                <textarea
                  className="flex-1 w-full bg-white border border-[#E0E0E0] rounded-[12px] p-[20px] text-[#000] text-[14px] md:text-[15px] outline-none resize-none focus:border-[#0F467F] transition-colors placeholder:text-[#9E9E9E]"
                  placeholder="Type the reason here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
                
                <div className="flex items-center gap-[16px] md:gap-[20px] mt-[24px]">
                  <button
                    onClick={() => {
                      setModalAction(null);
                      setReason("");
                    }}
                    className="flex-1 h-[52px] bg-white border border-[#E0E0E0] rounded-[8px] text-[#000] font-medium text-[15px] md:text-[16px] transition-colors hover:bg-gray-50 cursor-pointer shadow-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => {
                      if (modalAction === "reject") {
                        onReject(ad.id, reason);
                      } else if (modalAction === "requestChanges" && onRequestChanges) {
                        onRequestChanges(ad.id, reason);
                      }
                      setModalAction("done");
                    }}
                    disabled={!reason.trim()}
                    className="flex-1 h-[52px] bg-[#0F467F] rounded-[8px] text-white font-medium text-[15px] md:text-[16px] transition-colors hover:bg-[#0c3966] cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
