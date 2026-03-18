"use client";

import TopBar from "./TopBar";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 bg-white overflow-auto pr-6 xl:pr-[50px]">
          {children}
        </div>
      </div>
    </main>
  );
}
