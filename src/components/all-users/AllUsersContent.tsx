"use client";

import { useState } from "react";

interface User {
  id: string;
  name: string;
  username: string;
  employeeId: string;
  registeredDate: string;
  role: "Seller" | "Moderator" | "Visitor";
  status: "Active" | "Blocked";
}

const mockUsers: User[] = [
  { id: "1", name: "Kasun Sampath", username: "kasuns", employeeId: "MAS 0236", registeredDate: "Today", role: "Seller", status: "Active" },
  { id: "2", name: "Visal Lakshitha", username: "lakshithavisal", employeeId: "MAS 0356", registeredDate: "Yesterday", role: "Seller", status: "Active" },
  { id: "3", name: "Dulaj samaraweera", username: "dulajj98", employeeId: "MAS 0120", registeredDate: "Feb 04, 2026", role: "Moderator", status: "Active" },
  { id: "4", name: "Avishka Sandeepa", username: "avishka49", employeeId: "-", registeredDate: "Feb 04, 2026", role: "Visitor", status: "Active" },
  { id: "5", name: "Sameera Viraj", username: "sameera", employeeId: "-", registeredDate: "Feb 04, 2026", role: "Visitor", status: "Active" },
  { id: "6", name: "Anura Dissanayaka", username: "anuraj", employeeId: "MAS 0120", registeredDate: "Feb 04, 2026", role: "Seller", status: "Active" },
];

type TabType = "All Users" | "Moderators" | "Sellers" | "Visitors";

