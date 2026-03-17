import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 bg-[#F5F5F5] overflow-auto pr-6 xl:pr-[50px]">
          <DashboardContent />
        </div>
      </div>
    </main>
  );
}
