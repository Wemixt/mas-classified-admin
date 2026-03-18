"use client";

import { useState } from "react";
import AdDetailView, { type AdDetail } from "./AdDetailView";

interface Ad {
  id: string;
  title: string;
  sellerName: string;
  category: string;
  dateSubmitted: string;
}

type ReviewAction = "approve" | "reject" | "requestChanges" | null;

const pendingAds: Ad[] = [
  {
    id: "1",
    title: "Dell inspire i7 11th Gen Laptop...",
    sellerName: "Ishan Nayanajith",
    category: "Laptop",
    dateSubmitted: "2026/01/28",
  },
  {
    id: "2",
    title: "Samsung s21 Ultra 250GB 12...",
    sellerName: "Kasun Anuradha",
    category: "Mobile Phone",
    dateSubmitted: "2026/01/18",
  },
];

const adDetails: Record<string, AdDetail> = {
  "1": {
    id: "1",
    title: "Dell Inspiron i7 11th Gen Laptop 16GB RAM 512GB SSD",
    price: 185000,
    negotiable: true,
    category: "Laptop",
    condition: "Used",
    deviceType: "Laptop",
    brand: "Dell",
    model: "Inspiron 5500",
    description:
      "The Dell Inspiron 5500 is a dependable and stylish laptop, ideal for students, professionals, and everyday users. This used device is in good working condition and offers Dell's trusted build quality with smooth performance for daily tasks such as office work, online classes, browsing, and entertainment. Its comfortable keyboard, clear display, and portable design make it suitable for both work and home use. A reliable and cost-effective choice, with negotiable price for interested buyers.",
    images: [
      "https://picsum.photos/seed/dell1/400/400",
      "https://picsum.photos/seed/dell2/400/400",
      "https://picsum.photos/seed/dell3/400/400",
      "https://picsum.photos/seed/dell4/400/400",
      "https://picsum.photos/seed/dell5/400/400",
    ],
    dateSubmitted: "2026/01/28",
    timeSubmitted: "02:15 PM",
    seller: {
      name: "Ishan Nayanajith",
      username: "ishann",
      avatar: "",
      badge: "Seller",
    },
  },
  "2": {
    id: "2",
    title: "Samsung s21 Ultra 250GB ROM 12GB RAM",
    price: 130000,
    negotiable: true,
    category: "Mobile Phone",
    condition: "Used",
    deviceType: "Mobile Phone",
    brand: "Samsung",
    model: "s21 Ultra",
    description:
      "The Dell Inspiron 5500 is a dependable and stylish laptop, ideal for students, professionals, and everyday users. This used device is in good working condition and offers Dell's trusted build quality with smooth performance for daily tasks such as office work, online classes, browsing, and entertainment. Its comfortable keyboard, clear display, and portable design make it suitable for both work and home use. A reliable and cost-effective choice, with negotiable price for interested buyers.",
    images: [
      "https://picsum.photos/seed/sam1/400/400",
      "https://picsum.photos/seed/sam2/400/400",
      "https://picsum.photos/seed/sam3/400/400",
      "https://picsum.photos/seed/sam4/400/400",
      "https://picsum.photos/seed/sam5/400/400",
    ],
    dateSubmitted: "2026/01/18",
    timeSubmitted: "09:30 PM",
    seller: {
      name: "Kasun Anuradha",
      username: "kasuna",
      avatar: "",
      badge: "Seller",
    },
  },
};

