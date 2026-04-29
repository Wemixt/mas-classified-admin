"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { userService as adminUserService } from "@/services/admin/user.service";

interface User {
  id: string;
  uuid: string;
  name: string;
  username: string;
  employeeId: string;
  registeredDate: string;
  role: string;
  status: "Active" | "Blocked";
  avatar: string;
}


type TabType = "All Users" | "Moderators" | "Sellers" | "Visitors";

export default function AllUsersContent() {
  const [activeTab, setActiveTab] = useState<TabType>("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let roleParam: any = undefined;
      if (activeTab === "Moderators") roleParam = "MODERATOR";
      else if (activeTab === "Sellers") roleParam = "USER";
      else if (activeTab === "Visitors") roleParam = "GUEST";

      const response = await adminUserService.getAdminUsers(roleParam);
      if (response.success && response.data) {
        const mappedUsers: User[] = response.data.data.map((u: any) => ({
          id: u.id,
          uuid: u.uuid,
          name: u.fullName || "Unknown",
          username: u.email?.split("@")[0] || "unknown",
          employeeId: u.employeeId || "N/A",
          registeredDate: new Date(u.createdAt).toLocaleDateString(),
          role: u.role === "MODERATOR" ? "Moderator" : u.role === "USER" ? "Seller" : "Visitor",
          status: u.status === "ACTIVE" ? "Active" : "Blocked",
          avatar: u.profileImage || "/logos/mass logo.png",
        }));
        setUserList(mappedUsers);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const tabs: TabType[] = ["All Users", "Moderators", "Sellers", "Visitors"];

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleContainerClick = () => {
    if (openDropdown) setOpenDropdown(null);
  };

  const handleUpdateStatus = async (userId: string, newStatus: "ACTIVE" | "SUSPENDED") => {
    try {
      await adminUserService.updateUserStatus(userId, newStatus);
      // Update local state
      setUserList((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, status: newStatus === "ACTIVE" ? "Active" : "Blocked" }
            : user
        )
      );
      setOpenDropdown(null);
    } catch (err) {
      console.error("Failed to update user status", err);
      alert("Failed to update user status");
    }
  };

  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
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
              {loading ? (
                <div className="py-[32px] text-center text-[#5E5E5E]">Loading users...</div>
              ) : error ? (
                <div className="py-[32px] text-center text-red-500">{error}</div>
              ) : filteredUsers.length === 0 ? (
                <div className="py-[32px] text-center text-[#5E5E5E]">No users found.</div>
              ) : (
                filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="bg-[#F4F4F4] rounded-[8px] grid grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1fr] items-center h-[52px] md:h-[57px] cursor-pointer hover:bg-[#EBEBEB] transition-colors"
                >
                  <div className="px-[12px] md:px-[24px] flex items-center gap-[8px] md:gap-[14px]">
                    <div className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full overflow-hidden shrink-0 bg-[#D9D9D9]">
                      {user.avatar && (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={42}
                          height={42}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
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
                      <div className="absolute right-auto left-[12px] md:left-[16px] top-[100%] mt-[6px] w-[120px] md:w-[130px] bg-white border border-[#E0E0E0] rounded-[8px] shadow-sm z-50 flex flex-col p-[4px]" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleUpdateStatus(user.id, "ACTIVE")}
                          className={`flex items-center gap-[10px] w-full px-[12px] h-[34px] rounded-[4px] transition-colors ${user.status === "Active" ? "bg-[#1174BB] text-white" : "hover:bg-[#F5F5F5] text-[#222222]"}`}
                        >
                          <div className={`w-[14px] h-[14px] rounded-full flex items-center justify-center shrink-0 ${user.status === "Active" ? "bg-white" : "bg-[#0F792F]"}`}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 6.5L4.5 8.5L9.5 3.5" stroke={user.status === "Active" ? "#1174BB" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-[13px] font-medium">Active</span>
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(user.id, "SUSPENDED")}
                          className={`flex items-center gap-[10px] w-full px-[12px] h-[34px] rounded-[4px] transition-colors mt-[2px] ${user.status === "Blocked" ? "bg-[#D32F2F] text-white" : "hover:bg-[#F5F5F5] text-[#222222]"}`}
                        >
                          <div className={`w-[14px] h-[14px] rounded-full flex items-center justify-center shrink-0 ${user.status === "Blocked" ? "bg-white" : "bg-[#D32F2F]"}`}>
                            <svg width="6" height="6" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L9 9M9 1L1 9" stroke={user.status === "Blocked" ? "#D32F2F" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-[13px] font-medium">Block</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                ))
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={(e) => e.stopPropagation()}>
          <div 
            className="bg-white w-full max-w-[600px] min-h-[360px] rounded-[16px] p-[32px] md:p-[40px] flex flex-col items-center justify-center shadow-2xl relative"
          >
            {/* Close Icon */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-[24px] right-[24px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Avatar */}
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#D9D9D9] mb-[20px]">
              {selectedUser.avatar && (
                <Image
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            {/* Name */}
            <h2 
              className="text-[#000000] text-[26px] md:text-[30px] font-normal leading-[100%] mb-[12px]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              {selectedUser.name}
            </h2>

            {/* Verified Badge */}
            <div className="flex items-center gap-[8px] mb-[32px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L14.59 3.59L18.25 3.5L18.75 7.15L22 9L20.5 12L22 15L18.75 16.85L18.25 20.5L14.59 20.41L12 23L9.41 20.41L5.75 20.5L5.25 16.85L2 15L3.5 12L2 9L5.25 7.15L5.75 3.5L9.41 3.59L12 1Z" fill="#0F792F"/>
                <path d="M10 16.5L6 12.5L7.41 11.09L10 13.67L16.59 7.09L18 8.5L10 16.5Z" fill="white"/>
              </svg>
              <span 
                className="text-[#000000] text-[15px] md:text-[16px] font-medium leading-[100%]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Verified {selectedUser.role}
              </span>
            </div>

            {/* Contact User Button */}
            <button
              onClick={() => {
                setIsContactModalOpen(true);
                setSelectedUser(null);
              }}
              className="w-[200px] h-[48px] md:h-[52px] bg-[#1174BB] rounded-[8px] text-white font-medium text-[15px] md:text-[16px] transition-colors hover:bg-[#0E63A0] cursor-pointer shadow-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Contact {selectedUser.role}
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4" onClick={() => setIsContactModalOpen(false)}>
          <div 
            className="bg-[#F5F5F5] w-full max-w-[500px] rounded-[16px] p-[24px] md:p-[32px] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Text Area */}
            <textarea
              className="w-full h-[150px] md:h-[180px] rounded-[12px] bg-white border border-[#E0E0E0] p-[16px] text-[#000000] text-[14px] md:text-[15px] outline-none resize-none shadow-sm placeholder:text-[#8E8E8E]"
              placeholder="Type here..."
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-[12px] md:gap-[16px] mt-[24px]">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="flex-1 h-[48px] md:h-[52px] bg-white rounded-[8px] text-[#000000] font-medium text-[15px] md:text-[16px] border border-[#E0E0E0] transition-colors hover:bg-[#F9F9F9] shadow-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Go Back
              </button>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="flex-1 h-[48px] md:h-[52px] bg-[#1174BB] rounded-[8px] text-white font-medium text-[15px] md:text-[16px] transition-colors hover:bg-[#0E63A0] shadow-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
