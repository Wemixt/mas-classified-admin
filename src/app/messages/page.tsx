"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import MessagesContent from "@/components/messages/MessagesContent";
import AdminMessagesContent from "@/components/messages/AdminMessagesContent";
import { useAuth } from "@/hooks";

export default function MessagesPage() {
  const { role } = useAuth();

  return (
    <DashboardLayout>
      {role === "admin" || role === "super_admin" ? (
        <AdminMessagesContent />
      ) : (
        <MessagesContent />
      )}
    </DashboardLayout>
  );
}
