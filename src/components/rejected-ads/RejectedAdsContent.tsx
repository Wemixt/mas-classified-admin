"use client";

import { useState, useEffect } from "react";
import RejectedAdDetailView, {
  type RejectedAdDetail,
} from "./RejectedAdDetailView";
import { adService } from "@/services/moderator/ad.service";
import type { Ad } from "@/types";


export default function RejectedAdsContent() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingAdId, setViewingAdId] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<RejectedAdDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [messageModalState, setMessageModalState] = useState<{ adId: string; step: "compose" | "done" } | null>(null);
  const [messageText, setMessageText] = useState("");
  const [deleteModalState, setDeleteModalState] = useState<{ adId: string; step: "confirm" | "done" } | null>(null);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await adService.getAdminAds("REJECTED");
      setAds(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load rejected ads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleReconsider = async (adId: string) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;

    try {
      setLoading(true);
      await adService.updateAdStatus(ad.uuid, "PENDING_REVIEW");
      setViewingAdId(null);
      setSelectedAd(null);
      await fetchAds();
    } catch (err) {
      setError("Failed to reconsider ad");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePermanently = (adId: string) => {
    setDeleteModalState({ adId, step: "confirm" });
  };

  const handleSendMessage = (adId: string) => {
    setMessageModalState({ adId, step: "compose" });
  };

  const handleViewAd = async (adId: string) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;

    try {
      setLoadingDetail(true);
      setViewingAdId(adId);
      const response = await adService.getAdById(ad.uuid);
      if (response.success && response.data) {
        const fullAd = response.data;
        setSelectedAd({
          id: fullAd.id,
          title: fullAd.title,
          seller: { 
            name: fullAd.userName || fullAd.user?.fullName || fullAd.seller?.name || "Unknown Seller",
            username: fullAd.userEmail?.split('@')[0] || fullAd.user?.email?.split('@')[0] || "unknown" 
          },
          category: fullAd.categoryName,
          status: fullAd.status,
          reviewedBy: "System",
          reviewedOnDate: new Date(fullAd.createdAt).toLocaleDateString(),
          reviewedOnTime: new Date(fullAd.createdAt).toLocaleTimeString(),
          rejection: {
            heading: fullAd.rejectionReason || "Ad was rejected",
            details: "No further details provided.",
            issuesFound: [],
          },
        });
      }
    } catch (err) {
      console.error("Failed to fetch ad details", err);
      setError("Failed to fetch ad details");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleBackToList = () => {
    setViewingAdId(null);
    setSelectedAd(null);
  };

  const viewingAdData = ads.find(a => a.id === viewingAdId);
  const viewingAd = selectedAd;

  const viewingListAd = viewingAdData;

  return (
    <div className="py-4 md:pt-[28px] md:pb-[28px] px-4 md:pl-[28px] md:pr-4">
      {/* Title row with breadcrumb */}
      <div className="flex items-baseline gap-[8px] flex-wrap">
        <h1
          className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Rejected Ads
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

      {viewingAd ? (
        <div className="mt-[20px]">
          <RejectedAdDetailView
            ad={viewingAd}
            onBack={handleBackToList}
            onReconsider={handleReconsider}
            onDeletePermanently={handleDeletePermanently}
          />
        </div>
      ) : (
        /* Table */
        <div className="mt-[20px] overflow-hidden">

          {/* ── Desktop Table Header (md+) ── */}
          <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_auto] bg-[#1174BB] h-[47px] items-center">
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
            <div className="w-[100px] xl:w-[120px]" />
          </div>

          {/* ── Mobile Table Header (< md) ── */}
          <div className="md:hidden bg-[#1174BB] h-[40px] flex items-center px-[12px]">
            <span
              className="text-white text-[14px] font-normal leading-[100%]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Rejected Ads List
            </span>
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-[10px] md:gap-[12px] mt-[10px] md:mt-[12px]">
            {loading ? (
              <div className="py-20 text-center text-[#5E5E5E]">Loading ads...</div>
            ) : error ? (
              <div className="py-20 text-center text-red-500">{error}</div>
            ) : ads.length === 0 ? (
              <div className="py-20 text-center text-[#5E5E5E]">No rejected ads found.</div>
            ) : ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#F4F4F4] rounded-[8px] overflow-hidden"
              >
                {/* ── Desktop Data Row (md+) ── */}
                <div className="hidden md:flex items-center h-[57px]">
                  <div className="grid grid-cols-[2fr_1.2fr_1fr] items-center flex-1 min-w-0">
                    <div className="px-[16px] flex items-center gap-[12px] min-w-0">
                      <div className="w-[62px] h-[41px] rounded-[4px] bg-[#D9D9D9] shrink-0" />
                      <span className="text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                        {ad.title}
                      </span>
                    </div>
                     <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                      {ad.userName}
                    </div>
                    <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal">
                      {ad.categoryName}
                    </div>
                  </div>
                  <div className="w-[100px] xl:w-[120px] shrink-0 flex items-center justify-center">
                    <button
                      onClick={() => handleViewAd(ad.id)}
                      className="w-[88px] xl:w-[108px] h-[26px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[12px] font-normal leading-[150%] tracking-normal hover:bg-[#C5C5C5] transition-colors cursor-pointer"
                    >
                      View Reason
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
                      {ad.userName} · {ad.categoryName}
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
                  <div className="flex flex-wrap items-center gap-[8px] md:gap-[12px]">
                    <button
                      onClick={() => handleReconsider(ad.id)}
                      className="h-[30px] md:h-[32px] px-[10px] md:px-[14px] bg-[#0F792F] rounded-[8px] text-white text-[11px] md:text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0D6828] transition-colors"
                    >
                      Reconsider
                    </button>
                    <button
                      onClick={() => handleDeletePermanently(ad.id)}
                      className="h-[30px] md:h-[32px] px-[10px] md:px-[14px] bg-[#ED1C24] rounded-[8px] text-white text-[11px] md:text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#D41920] transition-colors"
                    >
                      Delete Permanently
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-[8px] md:gap-[12px]">
                    <span className="text-[#242424] text-[11px] md:text-[12px] font-normal leading-[150%] tracking-normal whitespace-nowrap">
                      Rejected by{" "}
                      <strong className="font-semibold">System</strong>
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

      {/* Message Modal */}
      {messageModalState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div 
            className="bg-white w-full max-w-[600px] min-h-[360px] rounded-[16px] p-[24px] md:p-[32px] flex flex-col shadow-2xl relative"
          >
            {messageModalState.step === "done" ? (
              <div className="flex flex-col items-center justify-center flex-1 h-full py-[20px]">
                {/* Close Icon */}
                <button
                  onClick={() => {
                    setMessageModalState(null);
                    setMessageText("");
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
                  placeholder="Type here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
                
                <div className="flex items-center gap-[16px] md:gap-[20px] mt-[24px]">
                  <button
                    onClick={() => {
                      setMessageModalState(null);
                      setMessageText("");
                    }}
                    className="flex-1 h-[52px] bg-white border border-[#E0E0E0] rounded-[8px] text-[#000] font-medium text-[15px] md:text-[16px] transition-colors hover:bg-gray-50 cursor-pointer shadow-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => {
                      // Transition to Done modal
                      setMessageModalState({ ...messageModalState, step: "done" });
                    }}
                    className="flex-1 h-[52px] bg-[#0F467F] rounded-[8px] text-white font-medium text-[15px] md:text-[16px] transition-colors hover:bg-[#0c3966] cursor-pointer shadow-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteModalState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div 
            className="bg-white w-full max-w-[600px] min-h-[300px] rounded-[16px] p-[32px] md:p-[40px] flex flex-col shadow-2xl relative"
          >
            {deleteModalState.step === "done" ? (
              <div className="flex flex-col items-center justify-center flex-1 h-full py-[20px]">
                {/* Close Icon */}
                <button
                  onClick={() => {
                    setDeleteModalState(null);
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
                      setDeleteModalState({ ...deleteModalState, step: "done" });
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
