"use client";

import { useState } from "react";
import Image from "next/image";

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

  const handleAddModerator = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      fullName: "",
      email: "",
      employeeId: "",
      role: "Content Moderator",
      tempPassword: "",
    });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCreatedData({ name: "", role: "" });
  };

  const handleCreateAccount = () => {
    // TODO: API call to create moderator
    console.log("Create moderator:", formData);
    setCreatedData({ name: formData.fullName, role: formData.role });
    setShowForm(false);
    setShowSuccess(true);
    setFormData({
      fullName: "",
      email: "",
      employeeId: "",
      role: "Content Moderator",
      tempPassword: "",
    });
  };

  const handleViewProfile = (moderatorId: string) => {
    // TODO: Navigate to moderator profile
    console.log(`View profile for moderator ${moderatorId}`);
  };

  return (
    <div className="py-[28px] pl-[28px]">
      {/* Create Moderator Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleCloseForm}
        >
          <div
            className="bg-white rounded-[16px] w-[460px] p-[32px] shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseForm}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#E0E0E0] flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L11 11M11 1L1 11"
                  stroke="#555555"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <h2
              className="text-[#2D2D2D] text-[22px] font-normal leading-[100%] tracking-normal mb-[28px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Create Moderator Form
            </h2>

            <div className="flex flex-col gap-[20px]">
              {/* Full Name */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  className="h-[44px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal placeholder:text-[#A0A0A0] outline-none focus:border-[#1174BB] transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="h-[44px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal placeholder:text-[#A0A0A0] outline-none focus:border-[#1174BB] transition-colors"
                />
              </div>

              {/* Employee ID */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                  Employee ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                    }))
                  }
                  className="h-[44px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal placeholder:text-[#A0A0A0] outline-none focus:border-[#1174BB] transition-colors"
                />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="h-[44px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors bg-white appearance-none"
                >
                  <option value="Content Moderator">Content Moderator</option>
                  <option value="Senior Moderator">Senior Moderator</option>
                </select>
              </div>

              {/* Temp Password */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                  Temp Password
                </label>
                <input
                  type="text"
                  placeholder="TempPass@2026"
                  value={formData.tempPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tempPassword: e.target.value,
                    }))
                  }
                  className="h-[44px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal placeholder:text-[#A0A0A0] outline-none focus:border-[#1174BB] transition-colors"
                />
              </div>
            </div>

            {/* Create Account Button */}
            <button
              onClick={handleCreateAccount}
              className="w-full h-[48px] mt-[28px] bg-[#1174BB] rounded-[8px] text-white text-[16px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleCloseSuccess}
        >
          <div
            className="bg-white rounded-[16px] w-[460px] px-[32px] pt-[16px] pb-[32px] shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseSuccess}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#E0E0E0] flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L11 11M11 1L1 11"
                  stroke="#555555"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Green Checkmark */}
            <div className="flex justify-center mt-[24px]">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60" cy="60" r="56" fill="#2E9E2E" />
                <path
                  d="M34 62L52 80L86 42"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Created Text */}
            <h2
              className="text-center text-[#2D2D2D] text-[28px] font-normal leading-[100%] tracking-normal mt-[20px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Created!
            </h2>
            <p className="text-center text-[#555555] text-[14px] font-normal leading-[100%] tracking-normal mt-[10px]">
              Credentials sent via email
            </p>

            {/* Details Card */}
            <div className="mt-[24px] mx-[8px] border border-[#C8D9EA] bg-[#F5F8FB] rounded-[12px] px-[24px] py-[18px] flex flex-col gap-[16px]">
              <div className="flex items-center justify-between">
                <span className="text-[#555555] text-[14px] font-normal leading-[100%] tracking-normal">
                  Name:
                </span>
                <span className="text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal">
                  {createdData.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555555] text-[14px] font-normal leading-[100%] tracking-normal">
                  Role:
                </span>
                <span className="text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                  Moderator
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555555] text-[14px] font-normal leading-[100%] tracking-normal">
                  Status:
                </span>
                <span className="text-[#0F792F] text-[14px] font-normal leading-[100%] tracking-normal">
                  Active
                </span>
              </div>
            </div>

            {/* Warning Text */}
            <p className="text-center text-[#E3800F] text-[14px] font-normal leading-[100%] tracking-normal mt-[24px]">
              Must change password on first login
            </p>
          </div>
        </div>
      )}

      {/* Title Row */}
      <div className="flex items-center justify-between pr-[4px]">
        <h1
          className="text-[#5E5E5E] text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Moderators
        </h1>
        <button
          onClick={handleAddModerator}
          className="flex items-center gap-[8px] h-[40px] px-[20px] bg-[#1174BB] rounded-[8px] text-white text-[14px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="9" r="9" fill="white" />
            <path
              d="M9 5V13M5 9H13"
              stroke="#1174BB"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Moderator
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      {/* Table */}
      <div className="mt-[20px]">
        {/* Table Header */}
        <div className="grid grid-cols-[1.6fr_1fr_1.2fr_1.2fr] bg-[#1174BB] h-[47px] items-center">
          <div
            className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Name
          </div>
          <div
            className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Employee ID
          </div>
          <div
            className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Registered Date
          </div>
          <div
            className="px-[16px] text-white text-[17px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            Status
          </div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {moderatorList.map((moderator) => (
            <div key={moderator.id}>
              <div className="grid grid-cols-[1.6fr_1fr_1.2fr_1.2fr] items-center h-[72px]">
                {/* Name with Avatar */}
                <div className="px-[16px] flex items-center gap-[12px]">
                  <div className="w-[54px] h-[54px] rounded-full overflow-hidden shrink-0 bg-[#D9D9D9]">
                    <Image
                      src={moderator.avatar}
                      alt={moderator.name}
                      width={54}
                      height={54}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                      {moderator.name}
                    </span>
                    <span className="text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal opacity-60">
                      {moderator.username}
                    </span>
                  </div>
                </div>

                {/* Employee ID */}
                <div className="px-[16px] text-[#000000] text-[16px] font-normal leading-[100%] tracking-normal opacity-80">
                  {moderator.employeeId}
                </div>

                {/* Registered Date */}
                <div className="px-[16px] text-[#000000] text-[16px] font-normal leading-[100%] tracking-normal opacity-80">
                  {moderator.registeredDate}
                </div>

                {/* Status + View Profile */}
                <div className="px-[16px] flex items-center gap-[16px]">
                  <button
                    onClick={() => handleToggleStatus(moderator.id)}
                    className={`relative w-[28px] h-[16px] rounded-full transition-colors shrink-0 ${
                      moderator.active ? "bg-[#0F792F]" : "bg-[#CCCCCC]"
                    }`}
                  >
                    <span
                      className={`absolute top-[2px] w-[12px] h-[12px] rounded-full bg-white transition-transform ${
                        moderator.active ? "left-[14px]" : "left-[2px]"
                      }`}
                    />
                  </button>
                  <span className="text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal min-w-[42px]">
                    {moderator.active ? "Active" : "Block"}
                  </span>
                  <button
                    onClick={() => handleViewProfile(moderator.id)}
                    className="w-[94px] h-[25px] bg-[#D9D9D9] rounded-[10px] text-[#000000] text-[12px] font-semibold leading-[150%] tracking-normal opacity-70 hover:opacity-100 transition-opacity shrink-0"
                  >
                    View Profile
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
