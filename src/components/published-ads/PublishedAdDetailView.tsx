"use client";

export interface PublishedAdDetail {
  id: string;
  title: string;
  condition: string;
  deviceType: string;
  brand: string;
  model: string;
  description: string;
  images: string[];
  category: string;
  status: string;
  isLive: boolean;
  viewedCount: number;
  seller: {
    name: string;
    badge?: string;
  };
  approvedBy: string;
  publishedDate: string;
  publishedTime: string;
  approvedDate: string;
  approvedTime: string;
  sellerMobile: string;
  revisions: {
    id: string;
    date: string;
    time: string;
    by: string;
    description: string;
  }[];
  reviews: {
    totalCount: number;
    items: {
      id: string;
      author: string;
      verified: boolean;
      date: string;
      text: string;
      likes: number;
    }[];
  };
}

interface PublishedAdDetailViewProps {
  ad: PublishedAdDetail;
  onBack: () => void;
}

export default function PublishedAdDetailView({
  ad,
  onBack,
}: PublishedAdDetailViewProps) {
  return (
    <div>
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

      {/* Ad title row */}
      <div className="flex flex-wrap items-start gap-[8px] justify-between">
        <h2
          className="text-[#000000] text-[18px] md:text-[22px] xl:text-[24px] font-normal leading-[150%] flex-1 min-w-0"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {ad.title}
        </h2>
        {ad.isLive && (
          <span
            className="h-[28px] px-[14px] bg-[#028B20] rounded-[8px] text-white text-[12px] font-semibold inline-flex items-center justify-center shrink-0"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Ad is live
          </span>
        )}
      </div>

      {/* Two-column layout — stacked on mobile, side-by-side on lg+ */}
      <div className="flex flex-col lg:flex-row gap-[20px] xl:gap-[24px] mt-[16px]">
        {/* Left column — product info */}
        <div className="flex-1 min-w-0">
          {/* Product image */}
          <div
            className="w-full max-w-[338px] h-[200px] sm:h-[260px] xl:h-[285px] bg-[#D9D9D9] rounded-[8px]"
            style={{ border: "0.5px solid #5E5E5E" }}
          />

          {/* Specs */}
          <div className="mt-[16px] md:mt-[20px] flex flex-col gap-[6px] md:gap-[8px]">
            {[
              { label: "Condition", value: ad.condition },
              { label: "Device type", value: ad.deviceType },
              { label: "Brand", value: ad.brand },
              { label: "Model", value: ad.model },
            ].map((spec) => (
              <div key={spec.label} className="flex items-center">
                <span
                  className="text-[#000000] text-[15px] xl:text-[18px] font-normal leading-[100%] tracking-[0.04em] mb-2"
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                >
                  {spec.label} :
                </span>
                <span
                  className="text-[#5E5E5E] text-[15px] xl:text-[18px] font-normal leading-[100%] tracking-[0.04em] ml-[8px] mb-2"
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-[20px] md:mt-[24px]">
            <h3
              className="text-[#000000] text-[17px] xl:text-[20px] font-normal leading-[100%] tracking-[0.04em]"
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
        </div>

        {/* Right column — gray panel */}
        <div
          className="w-full lg:w-[320px] xl:w-[533px] shrink-0 rounded-[8px] p-[16px] md:p-[20px]"
          style={{ backgroundColor: "rgba(217, 217, 217, 0.33)" }}
        >
          {/* Info fields */}
          <div className="flex flex-col gap-[10px] md:gap-[12px]">
            {/* Seller */}
            <div className="flex items-center flex-wrap gap-[8px]">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%] w-[110px] md:w-[130px] shrink-0"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Seller :
              </span>
              <div className="flex items-center gap-[8px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#D2D2D2] flex items-center justify-center text-[9px] font-bold text-[#5E5E5E] shrink-0">
                  {ad.seller.name?.charAt(0) || "U"}
                </div>
                <span
                  className="text-[#000000] text-[13px] md:text-[14px] font-semibold"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {ad.seller.name}
                </span>
                {ad.seller.badge && (
                  <span className="inline-flex items-center justify-center w-[25px] h-[10px] bg-[#E6CA56] text-[#000000] text-[7px] font-bold rounded-[5px]">
                    {ad.seller.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Approved by */}
            <div className="flex items-center flex-wrap gap-[8px]">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%] w-[110px] md:w-[130px] shrink-0"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Approved by :
              </span>
              <span
                className="inline-flex items-center justify-center h-[20px] bg-[#0F467F] text-white text-[11px] font-medium px-[12px] rounded-[10px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {ad.approvedBy}
              </span>
            </div>

            {/* Published */}
            <div className="flex items-center flex-wrap gap-[8px]">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%] w-[110px] md:w-[130px] shrink-0"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Published :
              </span>
              <span
                className="text-[#000000] text-[13px] md:text-[14px] font-semibold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {ad.publishedDate}
                <span className="mx-[6px] text-[#5E5E5E]">|</span>
                {ad.publishedTime}
              </span>
            </div>

            {/* Approved */}
            <div className="flex items-center flex-wrap gap-[8px]">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%] w-[110px] md:w-[130px] shrink-0"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Approved :
              </span>
              <span
                className="text-[#000000] text-[13px] md:text-[14px] font-semibold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {ad.approvedDate}
                <span className="mx-[6px] text-[#5E5E5E]">|</span>
                {ad.approvedTime}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center flex-wrap gap-[8px]">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%] w-[110px] md:w-[130px] shrink-0"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Category :
              </span>
              <span
                className="text-[#000000] text-[13px] md:text-[14px] font-semibold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {ad.category}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center flex-wrap gap-[8px]">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%] w-[110px] md:w-[130px] shrink-0"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Status :
              </span>
              <span
                className="inline-flex items-center justify-center w-[87px] h-[20px] bg-[#00D82F] text-white text-[11px] font-semibold rounded-[8px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {ad.status}
              </span>
            </div>

            {/* Viewed */}
            <div className="flex items-center flex-wrap gap-[8px]">
              <span
                className="text-[#000000] text-[14px] md:text-[16px] font-normal leading-[150%] w-[110px] md:w-[130px] shrink-0"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Viewed :
              </span>
              <div className="flex items-center gap-[6px]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3C4.36 3 1.26 5.28 0 8.5C1.26 11.72 4.36 14 8 14C11.64 14 14.74 11.72 16 8.5C14.74 5.28 11.64 3 8 3ZM8 12.17C5.97 12.17 4.33 10.53 4.33 8.5C4.33 6.47 5.97 4.83 8 4.83C10.03 4.83 11.67 6.47 11.67 8.5C11.67 10.53 10.03 12.17 8 12.17ZM8 6.33C6.8 6.33 5.83 7.3 5.83 8.5C5.83 9.7 6.8 10.67 8 10.67C9.2 10.67 10.17 9.7 10.17 8.5C10.17 7.3 9.2 6.33 8 6.33Z"
                    fill="#5E5E5E"
                  />
                </svg>
                <span
                  className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[150%]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {ad.viewedCount}
                </span>
              </div>
            </div>
          </div>

          {/* Seller's Mobile */}
          <div className="flex justify-end mt-[16px] mb-[-14px] relative z-10">
            <span
              className="inline-flex items-center justify-center h-[27px] bg-[#0F467F] text-white text-[11px] font-medium px-[12px] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-none rounded-br-none"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Seller&apos;s Mobile: {ad.sellerMobile}
            </span>
          </div>

          {/* Revisions Log */}
          {ad.revisions.length > 0 && (
            <div
              className="rounded-[8px] p-[12px] md:p-[16px]"
              style={{ border: "0.5px solid #000000" }}
            >
              <h4
                className="text-[#000000] text-[15px] md:text-[16px] font-bold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Revisions Log
              </h4>
              <div className="flex flex-col gap-[10px] mt-[12px]">
                {ad.revisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#E0E0E0] rounded-[8px] px-[10px] md:px-[12px] py-[8px]"
                  >
                    <p
                      className="text-[#000000] text-[11px] md:text-[12px] font-normal leading-[150%]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Revision #{rev.id} : {rev.date} - {rev.time} by{" "}
                      {rev.by}
                    </p>
                    <p
                      className="text-[#000000] text-[11px] md:text-[12px] font-semibold leading-[150%]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {rev.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mt-[20px] md:mt-[24px]">
            <div className="flex items-center gap-[10px]">
              <h4
                className="text-[#000000] text-[16px] md:text-[18px] font-bold leading-[150%]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                Reviews :
              </h4>
              <span
                className="text-[#000000] text-[12px] md:text-[13px] font-normal border border-[#000000] rounded-[4px] px-[8px] py-[2px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {ad.reviews.totalCount}&nbsp;reviews
              </span>
            </div>
            <div className="flex flex-col gap-[10px] mt-[12px]">
              {ad.reviews.items.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#EDEDED] rounded-[8px] px-[12px] md:px-[14px] py-[10px] md:py-[12px]"
                  style={{ border: "0.4px solid #000000" }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-[6px]">
                    <div className="flex items-center gap-[8px] flex-wrap">
                      <span
                        className="text-[#000000] text-[14px] md:text-[16px] font-bold leading-[150%]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {review.author}
                      </span>
                      {review.verified && (
                        <span className="flex items-center gap-[4px]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="9" cy="9" r="9" fill="#0A7211" />
                            <path
                              d="M6.5 9L8 10.5L11.5 7"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span
                            className="text-[#000000] text-[12px] md:text-[14px] font-normal leading-[100%]"
                            style={{ fontFamily: "Eurostile, sans-serif" }}
                          >
                            Verified Purchase
                          </span>
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[#000000] text-[11px] font-normal leading-[100%]"
                      style={{ fontFamily: "Eurostile, sans-serif" }}
                    >
                      {review.date}
                    </span>
                  </div>
                  <p
                    className="text-[#000000] text-[13px] md:text-[14px] font-normal leading-[150%] mt-[8px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {review.text}
                  </p>
                  <div className="flex items-center gap-[4px] mt-[4px] justify-end">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 7.5V13M2.5 9V13C2.5 13.28 2.72 13.5 3 13.5H11.5C12.08 13.5 12.58 13.1 12.7 12.53L13.5 9.03C13.66 8.3 13.1 7.6 12.35 7.6H10V4.6C10 3.99 9.5 3.5 8.9 3.5C8.68 3.5 8.5 3.68 8.5 3.9V5.5L6.4 8.23C6.14 8.57 5.83 8.69 5.5 8.69"
                        stroke="#1174BB"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-[#1174BB] text-[12px] font-medium"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {review.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
