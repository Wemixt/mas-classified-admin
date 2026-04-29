"use client";

import { useState, useEffect } from "react";
import AdDetailView, { type AdDetail } from "./AdDetailView";
import { adService } from "@/services/moderator/ad.service";
import type { Ad } from "@/types";


type ReviewAction = "approve" | "reject" | "requestChanges" | null;

export default function ReviewAdsContent() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActions, setSelectedActions] = useState<
    Record<string, ReviewAction>
  >({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [viewingAdId, setViewingAdId] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<AdDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await adService.getAdminAds("PENDING_REVIEW");
      setAds(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load pending ads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleActionChange = (adId: string, action: ReviewAction) => {
    setSelectedActions((prev) => ({
      ...prev,
      [adId]: prev[adId] === action ? null : action,
    }));
  };

  const handleSubmit = async (adId: string) => {
    const action = selectedActions[adId];
    if (!action) return;
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;

    try {
      setLoading(true);
      const status = action === "approve" ? "ACTIVE" : "REJECTED";
      const reason = (action === "reject" || action === "requestChanges") ? feedback[adId] : undefined;
      
      await adService.updateAdStatus(ad.uuid, status, reason);
      
      // Clear actions and refresh list
      setSelectedActions(prev => {
        const next = { ...prev };
        delete next[adId];
        return next;
      });
      setFeedback(prev => {
        const next = { ...prev };
        delete next[adId];
        return next;
      });
      
      await fetchAds();
    } catch (err) {
      setError("Failed to update ad status");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          price: Number(fullAd.price),
          negotiable: fullAd.isNegotiable,
          category: fullAd.categoryName,
          condition: fullAd.condition,
          deviceType: fullAd.model,
          brand: fullAd.brand,
          model: fullAd.model,
          description: fullAd.description || "No description provided.",
          images: fullAd.images || [],
          dateSubmitted: new Date(fullAd.createdAt).toLocaleDateString(),
          timeSubmitted: new Date(fullAd.createdAt).toLocaleTimeString(),
          seller: {
            name: fullAd.userName || fullAd.user?.fullName || fullAd.seller?.name || "Unknown Seller",
            username: fullAd.userEmail?.split('@')[0] || fullAd.user?.email?.split('@')[0] || "unknown",
            avatar: "",
            badge: "Seller",
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

  const handleAccept = async (adId: string) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    try {
      setLoading(true);
      await adService.updateAdStatus(ad.uuid, "ACTIVE");
      setViewingAdId(null);
      await fetchAds();
    } catch (err) {
      setError("Failed to approve ad");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (adId: string, reason: string) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    try {
      setLoading(true);
      await adService.updateAdStatus(ad.uuid, "REJECTED", reason);
      setViewingAdId(null);
      setSelectedAd(null);
      await fetchAds();
    } catch (err) {
      setError("Failed to reject ad");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestChanges = async (adId: string, reason: string) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    try {
      setLoading(true);
      // Following user instruction: "both same" (REJECTED)
      await adService.updateAdStatus(ad.uuid, "REJECTED", reason);
      setViewingAdId(null);
      setSelectedAd(null);
      await fetchAds();
    } catch (err) {
      setError("Failed to request changes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const viewingAdData = ads.find(a => a.id === viewingAdId);
  const viewingAd = selectedAd;

  return (
    <div className={`py-4 md:pt-[28px] px-4 md:pl-[28px] md:pr-4 ${viewingAd ? "pb-0" : "md:pb-[28px]"}`}>
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
      {loadingDetail ? (
        <div className="py-20 text-center text-[#5E5E5E]">Loading ad details...</div>
      ) : viewingAd ? (
        <div className="mt-[20px]">
          <AdDetailView
            ad={viewingAd}
            onBack={handleBackToList}
            onAccept={handleAccept}
            onReject={handleReject}
            onRequestChanges={handleRequestChanges}
          />
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
            {loading ? (
              <div className="py-20 text-center text-[#5E5E5E]">Loading ads...</div>
            ) : error ? (
              <div className="py-20 text-center text-red-500">{error}</div>
            ) : ads.length === 0 ? (
              <div className="py-20 text-center text-[#5E5E5E]">No ads pending review.</div>
            ) : ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#F4F4F4] rounded-[8px]"
              >
                {/* ── Desktop Data Row (md+) ── */}
                <div className="hidden md:flex items-center h-[57px]">
                  <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr] items-center flex-1 min-w-0">
                    <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                      {ad.title}
                    </div>
                    <div className="px-[16px] text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[150%] tracking-normal truncate">
                      {ad.userName}
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
                      onClick={() => handleViewAd(ad.id)}
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
                      {ad.userName} · {ad.categoryName} · {new Date(ad.createdAt).toLocaleDateString()}
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

                  {/* Submit Button — shown here only when NO textarea row is needed */}
                  {selectedActions[ad.id] !== "reject" &&
                    selectedActions[ad.id] !== "requestChanges" && (
                      <div className="w-full md:w-[100px] xl:w-[120px] shrink-0 flex items-center md:justify-center">
                        <button
                          onClick={() => handleSubmit(ad.id)}
                          disabled={!selectedActions[ad.id]}
                          className="w-full md:w-[88px] xl:w-[103px] h-[32px] bg-[#1174BB] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                </div>

                {/* Inline Textarea Row — shown below action row for Reject / Request Changes */}
                {(selectedActions[ad.id] === "reject" ||
                  selectedActions[ad.id] === "requestChanges") && (
                  <div className="flex items-center gap-[12px] px-[12px] md:px-[16px] pb-[14px] pt-[2px]">
                    <input
                      autoFocus
                      type="text"
                      className="flex-1 h-[40px] md:h-[44px] bg-white border border-[#D2D2D2] rounded-[8px] px-[14px] text-[#000000] text-[12px] font-normal leading-[150%] tracking-normal outline-none placeholder:text-[#9E9E9E] focus:border-[#1174BB] transition-colors"
                      placeholder="Type the reason here..."
                      value={feedback[ad.id] || ""}
                      onChange={(e) =>
                        setFeedback((prev) => ({
                          ...prev,
                          [ad.id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => handleSubmit(ad.id)}
                      disabled={!feedback[ad.id]?.trim()}
                      className="shrink-0 w-[88px] md:w-[103px] h-[40px] md:h-[44px] bg-[#1174BB] rounded-[8px] text-white text-[12px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
