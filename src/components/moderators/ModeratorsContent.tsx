"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks";

interface Moderator {
  id: string;
  name: string;
  username: string;
  employeeId: string;
  registeredDate: string;
  avatar: string;
  active: boolean;
}

const moderators: Moderator[] = [
  {
    id: "1",
    name: "Kasun Sampath",
    username: "@kasuns",
    employeeId: "MAS 0236",
    registeredDate: "Today",
    avatar: "/logos/mass logo.png",
    active: true,
  },
  {
    id: "2",
    name: "Visal Lakshitha",
    username: "@lakshithavisal",
    employeeId: "MAS 0356",
    registeredDate: "Yesterday",
    avatar: "/logos/mass logo.png",
    active: true,
  },
  {
    id: "3",
    name: "Dulaj samaraweera",
    username: "@dulajj98",
    employeeId: "MAS 0120",
    registeredDate: "Feb 04, 2026",
    avatar: "/logos/mass logo.png",
    active: true,
  },
  {
    id: "4",
    name: "Avishka Sandeepa",
    username: "@avishka49",
    employeeId: "MAS 0120",
    registeredDate: "Feb 04, 2026",
    avatar: "/logos/mass logo.png",
    active: true,
  },
  {
    id: "5",
    name: "Sameera Viraj",
    username: "@sameera",
    employeeId: "MAS 0120",
    registeredDate: "Feb 04, 2026",
    avatar: "/logos/mass logo.png",
    active: false,
  },
];

