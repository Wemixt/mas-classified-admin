"use client";

import { useEffect, useState } from "react";
import AdDetailView, { type AdDetail } from "./AdDetailView";
import { adsService } from "@/services/ads.service";
import { Ad } from "@/types";

type ReviewAction = "approve" | "reject" | "requestChanges" | null;

export default function ReviewAdsContent() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActions, setSelectedActions] = useState<
    Record<string, ReviewAction>
  >({});
  const [viewingAd, setViewingAd] = useState<Ad | null>(null);

  useEffect(() => {
    console.log("[ReviewAdsContent] Mounted. Fetching ads...");
    fetchAds();
  }, []);

  const fetchAds = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);
    console.log(`[ReviewAdsContent] fetchAds(${page}) ...`);
    try {
      const response = await adsService.getMyAds(page);
      console.log("[ReviewAdsContent] Response received:", response);
      if (response.success) {
        setAds(response.data.data);
        setMeta(response.data.meta);
      } else {
        console.error("[ReviewAdsContent] API Error:", response.message);
        setError(response.message || "Failed to fetch ads");
      }
    } catch (err: any) {
      console.error("[ReviewAdsContent] Fetch Exception:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionChange = (adId: string, action: ReviewAction) => {
    setSelectedActions((prev) => ({
      ...prev,
      [adId]: prev[adId] === action ? null : action,
    }));
  };

  const handleSubmit = async (adId: string, uuid: string) => {
    const action = selectedActions[adId];
    if (!action) return;
    
    // Map internal action to API status
    const statusMap: Record<string, "APPROVED" | "REJECTED" | "CHANGES_REQUESTED"> = {
      approve: "APPROVED",
      reject: "REJECTED",
      requestChanges: "CHANGES_REQUESTED",
    };

    try {
      setIsLoading(true);
      const result = await adsService.updateAdReview(uuid, statusMap[action]);
      if (result.success) {
        // Remove ad from list after success
        setAds((prev) => prev.filter((a) => a.id !== adId));
        setSelectedActions((prev) => {
          const next = { ...prev };
          delete next[adId];
          return next;
        });
      } else {
        alert(result.message || "Failed to update ad status");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred during submission");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAd = (ad: Ad) => {
    setViewingAd(ad);
  };

  const handleBackToList = () => {
    setViewingAd(null);
  };

  const handleAccept = async (uuid: string) => {
    try {
      setIsLoading(true);
      const result = await adsService.updateAdReview(uuid, "APPROVED");
      if (result.success) {
        setAds((prev) => prev.filter((a) => a.uuid !== uuid));
        setViewingAd(null);
      } else {
        alert(result.message || "Failed to accept ad");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (uuid: string) => {
    try {
      setIsLoading(true);
      const result = await adsService.updateAdReview(uuid, "REJECTED");
      if (result.success) {
        setAds((prev) => prev.filter((a) => a.uuid !== uuid));
        setViewingAd(null);
      } else {
        alert(result.message || "Failed to reject ad");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Convert Ad to AdDetail for the view component
  const formatAdDetail = (ad: Ad): AdDetail => {
    const date = new Date(ad.createdAt);
    return {
      id: ad.id,
      title: ad.title,
      price: Number(ad.price) || 0,
      negotiable: ad.isNegotiable,
      category: ad.categoryName,
      condition: ad.condition,
      deviceType: ad.categoryName,
      brand: ad.brand,
      model: ad.model,
      description: ad.contactDetails || "No description provided", // Using contactDetails as fallback or just a placeholder
      images: ad.images && ad.images.length > 0 ? ad.images : ["https://picsum.photos/seed/placeholder/400/400"],
      dateSubmitted: date.toLocaleDateString(),
      timeSubmitted: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      seller: {
        name: ad.seller?.fullName || "Unknown Seller",
        username: ad.seller?.email.split('@')[0] || "unknown",
        avatar: ad.seller?.avatar || "",
      },
    };
  };

  return (
    <div 
      suppressHydrationWarning
      className={`py-4 md:pt-[28px] px-4 md:pl-[28px] md:pr-4 ${viewingAd ? "pb-0" : "md:pb-[28px]"}`}
    >
      {/* Title */}
      <h1
        className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Review Ads
      </h1>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Content switches between list and detail */}
      {viewingAd ? (
        <div className="mt-[20px]">
          <AdDetailView
            ad={formatAdDetail(viewingAd)}
            onBack={handleBackToList}
            onAccept={() => handleAccept(viewingAd.uuid)}
            onReject={() => handleReject(viewingAd.uuid)}
          />
        </div>
      ) : (
        /* Table */
        <div className="mt-[20px] overflow-hidden">
          {isLoading && ads.length === 0 ? (
            <div className="py-20 text-center text-gray-500">Loading ads...</div>
          ) : error ? (
            <div className="py-20 text-center text-red-500">{error}</div>
          ) : ads.length === 0 ? (
            <div className="py-20 text-center text-gray-500">No pending ads found.</div>
          ) : (
            <>
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
                  className="px-[8px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                >
                  Category
                </div>
                <div
                  className="px-[4px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                >
                  Date Submitted
                </div>
                <div className="w-[100px] xl:w-[120px]" />
              </div>

              {/* ── Mobile Table Header (< md) ── */}
              <div className="md:hidden bg-[#1174BB] h-[40px] flex items-center px-[12px]">
                <span
                  className="text-white text-[14px] font-normal leading-[100%]"
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                >
                  Pending Review List
                </span>
              </div>

              {/* Table Body */}
              <div className="flex flex-col gap-[10px] md:gap-[12px] mt-[10px] md:mt-[12px]">
                {ads.map((ad) => (
                  <div
                    key={ad.id}
                    className="bg-[#F4F4F4] rounded-[8px] overflow-hidden"
                  >
                    {/* ── Desktop Data Row (md+) ── */}
                    <div className="hidden md:flex items-center h-[57px]">
                      <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr] items-center flex-1 min-w-0">
                        <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                          {ad.title}
                        </div>
                        <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                          {ad.seller?.fullName || "Unknown"}
                        </div>
                        <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal">
                          {ad.categoryName}
                        </div>
                        <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal">
                          {new Date(ad.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="w-[100px] xl:w-[120px] shrink-0 flex items-center justify-center">
                        <button
                          onClick={() => handleViewAd(ad)}
                          className="w-[88px] xl:w-[108px] h-[26px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[12px] font-normal leading-[150%] tracking-normal hover:bg-[#C5C5C5] transition-colors cursor-pointer"
                        >
                          View Ad
                        </button>
                      </div>
                    </div>

                    {/* ── Mobile Card Row (< md) ── */}
                    <div className="md:hidden flex items-start gap-[10px] p-[12px]">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#000000] text-[13px] font-normal leading-[140%] truncate">
                          {ad.title}
                        </p>
                        <p className="text-[#5E5E5E] text-[11px] mt-[2px]">
                          {ad.seller?.fullName || "Unknown"} · {ad.categoryName} · {new Date(ad.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleViewAd(ad)}
                        className="shrink-0 h-[26px] px-[10px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[11px] font-normal hover:bg-[#C5C5C5] transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#E0E0E0] mx-[12px]" />

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center gap-[8px] md:gap-0 min-h-[50px] md:h-[57px] px-[12px] md:px-0 py-[8px] md:py-0">
                      {/* Checkboxes */}
                      <div className="flex flex-wrap items-center gap-[12px] md:gap-[28px] flex-1 md:px-[16px]">
                        {/* Approve & Publish */}
                        <label className="flex items-center gap-[6px] md:gap-[8px] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={selectedActions[ad.id] === "approve"}
                            onChange={() => handleActionChange(ad.id, "approve")}
                            className="appearance-none w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-[5px] border border-black/70 cursor-pointer checked:bg-[#086508] checked:border-[#086508] relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-[9px] md:after:text-[10px] after:font-bold after:opacity-0 checked:after:opacity-100"
                          />
                          <span className="text-[#086508] text-[11px] md:text-[12px] font-semibold leading-[100%] tracking-normal">
                            Approve &amp; Publish
                          </span>
                        </label>

                        {/* Reject */}
                        <label className="flex items-center gap-[6px] md:gap-[8px] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={selectedActions[ad.id] === "reject"}
                            onChange={() => handleActionChange(ad.id, "reject")}
                            className="appearance-none w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-[5px] border border-black/70 cursor-pointer checked:bg-[#ED1C24] checked:border-[#ED1C24] relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-[9px] md:after:text-[10px] after:font-bold after:opacity-0 checked:after:opacity-100"
                          />
                          <span className="text-[#ED1C24] text-[11px] md:text-[12px] font-semibold leading-[100%] tracking-normal">
                            Reject
                          </span>
                        </label>

                        {/* Request Changes */}
                        <label className="flex items-center gap-[6px] md:gap-[8px] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={selectedActions[ad.id] === "requestChanges"}
                            onChange={() =>
                              handleActionChange(ad.id, "requestChanges")
                            }
                            className="appearance-none w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-[5px] border border-black/70 cursor-pointer checked:bg-[#E3800F] checked:border-[#E3800F] relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-[9px] md:after:text-[10px] after:font-bold after:opacity-0 checked:after:opacity-100"
                          />
                          <span className="text-[#E3800F] text-[11px] md:text-[12px] font-semibold leading-[100%] tracking-normal">
                            Request Changes
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="w-full md:w-[100px] xl:w-[120px] shrink-0 flex items-center md:justify-center">
                        <button
                          onClick={() => handleSubmit(ad.id, ad.uuid)}
                          disabled={!selectedActions[ad.id] || isLoading}
                          className="w-full md:w-[88px] xl:w-[103px] h-[32px] bg-[#1174BB] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? "..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
