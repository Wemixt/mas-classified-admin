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

export default function SettingsContent() {
  const { user, role, isLoading } = useAuth();

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPasswordDoneModal, setShowPasswordDoneModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;
    setShowChangePasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setShowPasswordDoneModal(true);
  };
  
  if (isLoading) {
    return <div className="p-8">Loading settings...</div>;
  }

  const title = (role === "admin" || role === "super_admin") ? "Admin Profile" : "Moderator Profile";

  return (
    <div className="py-4 md:py-[28px] px-4 md:pl-[28px] md:pr-[28px] max-w-[1200px]">
      {/* Page Header */}
      <h1
        className="text-[#333333] text-[20px] md:text-[24px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        {title}
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
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="h-[36px] px-[16px] bg-[#114A82] text-white rounded-[8px] text-[13px] font-medium flex items-center gap-[8px] hover:bg-[#0E3A66] transition-colors"
                >
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
          {(role !== "admin" && role !== "super_admin") && (
            <div className="flex flex-col gap-[8px]">
              <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">Email :</span> kwinayanajith@gmail.com</p>
              <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">Phone :</span> 0712414095</p>
            </div>
          )}
        </div>

        {/* Admin only: Profile Info Section */}
        {(role === "admin" || role === "super_admin") && (
          <div className="mt-[40px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[8px] mb-[12px]">
              <h3 className="text-[#000000] text-[15px] font-bold">Profile Info</h3>
              <span className="text-[#666666] text-[13px]">Update profile Info</span>
            </div>
            <div className="border-t border-[#333333] mb-[24px]" />
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-[24px]">
              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[20px] sm:gap-[60px]">
                  <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">First Name :</span> Ishan</p>
                  <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">Second Name :</span> Nayanajith</p>
                </div>
                <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">Email :</span> kwinayanajith@gmail.com</p>
                <p className="text-[#555555] text-[14px]"><span className="text-[#000000] font-bold">Phone :</span> 0712414095</p>
              </div>
              <div className="flex flex-col gap-[16px] items-start md:items-end shrink-0 w-full md:w-auto">
                <button className="h-[32px] px-[20px] bg-[#F5F5F5] rounded-full text-[13px] font-medium flex items-center gap-[6px] hover:bg-[#EAEAEA] transition-colors">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 11.5H12M1.5 11.5L5.5 10.5L12 4C12.5 3.5 12.5 2.5 12 2C11.5 1.5 10.5 1.5 10 2L3.5 8.5L2.5 12.5L1.5 11.5Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="h-[40px] px-[20px] bg-white border border-[#A0A0A0] rounded-[8px] text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
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
            {(role === "admin" || role === "super_admin") && (
              <>
                <div className="flex items-center gap-[12px]">
                  <RadioChecked />
                  <span className="text-[#555555] text-[14px] font-bold">New seller registration</span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <RadioChecked />
                  <span className="text-[#555555] text-[14px] font-bold">Moderator activity reports</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-[12px]">
              <RadioChecked />
              <span className="text-[#555555] text-[14px] font-bold">System alerts</span>
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

          {(role !== "admin" && role !== "super_admin") && (
            <>
              <div className="mt-[32px] flex flex-col gap-[16px]">
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="h-[44px] w-full border border-[#D0D0D0] rounded-[8px] text-[14px] font-bold text-[#333333] hover:bg-gray-50 transition-colors"
                >
                  Change Password
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="h-[44px] w-full border border-[#D0D0D0] rounded-[8px] text-[14px] font-bold text-[#D32F2F] hover:bg-red-50 transition-colors"
                >
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
            </>
          )}
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

      {/* User Management Settings (Admin Only) */}
      {(role === "admin" || role === "super_admin") && (
        <div className="mt-[50px]">
          <h3 className="text-[#666666] text-[20px] font-normal mb-[12px]" style={{ fontFamily: "Eurostile, sans-serif" }}>User Management Settings</h3>
          <div className="border-t border-[#D0D0D0] mb-[24px]" />
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <span className="text-[#888888] text-[14px] font-bold mb-[4px]">Ad Approval Mode</span>
              <div className="flex items-center gap-[12px]">
                <RadioUnchecked />
                <span className="text-[#555555] text-[14px] font-bold">Require approval before activation</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <RadioChecked />
                <span className="text-[#555555] text-[14px] font-bold">Allow new seller registrations</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-[16px]">
              <button className="w-full sm:w-auto h-[44px] px-[24px] bg-[#1174BB] text-white rounded-[8px] text-[14px] font-bold hover:bg-[#0E63A0] transition-colors shadow-sm">
                Manage Moderators
              </button>
              <button className="w-full sm:w-auto h-[44px] px-[24px] bg-[#1174BB] text-white rounded-[8px] text-[14px] font-bold hover:bg-[#0E63A0] transition-colors shadow-sm">
                Manage Sellers
              </button>
            </div>
          </div>

          <div className="mt-[60px] flex items-center gap-[16px]">
            <button className="h-[44px] px-[32px] bg-[#114A82] text-white rounded-[8px] text-[14px] font-bold hover:bg-[#0E3A66] transition-colors shadow-sm">
              Save Changers
            </button>
            <button className="h-[44px] px-[32px] bg-[#F5F5F5] text-[#000000] rounded-[8px] text-[14px] font-bold hover:bg-[#EAEAEA] transition-colors shadow-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Change Photo Modal ── */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={() => setShowPhotoModal(false)}>
          <div className="bg-white w-full max-w-[600px] rounded-[16px] p-[24px] md:p-[32px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-[24px] right-[24px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="bg-[#F5F5F5] rounded-[10px] w-full h-[250px] mt-[16px] flex items-center justify-center border border-[#E0E0E0]">
              <div className="bg-white rounded-[8px] px-[24px] py-[12px] shadow-sm font-bold text-[#000000] text-[15px]">
                Upload here
              </div>
            </div>
            <div className="flex items-center gap-[16px] mt-[24px]">
              <button onClick={() => { setShowPhotoModal(false); setShowDoneModal(true); }} className="flex-1 h-[48px] bg-[#114A82] text-white rounded-[8px] text-[15px] font-medium hover:bg-[#0E3A66] transition-colors">
                Save Change
              </button>
              <button onClick={() => setShowPhotoModal(false)} className="flex-1 h-[48px] bg-[#F5F5F5] text-[#000000] rounded-[8px] text-[15px] font-medium hover:bg-[#EAEAEA] transition-colors border border-[#D0D0D0]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Done Modal ── */}
      {showDoneModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowDoneModal(false)}
        >
          <div 
            className="bg-[#F4F5F7] w-full max-w-[400px] rounded-[16px] p-[40px] flex flex-col items-center justify-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDoneModal(false)}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="mb-[24px]">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="56" fill="#1174BB" />
                <path d="M34 62L52 80L86 42" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 
              className="text-[#000000] text-[28px] md:text-[32px] font-normal leading-[100%]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Done!
            </h2>
          </div>
        </div>
      )}

      {/* ── Change Password Modal ── */}
      {showChangePasswordModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowChangePasswordModal(false)}
        >
          <div
            className="bg-white w-full max-w-[495px] rounded-[16px] p-[32px] md:p-[40px] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowChangePasswordModal(false)}
              className="absolute top-[20px] right-[20px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2
              className="text-[#000000] text-[22px] md:text-[24px] font-medium leading-[100%] mb-[16px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Change your password
            </h2>
            <div className="border-t border-[#E0E0E0] mb-[24px]" />
            <div className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[13px] md:text-[14px] font-bold leading-[100%]" style={{ fontFamily: "Eurostile, sans-serif" }}>
                  Current Password
                </label>
                <div className="flex items-center h-[48px] rounded-[8px] border border-[#D0D0D0] bg-white px-[14px] gap-[10px] focus-within:border-[#114A82] transition-colors">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="flex-1 bg-transparent text-[#1A1A1A] text-[13px] md:text-[14px] font-normal outline-none placeholder:text-[#C0C0C0]"
                    style={{ fontFamily: "Eurostile, sans-serif" }}
                  />
                  <button type="button" onClick={() => setShowCurrent((v) => !v)} className="shrink-0 text-[#9A9A9A] hover:text-[#555] transition-colors cursor-pointer">
                    {showCurrent ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[13px] md:text-[14px] font-bold leading-[100%]" style={{ fontFamily: "Eurostile, sans-serif" }}>
                  New Password
                </label>
                <div className="flex items-center h-[48px] rounded-[8px] border border-[#D0D0D0] bg-white px-[14px] gap-[10px] focus-within:border-[#114A82] transition-colors">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 bg-transparent text-[#1A1A1A] text-[13px] md:text-[14px] font-normal outline-none placeholder:text-[#C0C0C0]"
                    style={{ fontFamily: "Eurostile, sans-serif" }}
                  />
                  <button type="button" onClick={() => setShowNew((v) => !v)} className="shrink-0 text-[#9A9A9A] hover:text-[#555] transition-colors cursor-pointer">
                    {showNew ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[13px] md:text-[14px] font-bold leading-[100%]" style={{ fontFamily: "Eurostile, sans-serif" }}>
                  Confirm New Password
                </label>
                <div className="flex items-center h-[48px] rounded-[8px] border border-[#D0D0D0] bg-white px-[14px] gap-[10px] focus-within:border-[#114A82] transition-colors">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 bg-transparent text-[#1A1A1A] text-[13px] md:text-[14px] font-normal outline-none placeholder:text-[#C0C0C0]"
                    style={{ fontFamily: "Eurostile, sans-serif" }}
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)} className="shrink-0 text-[#9A9A9A] hover:text-[#555] transition-colors cursor-pointer">
                    {showConfirm ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleChangePassword}
              disabled={!currentPassword || !newPassword || !confirmPassword}
              className="mt-[28px] w-full h-[52px] bg-[#114A82] hover:bg-[#0E3A66] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] text-white text-[15px] md:text-[16px] font-bold leading-[100%] transition-colors cursor-pointer"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Change Password
            </button>
          </div>
        </div>
      )}

      {/* ── Change Password Done Modal ── */}
      {showPasswordDoneModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowPasswordDoneModal(false)}
        >
          <div
            className="bg-[#F4F5F7] w-full max-w-[400px] rounded-[16px] p-[40px] flex flex-col items-center justify-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPasswordDoneModal(false)}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="mb-[24px]">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="56" fill="#1174BB" />
                <path d="M34 62L52 80L86 42" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2
              className="text-[#000000] text-[28px] md:text-[32px] font-normal leading-[100%]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Done!
            </h2>
          </div>
        </div>
      )}

      {/* ── Confirm Deletion Modal ── */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white w-full max-w-[500px] rounded-[16px] p-[24px] md:p-[32px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border border-dashed border-[#1174BB] rounded-[12px] p-[32px] flex flex-col items-center text-center">
              <h2
                className="text-[#1A1A1A] text-[22px] md:text-[26px] font-normal leading-[120%] mb-[16px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                Confirm Deletion
              </h2>
              <div className="w-full border-t border-[#E0E0E0] mb-[24px]" />
              <p
                className="text-[#333333] text-[15px] md:text-[17px] font-medium leading-[140%] mb-[4px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                Are you sure you want to delete your account?
              </p>
              <p
                className="text-[#333333] text-[15px] md:text-[17px] font-medium leading-[140%] mb-[32px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                This action can not be undone.
              </p>
              <div className="flex items-center gap-[16px] w-full max-w-[340px]">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 h-[44px] md:h-[48px] bg-[#E9E9E9] text-[#D32F2F] rounded-[8px] text-[15px] font-bold hover:bg-[#DFDFDF] transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 h-[44px] md:h-[48px] bg-[#1174BB] text-white rounded-[8px] text-[15px] font-bold hover:bg-[#0E63A0] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
