"use client";

import { useState } from "react";
import Image from "next/image";

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalAds: number;
  avatar: string;
  active: boolean;
}

const sellers: Seller[] = [
  {
    id: "1",
    name: "Ishan Nayanajith",
    email: "kwinayanajith@gmail.com",
    phone: "0712414095",
    totalAds: 12,
    avatar: "/logos/mass logo.png",
    active: true,
  },
  {
    id: "2",
    name: "Sugath Kalhara",
    email: "sugathk@gmail.com",
    phone: "0712425695",
    totalAds: 8,
    avatar: "/logos/mass logo.png",
    active: true,
  },
  {
    id: "3",
    name: "Sarith Umayanga",
    email: "sugathk@gmail.com",
    phone: "0712425695",
    totalAds: 8,
    avatar: "/logos/mass logo.png",
    active: true,
  },
];

export default function SellersContent() {
  const [sellerList, setSellerList] = useState<Seller[]>(sellers);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleToggleStatus = (sellerId: string) => {
    setSellerList((prev) =>
      prev.map((seller) =>
        seller.id === sellerId
          ? { ...seller, active: !seller.active }
          : seller
      )
    );
  };

  return (
    <div className="p-[16px] md:py-[28px] md:px-[28px] w-full max-w-full overflow-hidden">
      {/* Title */}
      <h1
        className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Sellers
      </h1>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Table */}
      <div className="mt-[20px] overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="grid grid-cols-[1.4fr_1.6fr_1fr_0.8fr_0.8fr] bg-[#1174BB] h-[47px] items-center rounded-t-lg">
            <div
              className="px-[16px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Name
            </div>
            <div
              className="px-[16px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Email
            </div>
            <div
              className="px-[20px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Phone
            </div>
            <div
              className="px-[16px] md:px-[-2px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Total Ads
            </div>
            <div
              className="px-[16px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Status
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col border-b border-l border-r border-[#E0E0E0] rounded-b-lg">
            {sellerList.map((seller, index) => (
              <div key={seller.id}>
                <div 
                  className="grid grid-cols-[1.4fr_1.6fr_1fr_0.8fr_0.8fr] items-center h-[72px] cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedSeller(seller)}
                >
                  {/* Name with Avatar */}
                  <div className="px-[16px] flex items-center gap-[10px] xl:gap-[12px]">
                    <div className="w-[44px] h-[44px] xl:w-[54px] xl:h-[54px] rounded-full overflow-hidden shrink-0 bg-[#D9D9D9]">
                      <Image
                        src={seller.avatar}
                        alt={seller.name}
                        width={54}
                        height={54}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-[#000000] text-[13px] xl:text-[14px] font-semibold leading-[100%] tracking-normal truncate">
                      {seller.name}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="px-[16px] text-[#000000] text-[13px] xl:text-[16px] font-normal leading-[100%] tracking-normal opacity-80 truncate">
                    {seller.email}
                  </div>

                  {/* Phone */}
                  <div className="px-[16px] text-[#000000] text-[13px] xl:text-[16px] font-normal leading-[100%] tracking-normal opacity-80">
                    {seller.phone}
                  </div>

                  {/* Total Ads */}
                  <div className="px-[16px] text-[#000000] text-[13px] xl:text-[16px] font-normal leading-[100%] tracking-normal opacity-80">
                    {String(seller.totalAds).padStart(2, "0")}
                  </div>

                  {/* Status Toggle */}
                  <div className="px-[16px] flex items-center gap-[10px] xl:gap-[16px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(seller.id);
                      }}
                      className={`relative w-[28px] h-[16px] rounded-full transition-colors shrink-0 ${
                        seller.active ? "bg-[#0F792F]" : "bg-[#CCCCCC]"
                      }`}
                    >
                      <span
                        className={`absolute top-[2px] w-[12px] h-[12px] rounded-full bg-white transition-transform ${
                          seller.active ? "left-[14px]" : "left-[2px]"
                        }`}
                      />
                    </button>
                    <span className="text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[100%] tracking-normal min-w-[36px]">
                      {seller.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Row Divider - don't show on last item if we added borders to container */}
                {index < sellerList.length - 1 && (
                  <div className="border-t border-[#E0E0E0]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seller Details Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div 
            className="bg-white w-full max-w-[600px] min-h-[360px] rounded-[16px] p-[32px] md:p-[40px] flex flex-col items-center justify-center shadow-2xl relative"
          >
            {/* Close Icon */}
            <button
              onClick={() => setSelectedSeller(null)}
              className="absolute top-[24px] right-[24px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Avatar */}
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#D9D9D9] mb-[20px]">
              <Image
                src={selectedSeller.avatar}
                alt={selectedSeller.name}
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Name */}
            <h2 
              className="text-[#000000] text-[26px] md:text-[30px] font-normal leading-[100%] mb-[12px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              {selectedSeller.name}
            </h2>

            {/* Verified Seller Badge */}
            <div className="flex items-center gap-[8px] mb-[32px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L14.59 3.59L18.25 3.5L18.75 7.15L22 9L20.5 12L22 15L18.75 16.85L18.25 20.5L14.59 20.41L12 23L9.41 20.41L5.75 20.5L5.25 16.85L2 15L3.5 12L2 9L5.25 7.15L5.75 3.5L9.41 3.59L12 1Z" fill="#0F792F"/>
                <path d="M10 16.5L6 12.5L7.41 11.09L10 13.67L16.59 7.09L18 8.5L10 16.5Z" fill="white"/>
              </svg>
              <span 
                className="text-[#000000] text-[15px] md:text-[16px] font-medium leading-[100%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Verified Seller
              </span>
            </div>

            {/* Contact Seller Button */}
            <button
              onClick={() => {
                setIsContactModalOpen(true);
                setSelectedSeller(null);
              }}
              className="w-[200px] h-[48px] md:h-[52px] bg-[#1174BB] rounded-[8px] text-white font-medium text-[15px] md:text-[16px] transition-colors hover:bg-[#0E63A0] cursor-pointer shadow-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Contact Seller
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4" onClick={() => setIsContactModalOpen(false)}>
          <div 
            className="bg-[#F5F5F5] w-full max-w-[500px] rounded-[16px] p-[24px] md:p-[32px] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Text Area */}
            <textarea
              className="w-full h-[150px] md:h-[180px] rounded-[12px] bg-white border border-[#E0E0E0] p-[16px] text-[#000000] text-[14px] md:text-[15px] outline-none resize-none shadow-sm placeholder:text-[#8E8E8E]"
              placeholder="Type here..."
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-[12px] md:gap-[16px] mt-[24px]">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="flex-1 h-[48px] md:h-[52px] bg-white rounded-[8px] text-[#000000] font-medium text-[15px] md:text-[16px] border border-[#E0E0E0] transition-colors hover:bg-[#F9F9F9] shadow-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Go Back
              </button>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="flex-1 h-[48px] md:h-[52px] bg-[#1174BB] rounded-[8px] text-white font-medium text-[15px] md:text-[16px] transition-colors hover:bg-[#0E63A0] shadow-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
