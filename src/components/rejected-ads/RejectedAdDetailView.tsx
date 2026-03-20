"use client";

export interface RejectedAdDetail {
  id: string;
  title: string;
  seller: {
    name: string;
    username: string;
  };
  category: string;
  status: string;
  reviewedBy: string;
  reviewedOnDate: string;
  reviewedOnTime: string;
  rejection: {
    heading: string;
    details: string;
    issuesFound: string[];
  };
}

interface RejectedAdDetailViewProps {
  ad: RejectedAdDetail;
  onBack: () => void;
  onReconsider: (adId: string) => void;
  onDeletePermanently: (adId: string) => void;
}

export default function RejectedAdDetailView({
  ad,
  onBack,
  onReconsider,
  onDeletePermanently,
}: RejectedAdDetailViewProps) {
  return (
    <div>
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

      <div className="flex items-start justify-between">
        <div>
          <h2
            className="text-[#5E5E5E] text-[22px] font-normal leading-[100%]"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Ad Rejection Details
          </h2>
        </div>

        <div className="flex items-center gap-[12px]">
          <button
            onClick={() => onReconsider(ad.id)}
            className="h-[32px] px-[14px] bg-[#0F792F] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] hover:bg-[#0D6828] transition-colors cursor-pointer"
          >
            Reconsider
          </button>
          <button
            onClick={() => onDeletePermanently(ad.id)}
            className="h-[32px] px-[14px] bg-[#ED1C24] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] hover:bg-[#D41920] transition-colors cursor-pointer"
          >
            Delete Permanently
          </button>
        </div>
      </div>

      {/* Top section */}
      <div className="mt-[16px] flex gap-[24px] items-start">
        {/* Image placeholder — 254×226, radius 10, border 0.5px, bg #D9D9D9 */}
        <div
          className="w-[254px] h-[226px] rounded-[10px] bg-[#D9D9D9] shrink-0"
          style={{ border: "0.5px solid #5E5E5E" }}
        />

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-[4px]">
            <p
              className="text-[#000000] text-[14px] font-semibold leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ad Title:{" "}
              <span className="font-normal" style={{ fontFamily: "Poppins" }}>
                {ad.title}
              </span>
            </p>

            <p
              className="text-[#000000] text-[14px] font-semibold leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Seller:
            </p>

            <div className="flex items-center gap-[12px]">
              <div className="w-[44px] h-[44px] rounded-full bg-[#D9D9D9] shrink-0" />
              <div>
                <p
                  className="text-[#000000] text-[16px] font-semibold leading-[100%]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {ad.seller.name}
                </p>
                <p
                  className="text-[#000000] text-[14px] font-normal leading-[100%] opacity-60"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  @{ad.seller.username}
                </p>
              </div>
            </div>

            <div className="mt-[6px]">
              <p
                className="text-[#000000] text-[14px] font-semibold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Category:{" "}
                <span className="font-normal">{ad.category}</span>
              </p>
              <p
                className="text-[#000000] text-[14px] font-semibold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Status:{" "}
                <span className="font-normal text-[#ED1C24]">{ad.status}</span>
              </p>
              <p
                className="text-[#000000] text-[14px] font-semibold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Reviewed By:{" "}
                <span className="font-normal">{ad.reviewedBy}</span>
              </p>
              <p
                className="text-[#000000] text-[14px] font-semibold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Reviewed On:{" "}
                <span className="font-normal">
                  {ad.reviewedOnDate} | {ad.reviewedOnTime}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reason section */}
      <div className="mt-[18px]">
        {/* Container with attached tab (matches Figma) */}
        <div
          className="relative rounded-[8px] pt-[58px] px-[22px] pb-[22px]"
          style={{ backgroundColor: "rgba(217, 217, 217, 0.34)" }}
        >
          {/* Top divider line across container */}
          <div className="absolute left-0 right-0 top-[38px] border-t border-[#BDBDBD]" />

          {/* Tab — bg #D9D9D9, 214×38, radius top-left/top-right 8 */}
          <div className="absolute left-0 top-0 w-[214px] h-[38px] bg-[#D9D9D9] rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-center px-0">
            <span
              className="text-[#000000] text-[18px] font-semibold leading-[150%] whitespace-nowrap"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Reason for Rejection
            </span>
          </div>

          <h3
            className="text-[#000000] text-[20px] font-semibold leading-[150%]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.rejection.heading}
          </h3>

          <div className="mt-[10px]">
            {/* Details label + content must be on separate lines */}
            <div
              className="text-[#000000] text-[16px] font-medium leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Details:
            </div>
            <div
              className="text-[#000000] text-[16px] font-normal leading-[150%] opacity-80 mt-[8px]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {ad.rejection.details}
            </div>
          </div>

          <div className="mt-[16px]">
            <p
              className="text-[#000000] text-[16px] font-semibold leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Issues Found
            </p>

            <div className="mt-[8px] flex flex-col gap-[6px]">
              {ad.rejection.issuesFound.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-[8px]">
                  <span className="text-[#ED1C24] leading-[150%] mt-[1px]">
                    ✕
                  </span>
                  <p
                    className="text-[#000000] text-[14px] font-normal leading-[150%] opacity-80"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {issue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

