"use client";

import Image from "next/image";

interface RejectedAd {
  id: string;
  title: string;
  sellerName: string;
  category: string;
  thumbnail: string;
  rejectedBy: string;
}

const rejectedAds: RejectedAd[] = [
  {
    id: "1",
    title: "Dell inspire i7 11th Gen Laptop...",
    sellerName: "Ishan Nayanajith",
    category: "Laptop",
    thumbnail: "/logos/mass logo.png",
    rejectedBy: "Kasun Prasanna",
  },
  {
    id: "2",
    title: "Samsung s21 Ultra 250GB 12...",
    sellerName: "Kasun Anuradha",
    category: "Mobile Phone",
    thumbnail: "/logos/mass logo.png",
    rejectedBy: "Kasun Prasanna",
  },
  {
    id: "3",
    title: "JBL T50 Bluetooth Wireless...",
    sellerName: "Supun Thathsara",
    category: "Headset",
    thumbnail: "/logos/mass logo.png",
    rejectedBy: "Sugath Kalhara",
  },
];

export default function RejectedAdsContent() {
  const handleReconsider = (adId: string) => {
    // TODO: API call to reconsider the ad
    console.log(`Reconsider ad ${adId}`);
  };

  const handleDeletePermanently = (adId: string) => {
    // TODO: API call to permanently delete the ad
    console.log(`Delete permanently ad ${adId}`);
  };

  const handleSendMessage = (adId: string) => {
    // TODO: API call or navigate to message
    console.log(`Send message for ad ${adId}`);
  };

  return (
    <div className="py-[28px] pl-[28px]">
      {/* Title */}
      <h1
        className="text-[#5E5E5E] text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Rejected Ads
      </h1>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Table */}
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
            className="px-[4px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Category
          </div>
          <div />
          <div className="w-[120px]" />
        </div>

        {/* Table Body */}
        <div className="flex flex-col gap-[12px] mt-[12px]">
          {rejectedAds.map((ad) => (
            <div
              key={ad.id}
              className="bg-[#F4F4F4] rounded-[8px] overflow-hidden"
            >
              {/* Data Row */}
              <div className="flex items-center h-[57px]">
                <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr] items-center flex-1">
                  <div className="px-[16px] flex items-center gap-[12px]">
                    <div className="w-[62px] h-[41px] rounded-[4px] overflow-hidden shrink-0 bg-[#D9D9D9]">
                      <Image
                        src={ad.thumbnail}
                        alt={ad.title}
                        width={62}
                        height={41}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-[#000000] text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.title}
                    </span>
                  </div>
                  <div className="px-[16px] text-[#000000] text-[14px] font-normal leading-[150%] tracking-normal">
                    {ad.sellerName}
                  </div>
                  <div className="px-[16px] text-[#000000] text-[14px] font-normal leading-[150%] tracking-normal">
                    {ad.category}
                  </div>
                  <div />
                </div>
                <div className="w-[120px] shrink-0 flex items-center justify-center">
                  <button className="w-[108px] h-[26px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[12px] font-normal leading-[150%] tracking-normal hover:bg-[#C5C5C5] transition-colors">
                    View Reason
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E0E0E0] mx-[12px]" />

              {/* Action Row */}
              <div className="flex items-center justify-between h-[57px] pl-[16px] pr-[6px]">
                <div className="flex items-center gap-[12px]">
                  <button
                    onClick={() => handleReconsider(ad.id)}
                    className="h-[32px] px-[14px] bg-[#0F792F] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0D6828] transition-colors"
                  >
                    Reconsider
                  </button>
                  <button
                    onClick={() => handleDeletePermanently(ad.id)}
                    className="h-[32px] px-[14px] bg-[#ED1C24] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#D41920] transition-colors"
                  >
                    Delete Permanently
                  </button>
                </div>
                <div className="flex items-center gap-[12px]">
                  <span className="text-[#242424] text-[12px] font-normal leading-[150%] tracking-normal whitespace-nowrap">
                    Rejected by{" "}
                    <strong className="font-semibold">{ad.rejectedBy}</strong>
                  </span>
                  <button
                    onClick={() => handleSendMessage(ad.id)}
                    className="h-[32px] px-[14px] bg-[#1174BB] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors whitespace-nowrap"
                  >
                    Send Message to Seller
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