export default function AllUsersContent() {
  const [activeTab, setActiveTab] = useState<TabType>("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [users] = useState<User[]>(mockUsers);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const tabs: TabType[] = ["All Users", "Moderators", "Sellers", "Visitors"];

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleContainerClick = () => {
    if (openDropdown) setOpenDropdown(null);
  };

  const filteredUsers = users.filter((user) => {
    const matchesTab =
      activeTab === "All Users" ||
      (activeTab === "Moderators" && user.role === "Moderator") ||
      (activeTab === "Sellers" && user.role === "Seller") ||
      (activeTab === "Visitors" && user.role === "Visitor");

    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div
      className="py-4 md:pt-[28px] md:pb-[28px] px-4 md:pl-[28px] md:pr-4 flex flex-col"
      onClick={handleContainerClick}
    >
      {/* Title */}
      <div>
        <h1
          className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          All Users
        </h1>
        <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />
      </div>

      <div className="mt-[20px] md:mt-[24px] flex flex-col">
        {/* Search and Export Row */}
        <div className="flex items-center gap-[10px] md:gap-0 md:justify-between">
          <div className="flex-1 md:w-[493px] md:flex-none h-[40px] md:h-[44px] border border-[#D2D2D2] rounded-[8px] flex items-center px-[12px] md:px-[16px] gap-[10px] md:gap-[12px] bg-white">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#5E5E5E" fillOpacity="0.7" />
            </svg>
            <input
              type="text"
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-[14px] md:text-[15px] font-normal leading-[100%] text-[#000000] placeholder:text-[#5E5E5E]/70"
            />
          </div>
          <button className="bg-[#1174BB] hover:bg-[#0E63A0] transition-colors text-white h-[40px] md:h-[44px] px-[20px] md:px-[42px] rounded-[8px] text-[13px] md:text-[15px] font-normal shrink-0">
            Export
          </button>
        </div>

        {/* Tabs — scrollable on mobile */}
        <div className="flex items-center gap-[20px] md:gap-[42px] mt-[24px] md:mt-[32px] border-b border-[#E0E0E0]/60 -mx-[16px] md:-mx-[28px] px-[16px] md:px-[28px] overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-[12px] md:pb-[14px] text-[13px] md:text-[15px] font-medium leading-[100%] transition-colors relative whitespace-nowrap shrink-0 ${activeTab === tab ? "text-[#1174BB]" : "text-[#5E5E5E]"}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1174BB]" />
              )}
            </button>
          ))}
        </div>

        {/* Table Container — scrollable on mobile */}
        <div className="mt-[20px] md:mt-[24px] flex-1 overflow-x-auto">
          <div className="min-w-[600px] md:min-w-[900px]">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1fr] bg-[#1174BB] h-[47px] items-center">
              {["Name", "Employee ID", "Registered", "User Role", "Actions"].map((h, i) => (
                <div
                  key={h}
                  className={`${i === 0 ? "px-[16px] md:px-[24px]" : "px-[12px] md:px-[16px]"} text-white text-[13px] md:text-[17px] font-normal leading-[100%] tracking-normal`}
                  style={{ fontFamily: "Eurostile, sans-serif" }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="flex flex-col gap-[8px] md:gap-[12px] mt-[8px] md:mt-[12px]">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-[#F4F4F4] rounded-[8px] grid grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1fr] items-center h-[52px] md:h-[57px]"
                >
                  <div className="px-[12px] md:px-[24px] flex items-center gap-[8px] md:gap-[14px]">
                    <div className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full overflow-hidden shrink-0 bg-[#D9D9D9]" />
                    <div className="flex flex-col gap-[3px] md:gap-[4px] min-w-0">
                      <span className="text-[#000000] text-[12px] md:text-[15px] font-medium leading-[100%] truncate">{user.name}</span>
                      <span className="text-[#5E5E5E] text-[10px] md:text-[13px] font-normal leading-[100%] truncate">@{user.username}</span>
                    </div>
                  </div>

                  <div className="px-[12px] md:px-[16px] text-[#000000] text-[11px] md:text-[14.5px] font-normal leading-[100%]">{user.employeeId}</div>
                  <div className="px-[12px] md:px-[16px] text-[#5E5E5E] text-[11px] md:text-[14.5px] font-normal leading-[100%] truncate">{user.registeredDate}</div>
                  <div className="px-[12px] md:px-[16px]">
                    <span className="inline-flex items-center justify-center bg-[#1174BB] text-white h-[22px] md:h-[26px] px-[10px] md:px-[16px] rounded-[11px] md:rounded-[13px] text-[10px] md:text-[13px] font-medium leading-[100%]">
                      {user.role}
                    </span>
                  </div>
                  <div className="px-[12px] md:px-[16px] relative flex items-center">
                    <button
                      onClick={(e) => toggleDropdown(user.id, e)}
                      className="h-[28px] md:h-[32px] px-[10px] md:px-[14px] border border-[#5E5E5E] bg-white rounded-[14px] md:rounded-[16px] flex items-center justify-between gap-[6px] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <span className="text-[#222222] text-[11px] md:text-[13px] font-medium leading-[100%] whitespace-nowrap">View</span>
                      <svg
                        width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 ${openDropdown === user.id ? "rotate-180" : ""}`}
                      >
                        <path d="M1 1L5 5L9 1" stroke="#5E5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === user.id && (
                      <div className="absolute right-auto left-[12px] md:left-[16px] top-[100%] mt-[6px] w-[120px] md:w-[130px] bg-white border border-[#E0E0E0] rounded-[8px] shadow-sm z-50 flex flex-col p-[4px]">
                        <button className="flex items-center gap-[10px] w-full px-[12px] h-[34px] bg-[#1174BB] text-white rounded-[4px]">
                          <div className="w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center shrink-0">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 6.5L4.5 8.5L9.5 3.5" stroke="#1174BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-[13px] font-medium">Active</span>
                        </button>
                        <button className="flex items-center gap-[10px] w-full px-[12px] h-[34px] hover:bg-[#F5F5F5] text-[#222222] rounded-[4px] transition-colors mt-[2px]">
                          <div className="w-[14px] h-[14px] bg-[#D32F2F] rounded-full flex items-center justify-center shrink-0">
                            <svg width="6" height="6" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-[13px] font-medium">Block</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="py-[32px] text-center text-[#5E5E5E] text-[14px] md:text-[15px]">
                  No users found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-[20px] md:mt-[24px] flex flex-wrap items-center justify-between gap-[8px] mb-12">
          <div className="text-[#5E5E5E] text-[12px] md:text-[14.5px] font-normal">
            Showing 1 to {Math.min(filteredUsers.length, 6)} of {filteredUsers.length} entries
          </div>
          <div className="flex items-center gap-[6px] md:gap-[8px]">
            <button className="h-[30px] md:h-[32px] px-[12px] md:px-[16px] bg-[#EBEBEB] text-[#101010] text-[12px] md:text-[14px] font-normal leading-[100%] rounded-[6px] hover:bg-[#D4D4D4] transition-colors">
              Previous
            </button>
            {[
              { d: "M7 13L1 7L7 1", dir: "prev" },
              { d: "M1 1L7 7L1 13", dir: "next" },
            ].map(({ d, dir }) => (
              <button key={dir} className="w-[30px] h-[30px] md:w-[32px] md:h-[32px] border border-[#D2D2D2] bg-white flex items-center justify-center rounded-[6px] hover:bg-[#F5F5F5] transition-colors text-[#5E5E5E]">
                <svg width="7" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={d} stroke="#5E5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <button className="h-[30px] md:h-[32px] px-[12px] md:px-[16px] bg-[#EBEBEB] text-[#101010] text-[12px] md:text-[14px] font-normal leading-[100%] rounded-[6px] hover:bg-[#D4D4D4] transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
