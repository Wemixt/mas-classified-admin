"use client";

import { useState } from "react";

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
  const [deleteModalState, setDeleteModalState] = useState<"confirm" | "done" | null>(null);

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

      {/* Header row — title + action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[12px]">
        <div>
          <h2
            className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%]"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Ad Rejection Details
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-[8px] md:gap-[12px]">
          <button
            onClick={() => onReconsider(ad.id)}
            className="h-[32px] px-[12px] md:px-[14px] bg-[#0F792F] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] hover:bg-[#0D6828] transition-colors cursor-pointer"
          >
            Reconsider
          </button>
          <button
            onClick={() => setDeleteModalState("confirm")}
            className="h-[32px] px-[12px] md:px-[14px] bg-[#ED1C24] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] hover:bg-[#D41920] transition-colors cursor-pointer"
          >
            Delete Permanently
          </button>
        </div>
      </div>

      {/* Top section — image + meta, stacked on mobile, side by side on sm+ */}
      <div className="mt-[16px] flex flex-col sm:flex-row gap-[16px] md:gap-[24px] items-start">
        {/* Image placeholder */}
        <div
          className="w-full sm:w-[200px] md:w-[254px] h-[180px] sm:h-[200px] md:h-[226px] rounded-[10px] bg-[#D9D9D9] shrink-0"
          style={{ border: "0.5px solid #5E5E5E" }}
        />

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-[4px]">
            <p
              className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ad Title:{" "}
              <span className="font-normal" style={{ fontFamily: "Poppins" }}>
                {ad.title}
              </span>
            </p>

            <p
              className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Seller:
            </p>

            <div className="flex items-center gap-[10px] md:gap-[12px]">
              <div className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-[#D9D9D9] shrink-0" />
              <div>
                <p
                  className="text-[#000000] text-[14px] md:text-[16px] font-semibold leading-[100%]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {ad.seller.name}
                </p>
                <p
                  className="text-[#000000] text-[12px] md:text-[14px] font-normal leading-[100%] opacity-60"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  @{ad.seller.username}
                </p>
              </div>
            </div>

            <div className="mt-[6px]">
              <p
                className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Category:{" "}
                <span className="font-normal">{ad.category}</span>
              </p>
              <p
                className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Status:{" "}
                <span className="font-normal text-[#ED1C24]">{ad.status}</span>
              </p>
              <p
                className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[150%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Reviewed By:{" "}
                <span className="font-normal">{ad.reviewedBy}</span>
              </p>
              <p
                className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[150%]"
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
        <div
          className="relative rounded-[8px] pt-[52px] sm:pt-[58px] px-[14px] sm:px-[22px] pb-[18px] sm:pb-[22px]"
          style={{ backgroundColor: "rgba(217, 217, 217, 0.34)" }}
        >
          {/* Top divider line across container */}
          <div className="absolute left-0 right-0 top-[38px] border-t border-[#BDBDBD]" />

          {/* Tab */}
          <div className="absolute left-0 top-0 w-[180px] sm:w-[214px] h-[38px] bg-[#D9D9D9] rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-center px-0">
            <span
              className="text-[#000000] text-[15px] sm:text-[18px] font-semibold leading-[150%] whitespace-nowrap"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Reason for Rejection
            </span>
          </div>

          <h3
            className="text-[#000000] text-[16px] md:text-[20px] font-semibold leading-[150%]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {ad.rejection.heading}
          </h3>

          <div className="mt-[10px]">
            <div
              className="text-[#000000] text-[14px] md:text-[16px] font-medium leading-[150%]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Details:
            </div>
            <div
              className="text-[#000000] text-[13px] md:text-[16px] font-normal leading-[150%] opacity-80 mt-[8px]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {ad.rejection.details}
            </div>
          </div>

          <div className="mt-[16px]">
            <p
              className="text-[#000000] text-[14px] md:text-[16px] font-semibold leading-[150%]"
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
                    className="text-[#000000] text-[13px] md:text-[14px] font-normal leading-[150%] opacity-80"
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

      {/* Delete Confirmation Modal */}
      {deleteModalState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div 
            className="bg-white w-full max-w-[600px] min-h-[300px] rounded-[16px] p-[32px] md:p-[40px] flex flex-col shadow-2xl relative"
          >
            {deleteModalState === "done" ? (
              <div className="flex flex-col items-center justify-center flex-1 h-full py-[20px]">
                {/* Close Icon */}
                <button
                  onClick={() => {
                    setDeleteModalState(null);
                    onDeletePermanently(ad.id);
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
              <div className="flex flex-col items-center text-center flex-1 justify-center">
                <h2 
                  className="text-[#000000] text-[24px] md:text-[28px] font-normal mb-[16px]"
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                >
                  Confirm Deletion
                </h2>
                <div className="w-[80%] max-w-[400px] border-t border-[#E0E0E0] mb-[24px]" />
                <p 
                  className="text-[#000000] text-[15px] md:text-[16px] font-medium leading-[150%] mb-[32px]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Are you sure you want to delete this item?
                  <br />
                  This action cannot be undone.
                </p>
                <div className="flex items-center justify-center gap-[16px] md:gap-[24px] w-full max-w-[360px]">
                  <button
                    onClick={() => {
                      setDeleteModalState("done");
                    }}
                    className="flex-1 h-[48px] md:h-[52px] bg-[#EEEEEE] rounded-[8px] text-[#0F467F] font-semibold text-[15px] md:text-[16px] transition-colors hover:bg-[#E0E0E0] cursor-pointer shadow-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setDeleteModalState(null);
                    }}
                    className="flex-1 h-[48px] md:h-[52px] bg-[#0F467F] rounded-[8px] text-white font-medium text-[15px] md:text-[16px] transition-colors hover:bg-[#0c3966] cursor-pointer shadow-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
