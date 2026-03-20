"use client";

import { useAuth } from "@/hooks";
import { useState } from "react";

export default function SettingsContent() {
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const [name, setName] = useState("Ishan Nayanajith");
  const [contactNumber, setContactNumber] = useState("0712414095");
  const [contactEmail, setContactEmail] = useState("kwinayanajith@gmail.com");

  const [adApprovalMode, setAdApprovalMode] = useState("manual");
  const [defaultAdStatus, setDefaultAdStatus] = useState("Pending");
  const [allowEditPublish, setAllowEditPublish] = useState(true);

  const [userApprovalMode, setUserApprovalMode] = useState("allow");

  const [notifAdSubmitted, setNotifAdSubmitted] = useState(true);
  const [notifMessageSeller, setNotifMessageSeller] = useState(true);
  const [notifReportReceived, setNotifReportReceived] = useState(true);
  const [notifSellerRegistration, setNotifSellerRegistration] = useState(true);
  const [notifModeratorActivity, setNotifModeratorActivity] = useState(true);
  const [notifSystemAlerts, setNotifSystemAlerts] = useState(true);

  const [showAlertsDashboard, setShowAlertsDashboard] = useState(true);
  const [playSounds, setPlaySounds] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [language, setLanguage] = useState("English");
  const [timeZone, setTimeZone] = useState("Sri Lanka (GMT +5.30)");
  const [maintainsMode, setMaintainsMode] = useState(false);

  const Toggle = ({ active, onChange }: { active: boolean; onChange: () => void }) => (
    <div
      onClick={onChange}
      className={`w-[34px] h-[20px] rounded-[10px] flex items-center p-[2.5px] cursor-pointer transition-colors shrink-0 ${active ? "bg-[#4CAF50] justify-end" : "bg-[#D2D2D2] justify-start"}`}
    >
      <div className="w-[15px] h-[15px] bg-white rounded-full shadow-sm" />
    </div>
  );

  const RadioIcon = ({ active }: { active: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="9" cy="9" r="8.5" fill="white" stroke={active ? "#4CAF50" : "#D2D2D2"} />
      {active && <circle cx="9" cy="9" r="5" fill="#4CAF50" />}
    </svg>
  );

  return (
    <div className="py-4 md:pt-[28px] md:pb-[28px] px-4 md:pl-[28px] md:pr-4">
      {/* Title */}
      <div>
        <h1
          className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Settings
        </h1>
        <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />
      </div>

      <div className="mt-[20px] md:mt-[24px] max-w-[1000px] flex flex-col">
        {/* Search */}
        <div className="w-full md:w-[493px] h-[40px] md:h-[44px] border border-[#D2D2D2] rounded-[8px] flex items-center px-[12px] md:px-[16px] gap-[10px] md:gap-[12px] bg-white mb-[24px] md:mb-[32px]">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#5E5E5E" fillOpacity="0.7" />
          </svg>
          <input
            type="text"
            placeholder="Search Setting"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-[14px] md:text-[15px] font-normal text-[#000000] placeholder:text-[#5E5E5E]/70"
          />
        </div>

        {/* General Setting */}
        <h2
          className="text-[#5E5E5E] text-[16px] md:text-[18px] font-normal mb-[12px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          General Setting
        </h2>
        <div className="border-t border-[#E0E0E0]/60 mb-[20px] md:mb-[24px]" />

        <div className="flex flex-col gap-[14px] md:gap-[16px] mb-[32px] md:mb-[40px]">
          {[
            { label: "Name", value: name, set: setName, type: "text" },
            { label: "Contact Number", value: contactNumber, set: setContactNumber, type: "text" },
            { label: "Contact Email", value: contactEmail, set: setContactEmail, type: "email" },
          ].map(({ label, value, set, type }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-[6px] sm:gap-0">
              <label className="sm:w-[160px] md:w-[180px] text-[#5E5E5E] text-[13px] md:text-[15px] font-medium shrink-0">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full sm:w-[300px] md:w-[380px] h-[38px] md:h-[40px] px-[12px] border border-[#D2D2D2] rounded-[6px] outline-none text-[#5E5E5E] text-[13px] md:text-[15px]"
              />
            </div>
          ))}
        </div>

        {/* Two Columns Layout — stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[60px] mb-[32px] md:mb-[40px]">
          {/* Left Column (Management Settings) */}
          <div>
            <h2
              className="text-[#5E5E5E] text-[16px] md:text-[18px] font-normal mb-[12px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              {role === "admin" ? "User Management Settings" : "Ad Management Settings"}
            </h2>
            <div className="border-t border-[#E0E0E0]/60 mb-[20px] md:mb-[24px]" />

            {role === "admin" ? (
              <div className="flex flex-col gap-[16px] md:gap-[20px]">
                <div>
                  <div className="text-[#A0A0A0] text-[12px] md:text-[13px] mb-[12px]">Ad Approval Mode</div>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      { val: "require", label: "Require approval before activation" },
                      { val: "allow", label: "Allow new seller registrations" },
                    ].map(({ val, label }) => (
                      <label key={val} className="flex items-center gap-[10px] cursor-pointer">
                        <div onClick={() => setUserApprovalMode(val)}>
                          <RadioIcon active={userApprovalMode === val} />
                        </div>
                        <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] md:gap-[12px] mt-[4px] md:mt-[8px]">
                  {["Manage Moderators", "Manage Seller Status"].map((btn) => (
                    <button key={btn} className="w-full sm:w-[220px] h-[36px] md:h-[38px] bg-[#1174BB] text-white text-[13px] md:text-[14.5px] rounded-[6px] hover:bg-[#0E63A0] transition-colors font-medium">
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[16px] md:gap-[20px]">
                <div>
                  <div className="text-[#A0A0A0] text-[13px] md:text-[14px] font-medium mb-[12px]">Ad Approval Mode</div>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      { val: "manual", label: "Manual Approval (admin must review)" },
                      { val: "auto", label: "Auto Publish (Ads go live instantly)" },
                    ].map(({ val, label }) => (
                      <label key={val} className="flex items-center gap-[10px] cursor-pointer">
                        <div onClick={() => setAdApprovalMode(val)}>
                          <RadioIcon active={adApprovalMode === val} />
                        </div>
                        <span className="text-[#5E5E5E] text-[13px] md:text-[15px]">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-[14px] md:gap-[16px] mt-[4px] md:mt-[8px]">
                  <div className="flex items-center justify-between gap-[12px]">
                    <span className="text-[#5E5E5E] text-[13px] md:text-[15.5px] font-medium">Default Ad Status</span>
                    <div className="relative">
                      <select
                        value={defaultAdStatus}
                        onChange={(e) => setDefaultAdStatus(e.target.value)}
                        className="w-[100px] md:w-[110px] h-[34px] md:h-[36px] border border-[#D2D2D2] rounded-[6px] px-[10px] md:px-[12px] text-[#5E5E5E] text-[13px] md:text-[14.5px] outline-none appearance-none bg-white cursor-pointer font-medium"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                      </select>
                      <div className="absolute right-[10px] top-[14px] pointer-events-none">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="#5E5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-[12px]">
                    <div className="flex items-center gap-[10px] cursor-pointer" onClick={() => setAllowEditPublish(!allowEditPublish)}>
                      <RadioIcon active={allowEditPublish} />
                      <span className="text-[#5E5E5E] text-[13px] md:text-[15px]">Allow Edit After Publish</span>
                    </div>
                    <Toggle active={allowEditPublish} onChange={() => setAllowEditPublish(!allowEditPublish)} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Notification Settings) */}
          <div>
            <h2
              className="text-[#5E5E5E] text-[16px] md:text-[18px] font-normal mb-[12px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Notification Settings
            </h2>
            <div className="border-t border-[#E0E0E0]/60 mb-[20px] md:mb-[24px]" />

            <div className="flex flex-col gap-[10px] md:gap-[12px] mb-[20px] md:mb-[24px]">
              {role === "admin" ? (
                <>
                  {[
                    { val: notifSellerRegistration, set: setNotifSellerRegistration, label: "New seller registration" },
                    { val: notifModeratorActivity, set: setNotifModeratorActivity, label: "Moderator activity reports" },
                    { val: notifSystemAlerts, set: setNotifSystemAlerts, label: "System alerts" },
                  ].map(({ val, set, label }) => (
                    <label key={label} className="flex items-center gap-[10px] cursor-pointer">
                      <div onClick={() => set(!val)}>
                        <RadioIcon active={val} />
                      </div>
                      <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">{label}</span>
                    </label>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { val: notifAdSubmitted, set: setNotifAdSubmitted, label: "New ad submitted" },
                    { val: notifMessageSeller, set: setNotifMessageSeller, label: "New message from seller" },
                    { val: notifReportReceived, set: setNotifReportReceived, label: "New report received" },
                  ].map(({ val, set, label }) => (
                    <label key={label} className="flex items-center gap-[10px] cursor-pointer">
                      <div onClick={() => set(!val)}>
                        <RadioIcon active={val} />
                      </div>
                      <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">{label}</span>
                    </label>
                  ))}
                </>
              )}
            </div>

            <div className="flex flex-col gap-[16px] md:gap-[20px] mb-[24px] md:mb-[28px]">
              <div className="flex items-center justify-between gap-[12px]">
                <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">Show Alerts on dashboard</span>
                <Toggle active={showAlertsDashboard} onChange={() => setShowAlertsDashboard(!showAlertsDashboard)} />
              </div>
              {role === "admin" ? (
                <div className="flex items-center justify-between gap-[12px]">
                  <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">Email notifications</span>
                  <Toggle active={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-[12px]">
                  <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">Play Sound for new messages</span>
                  <Toggle active={playSounds} onChange={() => setPlaySounds(!playSounds)} />
                </div>
              )}
            </div>

            <button className="w-full h-[38px] md:h-[40px] bg-[#1174BB] text-white text-[13px] md:text-[14.5px] font-medium rounded-[6px] hover:bg-[#0E63A0] transition-colors">
              Save Notification Settings
            </button>
          </div>
        </div>

        {/* System Setting */}
        <h2
          className="text-[#5E5E5E] text-[16px] md:text-[18px] font-normal mb-[12px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          System Setting
        </h2>
        <div className="border-t border-[#E0E0E0]/60 mb-[20px] md:mb-[24px]" />

        <div className="flex flex-col gap-[16px] md:gap-[20px] mb-[32px] md:mb-[40px] w-full md:w-[380px]">
          {/* Language */}
          <div className="flex items-center justify-between gap-[12px]">
            <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">Language</span>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-[150px] md:w-[180px] h-[34px] md:h-[36px] border border-[#D2D2D2] rounded-[6px] px-[10px] md:px-[12px] text-[#5E5E5E] text-[13px] md:text-[14px] outline-none appearance-none bg-white cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
              </select>
              <div className="absolute right-[10px] top-[14px] pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="#5E5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Time Zone */}
          <div className="flex items-center justify-between gap-[12px]">
            <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">Time Zone</span>
            <div className="relative">
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-[160px] md:w-[210px] h-[34px] md:h-[36px] border border-[#D2D2D2] rounded-[6px] px-[10px] md:px-[12px] text-[#5E5E5E] text-[12px] md:text-[14px] outline-none appearance-none bg-white cursor-pointer"
              >
                <option value="Sri Lanka (GMT +5.30)">Sri Lanka (GMT +5.30)</option>
                <option value="UTC">UTC</option>
              </select>
              <div className="absolute right-[10px] top-[14px] pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="#5E5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Maintains Mode */}
          <div className="flex items-center justify-between gap-[12px]">
            <span className="text-[#5E5E5E] text-[13px] md:text-[14.5px]">Maintains Mode</span>
            <Toggle active={maintainsMode} onChange={() => setMaintainsMode(!maintainsMode)} />
          </div>
        </div>
      </div>
    </div>
  );
}
