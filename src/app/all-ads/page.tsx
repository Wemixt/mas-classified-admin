"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AllAdsContent from "@/components/all-ads/AllAdsContent";
import ModeratorAllAdsContent from "@/components/all-ads/ModeratorAllAdsContent";
import { useAuth } from "@/hooks";

export default function AllAdsPage() {
  const { role } = useAuth();

  return (
    <DashboardLayout>
      {role === "admin" || role === "super_admin" ? (
        <AllAdsContent />
      ) : (
        <ModeratorAllAdsContent />
      )}
    </DashboardLayout>
  );
}
