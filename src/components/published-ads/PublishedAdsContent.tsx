"use client";

import { useState } from "react";
import PublishedAdDetailView, {
  type PublishedAdDetail,
} from "./PublishedAdDetailView";

interface PublishedAd {
  id: string;
  title: string;
  sellerName: string;
  category: string;
  clicks: number;
  datePublished: string;
  approvedBy: string;
}

const publishedAds: PublishedAd[] = [
  {
    id: "1",
    title: "Dell inspire i7 11th Gen Laptop...",
    sellerName: "Ishan Nayanajith",
    category: "Laptop",
    clicks: 153,
    datePublished: "2026/01/28",
    approvedBy: "Kasun Prasanna",
  },
  {
    id: "2",
    title: "Cotten M T shirt - Hi quality..",
    sellerName: "Kasun Suraj",
    category: "T shirt",
    clicks: 123,
    datePublished: "2026/01/14",
    approvedBy: "Kasun Prasanna",
  },
  {
    id: "3",
    title: "JBL T50 Bluetooth Wireless...",
    sellerName: "Supun Thathsara",
    category: "Headset",
    clicks: 76,
    datePublished: "2026/02/03",
    approvedBy: "Sugath Kalhara",
  },
];

const adDetails: Record<string, PublishedAdDetail> = {
  "1": {
    id: "1",
    title: "Dell inspire i7 11th Gen Laptop | 16GB RAM | 1 TB ssd",
    condition: "Used",
    deviceType: "Laptop",
    brand: "Dell",
    model: "Inspire 5200",
    description:
      "The Dell Inspiron 5500 is a dependable and stylish laptop, ideal for students, professionals, and everyday users. This used device is in good working condition and offers Dell's trusted build quality with smooth performance for daily tasks such as office work, online classes, browsing, and entertainment. Its comfortable keyboard, clear display, and portable design make it suitable for both work and home use. A reliable and cost-effective choice, with negotiable price for interested buyers.",
    images: ["", "", "", "", ""],
    category: "Laptop",
    status: "Published",
    isLive: true,
    viewedCount: 152,
    seller: { name: "Kasun Anuradha", badge: "Gold" },
    approvedBy: "Vimal Sangeeth",
    publishedDate: "2026/01/28",
    publishedTime: "2:45 pm",
    approvedDate: "2026/01/28",
    approvedTime: "3:53 pm",
    sellerMobile: "+94 7 xxx xxx",
    revisions: [
      {
        id: "1",
        date: "2026/01/28",
        time: "2:50 pm",
        by: "Kasun Perera",
        description: "Updated product description",
      },
      {
        id: "2",
        date: "2026/01/27",
        time: "8:20 pm",
        by: "Kasun Perera",
        description: "Updated sub category",
      },
      {
        id: "3",
        date: "2026/01/25",
        time: "1:50 pm",
        by: "Kasun Perera",
        description: "Added real product images",
      },
    ],
    reviews: {
      totalCount: 4,
      items: [
        {
          id: "1",
          author: "P Kasun",
          verified: true,
          date: "03 Aug 2024",
          text: "Arrived soon. Plug and play. Stable connection. Can recommend.",
          likes: 6,
        },
      ],
    },
  },
  "2": {
    id: "2",
    title: "Cotten M T shirt - Hi quality",
    condition: "New",
    deviceType: "Clothing",
    brand: "N/A",
    model: "N/A",
    description:
      "High quality cotton T-shirt in medium size. Comfortable and breathable fabric suitable for everyday wear. Available in multiple colors.",
    images: ["", "", ""],
    category: "T shirt",
    status: "Published",
    isLive: true,
    viewedCount: 123,
    seller: { name: "Kasun Suraj", badge: "Silver" },
    approvedBy: "Kasun Prasanna",
    publishedDate: "2026/01/14",
    publishedTime: "10:30 am",
    approvedDate: "2026/01/14",
    approvedTime: "11:00 am",
    sellerMobile: "+94 7 xxx xxx",
    revisions: [],
    reviews: { totalCount: 0, items: [] },
  },
  "3": {
    id: "3",
    title: "JBL T50 Bluetooth Wireless Headset",
    condition: "New",
    deviceType: "Headset",
    brand: "JBL",
    model: "T50",
    description:
      "JBL T50 Bluetooth wireless headset with premium sound quality. Features noise cancellation and long battery life. Perfect for music lovers and professionals.",
    images: ["", "", "", ""],
    category: "Headset",
    status: "Published",
    isLive: true,
    viewedCount: 76,
    seller: { name: "Supun Thathsara" },
    approvedBy: "Sugath Kalhara",
    publishedDate: "2026/02/03",
    publishedTime: "9:15 am",
    approvedDate: "2026/02/03",
    approvedTime: "9:45 am",
    sellerMobile: "+94 7 xxx xxx",
    revisions: [],
    reviews: { totalCount: 0, items: [] },
  },
};

