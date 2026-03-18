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
  onReject: (adId: string) => void;
}

export default function AdDetailView({
  ad,
  onBack,
  onAccept,
  onReject,
}: AdDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);

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
      <div className="flex-1 overflow-y-auto pr-[12px] pb-[24px]">
        {/* Title row */}
        <div className="flex items-start justify-between">
          {/* Poppins 400 32px 150% #000000 */}
          <h2
            className="text-[#000000] text-[22px] font-normal leading-[150%] max-w-[70%]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.title}
          </h2>
          <div className="text-right shrink-0">
            {/* Poppins 400 14px 150% #000000 */}
            <p
              className="text-[#000000] text-[12px] font-normal leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {ad.dateSubmitted}
            </p>
            {/* Poppins 400 14px 150% #000000 opacity 60% */}
            <p
              className="text-[#000000] text-[12px] font-normal leading-[150%] opacity-60"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {ad.timeSubmitted}
            </p>
          </div>
        </div>

        {/* Price — Eurostile 400 52px 100% tracking 4% #ED1C24 */}
        <p
          className="text-[#ED1C24] text-[30px] font-normal leading-[100%] tracking-[0.04em] mt-[12px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Rs {formattedPrice}
        </p>

        {/* Negotiable — Poppins 400 18px 150% #5E5E5E */}
        {ad.negotiable && (
          <p
            className="text-[#5E5E5E] text-[12px] font-normal leading-[150%] mt-[2px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Negotiable
          </p>
        )}

        {/* Category badge — 128×30 radius 15px bg #1174BB */}
        <div className="mt-[12px]">
          <span
            className="inline-flex items-center justify-center w-[106px] h-[30px] bg-[#1174BB] text-white text-[12px] font-medium rounded-[15px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.category}
          </span>
        </div>

        {/* Specs — Labels: Eurostile 400 24px 100% tracking 4% #000000, Values: Eurostile 400 24px 100% tracking 4% #5E5E5E */}
        <div className="mt-[18px] flex flex-col gap-[6px]">
          {[
            { label: "Condition", value: ad.condition },
            { label: "Device type", value: ad.deviceType },
            { label: "Brand", value: ad.brand },
            { label: "Model", value: ad.model },
          ].map((spec) => (
            <div key={spec.label} className="flex items-center">
              <span
                className="text-[#000000] text-[16px] font-normal leading-[100%] tracking-[0.04em]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {spec.label} :
              </span>
              <span
                className="text-[#5E5E5E] text-[16px] font-normal leading-[100%] tracking-[0.04em] ml-[8px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Description heading — Eurostile 400 36px 100% tracking 4% #000000 */}
        <div className="mt-[40px]">
          <h3
            className="text-[#000000] text-[20px] font-normal leading-[100%] tracking-[0.04em]"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Description
          </h3>

          {/* Description text — Poppins 400 18px 162% justified */}
          <p
            className="text-[#5E5E5E] text-[14px] font-normal leading-[162%] mt-[10px] text-justify"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.description}
          </p>
        </div>

        {/* Image gallery — 160×160 bg #D9D9D9 */}
        {ad.images.length > 0 && (
          <div className="mt-[24px]">
            <div className="flex gap-[16px] flex-wrap">
              {ad.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-[160px] h-[160px] bg-[#D9D9D9] border-2 transition-all cursor-pointer ${
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

      {/* Bottom action bar — full bleed, bg #E9E9E9, h 105px */}
      <div className="bg-[#E9E9E9] mt-auto ml-[-28px] mr-[-24px] xl:mr-[-50px]">
        <div className="flex items-center justify-between px-[28px] h-[105px]">
          {/* Seller info */}
          <div className="flex items-center gap-[12px]">
            {/* Avatar 52×52 radius 31px */}
            <div className="w-[52px] h-[52px] rounded-full bg-[#D2D2D2] shrink-0 flex items-center justify-center text-[#5E5E5E] text-[18px] font-bold">
              {ad.seller.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-[6px]">
                {/* Name — Poppins 400 16px 150% #000000 */}
                <span
                  className="text-[#000000] text-[16px] font-normal leading-[150%]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {ad.seller.name}
                </span>
                {/* Badge — 25×10 radius 5px bg #E6CA56 */}
                {ad.seller.badge && (
                  <span className="bg-[#E6CA56] text-[#000000] text-[9px] font-bold px-[6px] py-[1px] rounded-[5px]">
                    {ad.seller.badge}
                  </span>
                )}
              </div>
              {/* Username — Poppins 400 12px 150% opacity 70% */}
              <span
                className="text-[#000000] text-[12px] font-normal leading-[150%] opacity-70"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                @{ad.seller.username}
              </span>
            </div>
          </div>

          {/* Action buttons — 146×35 pill, Poppins 400 16px 150% */}
          <div className="flex items-center gap-[20px]">
            <button
              onClick={() => onAccept(ad.id)}
              className="w-[146px] h-[35px] bg-[#0A7211] rounded-full text-white text-[16px] font-normal leading-[150%] hover:bg-[#096310] transition-colors cursor-pointer"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Accept
            </button>
            <button
              onClick={() => onReject(ad.id)}
              className="w-[146px] h-[35px] bg-[#ED1C24] rounded-full text-white text-[16px] font-normal leading-[150%] hover:bg-[#D41920] transition-colors cursor-pointer"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