export default function ReviewAdsContent() {
  const [selectedActions, setSelectedActions] = useState<
    Record<string, ReviewAction>
  >({});
  const [viewingAdId, setViewingAdId] = useState<string | null>(null);

  const handleActionChange = (adId: string, action: ReviewAction) => {
    setSelectedActions((prev) => ({
      ...prev,
      [adId]: prev[adId] === action ? null : action,
    }));
  };

  const handleSubmit = (adId: string) => {
    const action = selectedActions[adId];
    if (!action) return;
    // TODO: API call to submit the review action
    console.log(`Ad ${adId}: ${action}`);
  };

  const handleViewAd = (adId: string) => {
    setViewingAdId(adId);
  };

  const handleBackToList = () => {
    setViewingAdId(null);
  };

  const handleAccept = (adId: string) => {
    // TODO: API call to accept ad
    console.log(`Ad ${adId}: accepted`);
    setViewingAdId(null);
  };

  const handleReject = (adId: string) => {
    // TODO: API call to reject ad
    console.log(`Ad ${adId}: rejected`);
    setViewingAdId(null);
  };

  const viewingAd = viewingAdId ? adDetails[viewingAdId] : null;

  return (
    <div className={`pt-[28px] pl-[28px] ${viewingAd ? "pb-0" : "pb-[28px]"}`}>
      {/* Title - always visible */}
      <h1
        className="text-[#5E5E5E] text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Review Ads
      </h1>

      {/* Divider - always visible */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Content switches between list and detail */}
      {viewingAd ? (
        <div className="mt-[20px]">
          <AdDetailView
            ad={viewingAd}
            onBack={handleBackToList}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      ) : (
        /* Table */
        <div className="mt-[20px] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] bg-[#1174BB] h-[47px] items-center">
            <div
              className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Ad Title
            </div>
            <div
              className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Seller Name
            </div>
            <div
              className="px-[8px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Category
            </div>
            <div
              className="px-[4px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Date Submitted
            </div>
            <div className="w-[120px]" />
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-[12px] mt-[12px]">
            {pendingAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#F4F4F4] rounded-[8px] overflow-hidden"
              >
                {/* Data Row */}
                <div className="flex items-center h-[57px]">
                  <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr] items-center flex-1">
                    <div className="px-[16px] text-[#000000] text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.title}
                    </div>
                    <div className="px-[16px] text-[#000000] text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.sellerName}
                    </div>
                    <div className="px-[16px] text-[#000000] text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.category}
                    </div>
                    <div className="px-[16px] text-[#000000] text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.dateSubmitted}
                    </div>
                  </div>
                  <div className="w-[120px] shrink-0 flex items-center justify-center">
                    <button
                      onClick={() => handleViewAd(ad.id)}
                      className="w-[108px] h-[26px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[12px] font-normal leading-[150%] tracking-normal hover:bg-[#C5C5C5] transition-colors cursor-pointer"
                    >
                      View Ad
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#E0E0E0] mx-[12px]" />

                {/* Action Row */}
                <div className="flex items-center h-[57px]">
                  <div className="flex items-center gap-[28px] flex-1 px-[16px]">
                    {/* Approve & Publish */}
                    <label className="flex items-center gap-[8px] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedActions[ad.id] === "approve"}
                        onChange={() => handleActionChange(ad.id, "approve")}
                        className="appearance-none w-[16px] h-[16px] rounded-[5px] border border-black/70 cursor-pointer checked:bg-[#086508] checked:border-[#086508] relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-[10px] after:font-bold after:opacity-0 checked:after:opacity-100"
                      />
                      <span className="text-[#086508] text-[12px] font-semibold leading-[100%] tracking-normal">
                        Approve & Publish
                      </span>
                    </label>

                    {/* Reject */}
                    <label className="flex items-center gap-[8px] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedActions[ad.id] === "reject"}
                        onChange={() => handleActionChange(ad.id, "reject")}
                        className="appearance-none w-[16px] h-[16px] rounded-[5px] border border-black/70 cursor-pointer checked:bg-[#ED1C24] checked:border-[#ED1C24] relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-[10px] after:font-bold after:opacity-0 checked:after:opacity-100"
                      />
                      <span className="text-[#ED1C24] text-[12px] font-semibold leading-[100%] tracking-normal">
                        Reject
                      </span>
                    </label>

                    {/* Request Changes */}
                    <label className="flex items-center gap-[8px] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedActions[ad.id] === "requestChanges"}
                        onChange={() =>
                          handleActionChange(ad.id, "requestChanges")
                        }
                        className="appearance-none w-[16px] h-[16px] rounded-[5px] border border-black/70 cursor-pointer checked:bg-[#E3800F] checked:border-[#E3800F] relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-[10px] after:font-bold after:opacity-0 checked:after:opacity-100"
                      />
                      <span className="text-[#E3800F] text-[12px] font-semibold leading-[100%] tracking-normal">
                        Request Changes
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="w-[120px] shrink-0 flex items-center justify-center">
                    <button
                      onClick={() => handleSubmit(ad.id)}
                      disabled={!selectedActions[ad.id]}
                      className="w-[103px] h-[32px] bg-[#1174BB] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
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