export default function PublishedAdsContent() {
  const [viewingAdId, setViewingAdId] = useState<string | null>(null);

  const handleSendMessage = (adId: string) => {
    console.log(`Send message for ad ${adId}`);
  };

  const handleViewAd = (adId: string) => {
    setViewingAdId(adId);
  };

  const handleBackToList = () => {
    setViewingAdId(null);
  };

  const viewingAd = viewingAdId ? adDetails[viewingAdId] : null;
  const viewingListAd = viewingAdId
    ? publishedAds.find((a) => a.id === viewingAdId)
    : null;

  return (
    <div className="py-4 md:pt-[28px] md:pb-[28px] px-4 md:pl-[28px] md:pr-4">
      {/* Title row with breadcrumb */}
      <div className="flex items-baseline gap-[8px] flex-wrap">
        <h1
          className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Published Ads
        </h1>
        {viewingListAd && (
          <span
            className="text-[#5E5E5E] text-[14px] md:text-[18px] font-normal leading-[100%] tracking-normal opacity-60 truncate max-w-[200px] sm:max-w-none"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            /&nbsp;{viewingListAd.title}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Content switches between list and detail */}
      {viewingAd ? (
        <div className="mt-[20px]">
          <PublishedAdDetailView ad={viewingAd} onBack={handleBackToList} />
        </div>
      ) : (
        /* Table */
        <div className="mt-[20px] overflow-hidden">

          {/* ── Desktop Table Header (md+) ── */}
          <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] bg-[#1174BB] h-[47px] items-center">
            <div
              className="px-[16px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Ad Title
            </div>
            <div
              className="px-[16px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Seller Name
            </div>
            <div
              className="px-[4px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Category
            </div>
            <div
              className="px-[2px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Clicks
            </div>
            <div className="w-[100px] xl:w-[120px]" />
          </div>

          {/* ── Mobile Table Header (< md) ── */}
          <div className="md:hidden bg-[#1174BB] h-[40px] flex items-center px-[12px]">
            <span
              className="text-white text-[14px] font-normal leading-[100%]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Published Ads List
            </span>
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-[10px] md:gap-[12px] mt-[10px] md:mt-[12px]">
            {publishedAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#F4F4F4] rounded-[8px] overflow-hidden"
              >
                {/* ── Desktop Data Row (md+) ── */}
                <div className="hidden md:flex items-center h-[57px]">
                  <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr] items-center flex-1 min-w-0">
                    <div className="px-[16px] flex items-center gap-[12px] min-w-0">
                      <div className="w-[62px] h-[41px] rounded-[4px] bg-[#D9D9D9] shrink-0" />
                      <span className="text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                        {ad.title}
                      </span>
                    </div>
                    <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                      {ad.sellerName}
                    </div>
                    <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.category}
                    </div>
                    <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.clicks}
                    </div>
                  </div>
                  <div className="w-[100px] xl:w-[120px] shrink-0 flex items-center justify-center">
                    <button
                      onClick={() => handleViewAd(ad.id)}
                      className="w-[88px] xl:w-[108px] h-[26px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[12px] font-normal leading-[150%] tracking-normal hover:bg-[#C5C5C5] transition-colors cursor-pointer"
                    >
                      View Ad
                    </button>
                  </div>
                </div>

                {/* ── Mobile Card Row (< md) ── */}
                <div className="md:hidden flex items-start gap-[10px] p-[12px]">
                  <div className="w-[56px] h-[38px] rounded-[4px] bg-[#D9D9D9] shrink-0 mt-[2px]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#000000] text-[13px] font-normal leading-[140%] truncate">
                      {ad.title}
                    </p>
                    <p className="text-[#5E5E5E] text-[11px] mt-[2px]">
                      {ad.sellerName} · {ad.category} · {ad.clicks} clicks
                    </p>
                  </div>
                  <button
                    onClick={() => handleViewAd(ad.id)}
                    className="shrink-0 h-[26px] px-[10px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[11px] font-normal hover:bg-[#C5C5C5] transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-[#E0E0E0] mx-[12px]" />

                {/* Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-[8px] min-h-[50px] md:h-[57px] pl-[12px] md:pl-[16px] pr-[6px] py-[8px] md:py-0">
                  <div className="flex items-center">
                    <span
                      className="text-[#242424] text-[12px] md:text-[14px] font-normal leading-[100%] tracking-normal opacity-70"
                      style={{ fontFamily: "Eurostile, sans-serif" }}
                    >
                      Date Published
                    </span>
                    <span className="text-[#000000] text-[12px] md:text-[14px] font-normal leading-[150%] tracking-normal ml-[8px]">
                      {ad.datePublished}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-[8px] md:gap-[12px]">
                    <span className="text-[#242424] text-[11px] md:text-[12px] font-normal leading-[150%] tracking-normal whitespace-nowrap">
                      Approved by{" "}
                      <strong className="font-semibold">
                        {ad.approvedBy}
                      </strong>
                    </span>
                    <button
                      onClick={() => handleSendMessage(ad.id)}
                      className="h-[30px] md:h-[32px] px-[10px] md:px-[14px] bg-[#1174BB] rounded-[8px] text-white text-[11px] md:text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors whitespace-nowrap"
                    >
                      Send Message to Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
