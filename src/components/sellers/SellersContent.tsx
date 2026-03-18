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
    <div className="py-[28px] pl-[28px]">
      {/* Title */}
      <h1
        className="text-[#5E5E5E] text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Sellers
      </h1>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Table */}
      <div className="mt-[20px]">
        {/* Table Header */}
        <div className="grid grid-cols-[1.4fr_1.6fr_1fr_0.8fr_0.8fr] bg-[#1174BB] h-[47px] items-center">
          <div
            className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Name
          </div>
          <div
            className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Email
          </div>
          <div
            className="px-[20px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Phone
          </div>
          <div
            className="px-[-2px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Total Ads
          </div>
          <div
            className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Status
          </div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {sellerList.map((seller) => (
            <div key={seller.id}>
              <div className="grid grid-cols-[1.4fr_1.6fr_1fr_0.8fr_0.8fr] items-center h-[58px]">
                {/* Name with Avatar */}
                <div className="px-[16px] flex items-center gap-[12px]">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden shrink-0 bg-[#D9D9D9]">
                    <Image
                      src={seller.avatar}
                      alt={seller.name}
                      width={38}
                      height={38}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-[#5E5E5E] text-[12px] font-normal leading-[100%] tracking-normal">
                    {seller.name}
                  </span>
                </div>

                {/* Email */}
                <div className="px-[16px] text-[#5E5E5E] text-[12px] font-normal leading-[100%] tracking-normal">
                  {seller.email}
                </div>

                {/* Phone */}
                <div className="px-[16px] text-[#5E5E5E] text-[12px] font-normal leading-[100%] tracking-normal">
                  {seller.phone}
                </div>

                {/* Total Ads */}
                <div className="px-[16px] text-[#5E5E5E] text-[12px] font-normal leading-[100%] tracking-normal">
                  {String(seller.totalAds).padStart(2, "0")}
                </div>

                {/* Status Toggle */}
                <div className="px-[16px] flex items-center gap-[8px]">
                  <button
                    onClick={() => handleToggleStatus(seller.id)}
                    className={`relative w-[28px] h-[16px] rounded-full transition-colors ${
                      seller.active ? "bg-[#0F792F]" : "bg-[#CCCCCC]"
                    }`}
                  >
                    <span
                      className={`absolute top-[2px] w-[12px] h-[12px] rounded-full bg-white transition-transform ${
                        seller.active ? "left-[14px]" : "left-[2px]"
                      }`}
                    />
                  </button>
                  <span className="text-[#5E5E5E] text-[12px] font-normal leading-[100%] tracking-normal">
                    {seller.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Row Divider */}
              <div className="border-t border-[#E0E0E0]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
