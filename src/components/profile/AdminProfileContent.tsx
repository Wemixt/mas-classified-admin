"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks";

type ProfileFormState = {
  adminName: string;
  firstName: string;
  secondName: string;
  email: string;
  phone: string;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function AdminProfileContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8">Loading profile...</div>;
  }

  const initialProfile = useMemo<ProfileFormState>(
    () => ({
      adminName: user?.fullName || "",
      firstName: (user?.fullName || "").split(" ").filter(Boolean)[0] || "",
      secondName:
        (user?.fullName || "").split(" ").filter(Boolean).slice(1).join(" ") || "",
      email: user?.email || "",
      phone: user?.phoneNo || "",
    }),
    [user]
  );

  const [profile, setProfile] = useState<ProfileFormState>(initialProfile);
  const [passwords, setPasswords] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  return (
    <div className="py-4 md:py-[28px] px-4 md:pl-[28px] md:pr-[8px]">
      {/* Page Header */}
      <h1
        className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Admin Profile
      </h1>

      <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />

      <p
        className="text-[#333333] text-[12px] md:text-[14px] font-normal leading-[100%] tracking-normal opacity-60 mt-[10px]"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        Manage your account information and personal settings
      </p>

      <div className="mt-[22px] max-w-[1020px] flex flex-col gap-[18px]">
        {/* Profile card */}
        <section className="bg-white border border-[#E0E0E0] rounded-[10px] p-4 md:p-[28px]">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-[28px]">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[126px] md:h-[126px] rounded-full overflow-hidden bg-[#E9E9E9]">
                <Image
                  src={user?.avatar || "/logos/mass logo.png"}
                  alt="Admin profile photo"
                  width={126}
                  height={126}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Admin Name + photo actions */}
            <div className="flex-1 min-w-0 w-full">
              <label className="block text-[#000000] text-[14px] font-semibold leading-[100%] tracking-normal">
                Admin Name
              </label>
              <input
                type="text"
                value={profile.adminName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, adminName: e.target.value }))
                }
                className="mt-[10px] w-full h-[44px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />

              <div className="mt-[12px] flex flex-wrap items-center gap-[10px]">
                <button
                  type="button"
                  className="flex items-center gap-[8px] h-[34px] px-[14px] bg-[#1174BB] rounded-[8px] text-white text-[13px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 7L11 5H13L15 7H18C19.1 7 20 7.9 20 9V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V9C4 7.9 4.9 7 6 7H9Z"
                      fill="white"
                      opacity="0.9"
                    />
                    <path
                      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                      stroke="#1174BB"
                      strokeWidth="2"
                      fill="white"
                    />
                  </svg>
                  Change Photo
                </button>
                <button
                  type="button"
                  className="flex items-center gap-[8px] h-[34px] px-[14px] bg-[#E9E9E9] rounded-[8px] text-[#5E5E5E] text-[13px] font-semibold leading-[100%] tracking-normal hover:bg-[#DFDFDF] transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 21C6.45 21 5.98 20.8 5.59 20.41C5.2 20.02 5 19.55 5 19V7H4V5H9V4H15V5H20V7H19V19C19 19.55 18.8 20.02 18.41 20.41C18.02 20.8 17.55 21 17 21H7ZM17 7H7V19H17V7ZM9 17H11V9H9V17ZM13 17H15V9H13V17Z"
                      fill="#5E5E5E"
                    />
                  </svg>
                  Remove Photo
                </button>
              </div>
            </div>
          </div>

          {/* Form fields grid */}
          <div className="mt-[22px] grid grid-cols-1 md:grid-cols-2 gap-x-[28px] gap-y-[14px]">
            {/* First Name */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#000000] text-[13px] font-semibold leading-[100%] tracking-normal">
                First Name
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, firstName: e.target.value }))
                }
                className="w-full h-[42px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />
            </div>

            {/* Second Name */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#000000] text-[13px] font-semibold leading-[100%] tracking-normal">
                Second Name
              </label>
              <input
                type="text"
                value={profile.secondName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, secondName: e.target.value }))
                }
                className="w-full h-[42px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#000000] text-[13px] font-semibold leading-[100%] tracking-normal">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full h-[42px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#000000] text-[13px] font-semibold leading-[100%] tracking-normal">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, phone: e.target.value }))
                }
                className="w-full h-[42px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />
            </div>
          </div>

          {/* Save button */}
          <div className="mt-[20px] flex justify-end">
            <button
              type="button"
              className="h-[40px] px-[24px] bg-[#1174BB] rounded-[8px] text-white text-[13px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </section>

        {/* General Setting */}
        <section className="bg-white border border-[#E0E0E0] rounded-[10px] p-4 md:p-[28px]">
          <h2
            className="text-[#5E5E5E] text-[16px] md:text-[18px] font-normal leading-[100%] tracking-normal"
            style={{ fontFamily: "Eurostile, sans-serif" }}
          >
            General Setting
          </h2>
          <div className="border-t border-[#5E5E5E] opacity-40 mt-[14px]" />

          <div className="mt-[18px] max-w-[640px] flex flex-col gap-[14px]">
            {/* Current Password */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#5E5E5E] text-[13px] font-normal leading-[100%] tracking-normal">
                Current Password
              </label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((p) => ({
                    ...p,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full h-[42px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#5E5E5E] text-[13px] font-normal leading-[100%] tracking-normal">
                New Password
              </label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, newPassword: e.target.value }))
                }
                className="w-full h-[42px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#5E5E5E] text-[13px] font-normal leading-[100%] tracking-normal">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwords.confirmNewPassword}
                onChange={(e) =>
                  setPasswords((p) => ({
                    ...p,
                    confirmNewPassword: e.target.value,
                  }))
                }
                className="w-full h-[42px] px-[16px] border border-[#D0D0D0] rounded-[8px] text-[#000000] text-[14px] font-normal leading-[100%] tracking-normal outline-none focus:border-[#1174BB] transition-colors"
              />
            </div>
          </div>

          {/* Update Password button */}
          <div className="mt-[20px] flex justify-end max-w-[640px]">
            <button
              type="button"
              className="h-[40px] px-[24px] bg-[#1174BB] rounded-[8px] text-white text-[13px] font-semibold leading-[100%] tracking-normal hover:bg-[#0E63A0] transition-colors"
            >
              Update Password
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
