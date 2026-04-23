"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks";

const Toggle = ({ active }: { active: boolean }) => (
  <div className={`w-[40px] h-[22px] rounded-[11px] flex items-center p-[2px] transition-colors cursor-pointer ${active ? 'bg-[#4CAF50] justify-end' : 'bg-[#A0A0A0] justify-start'}`}>
    <div className="w-[18px] h-[18px] bg-white rounded-full shadow-sm" />
  </div>
);

const RadioChecked = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8" stroke="#0F792F" strokeWidth="2"/>
    <circle cx="9" cy="9" r="4" fill="#0F792F"/>
  </svg>
);

const RadioUnchecked = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8" stroke="#666666" strokeWidth="2"/>
  </svg>
);

export default function ModeratorProfileContent() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div className="py-4 md:py-[28px] px-4 md:pl-[28px] md:pr-[28px] max-w-[1200px]">
      {/* Page Header */}
      <h1
        className="text-[#333333] text-[20px] md:text-[24px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Moderator Profile
      </h1>
      <p className="text-[#666666] text-[13px] md:text-[14px] font-normal leading-[100%] tracking-normal mt-[8px]">
        Manage your account information and personal settings
      </p>

      <div className="border-t border-[#D0D0D0] mt-[16px] mb-[24px]" />

      {/* Profile Card */}
      <div className="border border-[#D0D0D0] rounded-[16px] p-[24px] md:p-[32px] bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[24px]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-[24px]">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#E9E9E9] shrink-0">
              <Image
                src={user?.avatar || "/logos/mass logo.png"}
                alt="Profile photo"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[#000000] text-[24px] font-bold leading-[100%] mb-[8px]">Ishan Nayanajith</h2>
              <p className="text-[#666666] text-[15px] font-normal leading-[100%] mb-[16px]">@kwinayanajith</p>
              <div className="flex items-center gap-[12px]">
                <button className="h-[36px] px-[16px] bg-[#114A82] text-white rounded-[8px] text-[13px] font-medium flex items-center gap-[8px] hover:bg-[#0E3A66] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 7L11 5H13L15 7H18C19.1 7 20 7.9 20 9V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V9C4 7.9 4.9 7 6 7H9Z" fill="white" opacity="0.9"/>
                    <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="#114A82" strokeWidth="2" fill="white"/>
                  </svg>
                  Change Photo
                </button>
                <button className="h-[36px] px-[16px] bg-[#EAEAEA] text-[#333333] rounded-[8px] text-[13px] font-medium flex items-center gap-[8px] hover:bg-[#DFDFDF] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 21C6.45 21 5.98 20.8 5.59 20.41C5.2 20.02 5 19.55 5 19V7H4V5H9V4H15V5H20V7H19V19C19 19.55 18.8 20.02 18.41 20.41C18.02 20.8 17.55 21 17 21H7ZM17 7H7V19H17V7ZM9 17H11V9H9V17ZM13 17H15V9H13V17Z" fill="#333333"/>
                  </svg>
                  Remove Photo
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">Email :</span> kwinayanajith@gmail.com</p>
            <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">Phone :</span> 0712414095</p>
          </div>
        </div>
      </div>

      {/* Search Settings */}
      <div className="mt-[32px] max-w-[400px]">
        <div className="h-[44px] border border-[#A0A0A0] rounded-[8px] flex items-center px-[16px] gap-[12px] bg-white">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#5E5E5E" fillOpacity="0.7" />
          </svg>
          <input type="text" placeholder="Search Setting" className="flex-1 outline-none text-[14px] placeholder:text-[#5E5E5E]/70" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[60px] gap-y-[40px] mt-[40px]">
        {/* Notification Settings */}
        <div>
          <h3 className="text-[#666666] text-[20px] font-normal mb-[12px]" style={{ fontFamily: "Eurostile, sans-serif" }}>Notification Settings</h3>
          <div className="border-t border-[#D0D0D0] mb-[20px]" />
          
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <RadioChecked />
              <span className="text-[#555555] text-[14px] font-bold">New ad submitted</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <RadioChecked />
              <span className="text-[#555555] text-[14px] font-bold">New message from seller</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <RadioChecked />
              <span className="text-[#555555] text-[14px] font-bold">New system alert</span>
            </div>
          </div>

          <div className="mt-[24px] flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <span className="text-[#555555] text-[14px] font-bold">Show Alerts on Navbar</span>
              <Toggle active={true} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#555555] text-[14px] font-bold">Play Sound for new messages</span>
              <Toggle active={true} />
            </div>
          </div>

          <div className="mt-[32px] flex flex-col gap-[16px]">
            <button className="h-[44px] w-full border border-[#D0D0D0] rounded-[8px] text-[14px] font-bold text-[#333333] hover:bg-gray-50 transition-colors">
              Change Password
            </button>
            <button className="h-[44px] w-full border border-[#D0D0D0] rounded-[8px] text-[14px] font-bold text-[#D32F2F] hover:bg-red-50 transition-colors">
              Delete my account
            </button>
          </div>

          <div className="mt-[32px] flex items-center gap-[16px]">
            <button className="h-[44px] px-[32px] bg-[#114A82] text-white rounded-[8px] text-[14px] font-bold hover:bg-[#0E3A66] transition-colors shadow-sm">
              Save Changers
            </button>
            <button className="h-[44px] px-[32px] bg-[#F5F5F5] text-[#000000] rounded-[8px] text-[14px] font-bold hover:bg-[#EAEAEA] transition-colors shadow-sm">
              Cancel
            </button>
          </div>
        </div>

        {/* System Settings */}
        <div>
          <h3 className="text-[#666666] text-[20px] font-normal mb-[12px]" style={{ fontFamily: "Eurostile, sans-serif" }}>System Settings</h3>
          <div className="border-t border-[#D0D0D0] mb-[20px]" />
          
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span className="text-[#555555] text-[14px] font-bold">Language</span>
              <select className="h-[36px] w-[180px] px-[16px] border border-[#A0A0A0] rounded-[8px] text-[13px] text-[#333333] font-medium outline-none bg-white">
                <option>English</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#555555] text-[14px] font-bold">Time Zone</span>
              <select className="h-[36px] w-[220px] px-[16px] border border-[#A0A0A0] rounded-[8px] text-[13px] text-[#333333] font-medium outline-none bg-white">
                <option>Sri Lanka (GMT +5.30)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#555555] text-[14px] font-bold">Maintains Mode</span>
              <Toggle active={false} />
            </div>
            
            <div className="mt-[32px] flex items-center justify-between">
              <h4 className="text-[#555555] text-[16px] font-normal" style={{ fontFamily: "Eurostile, sans-serif" }}>Default Ad Status</h4>
              <select className="h-[36px] w-[180px] px-[16px] border border-[#A0A0A0] rounded-[8px] text-[13px] text-[#333333] font-medium outline-none bg-white">
                <option>Pending</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <RadioChecked />
                <span className="text-[#555555] text-[14px] font-normal">Allow Edit After Publish</span>
              </div>
              <Toggle active={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