export default function ModeratorsContent() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (role !== "admin" && role !== "super_admin") {
    return (
      <div className="py-[28px] pl-[28px] text-[#5E5E5E]">
        Access Denied. You do not have permission to view this page.
      </div>
    );
  }

  const [moderatorList, setModeratorList] = useState<Moderator[]>(moderators);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdData, setCreatedData] = useState({ name: "", role: "" });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    employeeId: "",
    role: "Content Moderator",
    tempPassword: "",
  });

  const handleToggleStatus = (moderatorId: string) => {
    setModeratorList((prev) =>
      prev.map((moderator) =>
        moderator.id === moderatorId
          ? { ...moderator, active: !moderator.active }
          : moderator
      )
    );
  };

  const handleAddModerator = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ fullName: "", email: "", employeeId: "", role: "Content Moderator", tempPassword: "" });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCreatedData({ name: "", role: "" });
  };

  const handleCreateAccount = () => {
    console.log("Create moderator:", formData);
    setCreatedData({ name: formData.fullName, role: formData.role });
    setShowForm(false);
    setShowSuccess(true);
    setFormData({ fullName: "", email: "", employeeId: "", role: "Content Moderator", tempPassword: "" });
  };

  const handleViewProfile = (moderatorId: string) => {
    console.log(`View profile for moderator ${moderatorId}`);
  };

  return (
    <div className="py-4 md:pt-[28px] md:pb-[28px] px-4 md:pl-[28px] md:pr-4">
      {/* Create Moderator Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-[16px]"
          onClick={handleCloseForm}
        >
          <div
            className="bg-white rounded-[16px] w-full max-w-[460px] p-[24px] md:p-[32px] shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseForm}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#E0E0E0] flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M11 1L1 11" stroke="#555555" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <h2
              className="text-[#2D2D2D] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal mb-[24px] md:mb-[28px] pr-[32px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Create Moderator Form
            </h2>

            <div className="flex flex-col gap-[16px] md:gap-[20px]">
              {[
                { label: "Full Name", key: "fullName", type: "text", placeholder: "Enter your full name" },
                { label: "Email Address", key: "email", type: "email", placeholder: "Enter your email address" },
                { label: "Employee ID", key: "employeeId", type: "text", placeholder: "Enter employee ID" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-[6px] md:gap-[8px]">
                  <label className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[100%] tracking-normal">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="h-[42px] md:h-[44px] px-[14px] md:px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal placeholder:text-[#A0A0A0] outline-none focus:border-[#1174BB] transition-colors"
                  />
                </div>
              ))}

              {/* Role */}
              <div className="flex flex-col gap-[6px] md:gap-[8px]">
                <label className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[100%] tracking-normal">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="h-[42px] md:h-[44px] px-[14px] md:px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors bg-white appearance-none"
                >
                  <option value="Content Moderator">Content Moderator</option>
                  <option value="Senior Moderator">Senior Moderator</option>
                </select>
              </div>

              {/* Temp Password */}
              <div className="flex flex-col gap-[6px] md:gap-[8px]">
                <label className="text-[#000000] text-[13px] md:text-[14px] font-semibold leading-[100%] tracking-normal">
                  Temp Password
                </label>
                <input
                  type="text"
                  placeholder="TempPass@2026"
                  value={formData.tempPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tempPassword: e.target.value }))}
                  className="h-[42px] md:h-[44px] px-[14px] md:px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal placeholder:text-[#A0A0A0] outline-none focus:border-[#1174BB] transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleCreateAccount}
              className="w-full h-[44px] md:h-[48px] mt-[24px] md:mt-[28px] bg-[#1174BB] rounded-[8px] text-white text-[15px] md:text-[16px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-[16px]"
          onClick={handleCloseSuccess}
        >
          <div
            className="bg-white rounded-[16px] w-full max-w-[460px] px-[24px] md:px-[32px] pt-[16px] pb-[28px] md:pb-[32px] shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseSuccess}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#E0E0E0] flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M11 1L1 11" stroke="#555555" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex justify-center mt-[20px] md:mt-[24px]">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="56" fill="#2E9E2E" />
                <path d="M34 62L52 80L86 42" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2
              className="text-center text-[#2D2D2D] text-[24px] md:text-[28px] font-normal leading-[100%] tracking-normal mt-[16px] md:mt-[20px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Created!
            </h2>
            <p className="text-center text-[#555555] text-[13px] md:text-[14px] font-normal leading-[100%] tracking-normal mt-[10px]">
              Credentials sent via email
            </p>

            <div className="mt-[20px] md:mt-[24px] mx-[4px] md:mx-[8px] border border-[#C8D9EA] bg-[#F5F8FB] rounded-[12px] px-[16px] md:px-[24px] py-[16px] md:py-[18px] flex flex-col gap-[14px] md:gap-[16px]">
              {[
                { label: "Name:", value: createdData.name, bold: false },
                { label: "Role:", value: "Moderator", bold: true },
                { label: "Status:", value: "Active", green: true },
              ].map(({ label, value, bold, green }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[#555555] text-[13px] md:text-[14px] font-normal leading-[100%] tracking-normal">{label}</span>
                  <span className={`text-[13px] md:text-[14px] leading-[100%] tracking-normal ${green ? "text-[#0F792F]" : "text-[#000000]"} ${bold ? "font-semibold" : "font-normal"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-center text-[#E3800F] text-[13px] md:text-[14px] font-normal leading-[100%] tracking-normal mt-[20px] md:mt-[24px]">
              Must change password on first login
            </p>
          </div>
        </div>
      )}

      {/* Title Row */}
      <div className="flex items-center justify-between gap-[8px] pr-0 md:pr-[4px]">
        <h1
          className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Moderators
        </h1>
        <button
          onClick={handleAddModerator}
          className="flex items-center gap-[6px] md:gap-[8px] h-[36px] md:h-[40px] px-[12px] md:px-[20px] bg-[#1174BB] rounded-[8px] text-white text-[12px] md:text-[14px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="9" fill="white" />
            <path d="M9 5V13M5 9H13" stroke="#1174BB" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Add Moderator</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Table */}
      <div className="mt-[20px]">

        {/* ── Desktop Table Header (md+) ── */}
        <div className="hidden md:grid grid-cols-[1.6fr_1fr_1.2fr_1.4fr] bg-[#1174BB] h-[47px] items-center">
          {["Name", "Employee ID", "Registered Date", "Status"].map((h) => (
            <div
              key={h}
              className="px-[16px] text-white text-[15px] xl:text-[17px] font-normal leading-[100%] tracking-normal"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* ── Mobile Table Header (< md) ── */}
        <div className="md:hidden bg-[#1174BB] h-[40px] flex items-center px-[12px] rounded-[4px]">
          <span className="text-white text-[14px] font-normal leading-[100%]" style={{ fontFamily: "Eurostile, sans-serif" }}>
            Moderators List
          </span>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {moderatorList.map((moderator) => (
            <div key={moderator.id}>
              {/* ── Desktop Row (md+) ── */}
              <div className="hidden md:grid grid-cols-[1.6fr_1fr_1.2fr_1.4fr] items-center h-[72px]">
                {/* Name with Avatar */}
                <div className="px-[16px] flex items-center gap-[10px] xl:gap-[12px]">
                  <div className="w-[44px] h-[44px] xl:w-[54px] xl:h-[54px] rounded-full overflow-hidden shrink-0 bg-[#D9D9D9]">
                    <Image
                      src={moderator.avatar}
                      alt={moderator.name}
                      width={54}
                      height={54}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col gap-[4px] min-w-0">
                    <span className="text-[#000000] text-[13px] xl:text-[14px] font-semibold leading-[100%] tracking-normal truncate">
                      {moderator.name}
                    </span>
                    <span className="text-[#000000] text-[12px] xl:text-[14px] font-normal leading-[100%] tracking-normal opacity-60 truncate">
                      {moderator.username}
                    </span>
                  </div>
                </div>

                {/* Employee ID */}
                <div className="px-[16px] text-[#000000] text-[13px] xl:text-[16px] font-normal leading-[100%] tracking-normal opacity-80">
                  {moderator.employeeId}
                </div>

                {/* Registered Date */}
                <div className="px-[16px] text-[#000000] text-[13px] xl:text-[16px] font-normal leading-[100%] tracking-normal opacity-80">
                  {moderator.registeredDate}
                </div>

                {/* Status + View Profile */}
                <div className="px-[16px] flex items-center gap-[10px] xl:gap-[16px]">
                  <button
                    onClick={() => handleToggleStatus(moderator.id)}
                    className={`relative w-[28px] h-[16px] rounded-full transition-colors shrink-0 ${moderator.active ? "bg-[#0F792F]" : "bg-[#CCCCCC]"}`}
                  >
                    <span
                      className={`absolute top-[2px] w-[12px] h-[12px] rounded-full bg-white transition-transform ${moderator.active ? "left-[14px]" : "left-[2px]"}`}
                    />
                  </button>
                  <span className="text-[#000000] text-[13px] xl:text-[14px] font-normal leading-[100%] tracking-normal min-w-[36px]">
                    {moderator.active ? "Active" : "Block"}
                  </span>
                  <button
                    onClick={() => handleViewProfile(moderator.id)}
                    className="h-[25px] px-[10px] xl:px-[14px] bg-[#D9D9D9] rounded-[10px] text-[#000000] text-[11px] xl:text-[12px] font-semibold leading-[150%] tracking-normal opacity-70 hover:opacity-100 transition-opacity shrink-0 whitespace-nowrap"
                  >
                    View Profile
                  </button>
                </div>
              </div>

              {/* ── Mobile Card (< md) ── */}
              <div className="md:hidden flex items-center gap-[12px] py-[12px]">
                <div className="w-[44px] h-[44px] rounded-full overflow-hidden shrink-0 bg-[#D9D9D9]">
                  <Image
                    src={moderator.avatar}
                    alt={moderator.name}
                    width={44}
                    height={44}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#000000] text-[13px] font-semibold leading-[100%] truncate">{moderator.name}</p>
                  <p className="text-[#000000] text-[11px] font-normal leading-[100%] opacity-60 mt-[3px]">{moderator.username}</p>
                  <p className="text-[#5E5E5E] text-[11px] font-normal leading-[100%] mt-[2px]">{moderator.employeeId} · {moderator.registeredDate}</p>
                </div>
                <div className="flex items-center gap-[8px] shrink-0">
                  <button
                    onClick={() => handleToggleStatus(moderator.id)}
                    className={`relative w-[26px] h-[15px] rounded-full transition-colors shrink-0 ${moderator.active ? "bg-[#0F792F]" : "bg-[#CCCCCC]"}`}
                  >
                    <span
                      className={`absolute top-[1.5px] w-[12px] h-[12px] rounded-full bg-white transition-transform ${moderator.active ? "left-[12px]" : "left-[2px]"}`}
                    />
                  </button>
                  <button
                    onClick={() => handleViewProfile(moderator.id)}
                    className="h-[26px] px-[10px] bg-[#D9D9D9] rounded-[10px] text-[#000000] text-[11px] font-semibold opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
                  >
                    Profile
                  </button>
                </div>
              </div>

              {/* Row Divider */}
              <div className="border-t border-[#E0E0E0]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
