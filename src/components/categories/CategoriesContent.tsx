"use client";

import { useAuth } from "@/hooks";
import { useState } from "react";

interface Subcategory {
  id: string;
  name: string;
  parent: string;
  status: "Active" | "Disabled";
}

interface Category {
  id: string;
  name: string;
  code: string;
  subcategories: number;
  publishedAds?: number;
  status: "Active" | "Disabled";
  children?: Subcategory[];
}

const mockCategories: Category[] = [
  { id: "1", name: "Food & Treats", code: "food-treats", subcategories: 12, publishedAds: 12, status: "Active" },
  { id: "2", name: "Tech & Gadgets", code: "tech-gadgets", subcategories: 8, publishedAds: 8, status: "Active" },
  { id: "3", name: "Home & Garden", code: "home-garden", subcategories: 11, publishedAds: 11, status: "Active" },
  { id: "4", name: "Crafts & Decor", code: "crafts-decor", subcategories: 11, publishedAds: 11, status: "Disabled" },
  { 
    id: "5", name: "Clothing & Fashion", code: "clothing-fashion", subcategories: 3, publishedAds: 3, status: "Active", 
    children: [
      { id: "s1", name: "Men's clothing", parent: "Clothing & Fashion", status: "Active" },
      { id: "s2", name: "Women's clothing", parent: "Clothing & Fashion", status: "Active" },
      { id: "s3", name: "Kid's Clothing", parent: "Clothing & Fashion", status: "Active" }
    ] 
  },
];

const mockSubcategories: Subcategory[] = [
  { id: "1", name: "Cakes & Sweets", parent: "Food & treats", status: "Active" },
  { id: "2", name: "Snacks", parent: "Food & treats", status: "Active" },
  { id: "3", name: "Spices & Tea", parent: "Food & treats", status: "Active" }
];

const Toggle = ({ active }: { active: boolean }) => (
  <div className={`w-[36px] h-[20px] rounded-[10px] flex items-center p-[2.5px] transition-colors ${active ? 'bg-[#4CAF50] justify-end' : 'bg-[#A0A0A0] justify-start'}`}>
    <div className="w-[15px] h-[15px] bg-white rounded-full shadow-sm" />
  </div>
);

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 11.5H12M1.5 11.5L5.5 10.5L12 4C12.5 3.5 12.5 2.5 12 2C11.5 1.5 10.5 1.5 10 2L3.5 8.5L2.5 12.5L1.5 11.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = ({ isGrey, isWhite }: { isGrey?: boolean, isWhite?: boolean }) => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4H13M2.5 4V13.5C2.5 14.3284 3.17157 15 4 15H10C10.8284 15 11.5 14.3284 11.5 13.5V4M5 4V2C5 1.44772 5.44772 1 6 1H8C8.55228 1 9 1.44772 9 2V4M5.5 7.5V11.5M8.5 7.5V11.5" stroke={isWhite ? "#FFFFFF" : isGrey ? "#A0A0A0" : "#D32F2F"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusCircleIcon = ({ color }: { color: string }) => (
  <div className="w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center shrink-0">
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1V9M1 5H9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
);

export default function CategoriesContent() {
  const { role } = useAuth(); // "admin" | "moderator" | "super_admin"
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategoryId, setExpandedCategoryId] = useState<string>("5"); // Pre-expand clothing for mockup fidelity

  const toggleExpand = (id: string) => {
    setExpandedCategoryId(prev => prev === id ? "" : id);
  };

  return (
    <div className="p-[16px] md:p-[28px] flex flex-col min-h-full max-w-full overflow-hidden">
      {/* Page Title */}
      <div>
        <h1 className="text-[#5E5E5E] text-[18px] md:text-[22px] font-normal leading-[100%] tracking-normal" style={{ fontFamily: "Eurostile, sans-serif" }}>
          Categories
        </h1>
        <div className="border-t border-[#5E5E5E] opacity-70 mt-[16px]" />
      </div>

      {/* Top Bar: Search & Add */}
      <div className="mt-[24px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px] md:gap-0">
        <div className="w-full md:w-[493px] h-[44px] border border-[#D2D2D2] rounded-[8px] flex items-center px-[16px] gap-[12px] bg-white shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#5E5E5E" fillOpacity="0.7" />
          </svg>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-[15px] font-normal text-[#000000] placeholder:text-[#5E5E5E]/70 min-w-0"
          />
        </div>
        
        {(role === "admin" || role === "super_admin") && (
          <button className="h-[44px] px-[20px] bg-[#1174BB] text-white rounded-[6px] text-[14.5px] font-medium flex items-center gap-[10px] hover:bg-[#0E63A0] transition-colors w-full md:w-auto justify-center md:justify-start shrink-0">
            <PlusCircleIcon color="#1174BB" />
            Add Category
          </button>
        )}
      </div>

      {/* All Categories Section */}
      <h2 className="text-[#000000] text-[18px] md:text-[20px] font-medium leading-[100%] mt-[30px] md:mt-[40px] mb-[20px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
        All Categories
      </h2>

      <div className="flex flex-col mb-[40px] overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          {role === "admin" || role === "super_admin" ? (
            <div className="grid grid-cols-[1.5fr_1.5fr_1.2fr_1fr_2.5fr] bg-[#1174BB] rounded-[8px] h-[47px] items-center">
              <div className="pl-[24px] text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Category Name</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Code</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Subcategories</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Status</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Actions</div>
            </div>
          ) : (
            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr] bg-[#1174BB] rounded-[8px] h-[47px] items-center pr-[24px]">
              <div className="pl-[24px] text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Category Name</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Code</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Published Ads</div>
              <div />
            </div>
          )}

          {/* Categories List */}
          <div className="flex flex-col border border-t-0 border-[#E0E0E0] rounded-b-[8px]">
            {mockCategories.map((cat, idx) => {
              const isExpanded = expandedCategoryId === cat.id;

              if (role === "moderator") {
                return (
                  <div key={cat.id} className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr] items-center min-h-[57px] py-[12px] pr-[24px] ${idx !== mockCategories.length - 1 ? 'border-b border-[#E0E0E0]' : ''}`}>
                    <div className="pl-[24px] text-[#000000] text-[11px] md:text-[12px] font-semibold leading-[150%]">{cat.name}</div>
                    <div className="text-[#000000] text-[11px] md:text-[12px] font-semibold leading-[150%]">{cat.code}</div>
                    <div className="text-[#000000] text-[11px] md:text-[12px] font-semibold leading-[150%] pl-[16px]">{cat.publishedAds}</div>
                    <div className="flex justify-end">
                      <button className="h-[28px] px-[16px] bg-[#EBEBEB] text-[#101010] text-[11px] md:text-[12px] font-medium rounded-[14px] hover:bg-[#D4D4D4] transition-colors whitespace-nowrap">
                        View All Ad
                      </button>
                    </div>
                  </div>
                );
              }

              // Admin View
              if (isExpanded) {
                return (
                  <div key={cat.id} className={`py-[20px] ${idx !== mockCategories.length - 1 ? 'border-b border-[#E0E0E0]' : ''}`}>
                    <div className="flex items-center justify-between pl-[24px] pr-[24px] mb-[16px]">
                      <div className="text-[#000000] text-[11px] md:text-[12px] font-semibold leading-[150%] w-[25%]">{cat.name}</div>
                      <div className="text-[#5E5E5E] text-[11px] md:text-[12px] font-medium flex-1">
                        Subcategories of &apos;{cat.name}&apos;
                      </div>
                      <button className="h-[28px] px-[14px] bg-[#1174BB] text-white text-[11px] md:text-[12px] rounded-[14px] flex items-center gap-[6px] hover:bg-[#0E63A0] transition-colors whitespace-nowrap" onClick={() => toggleExpand(cat.id)}>
                        <PlusCircleIcon color="#1174BB" />
                        Add Subcategories
                      </button>
                    </div>

                    <div className="pl-[24px] max-w-full md:max-w-[750px] pb-[8px]">
                      <div className="grid grid-cols-[1.5fr_1.5fr_1fr] bg-[#1174BB] rounded-[6px] h-[36px] items-center mb-[8px]">
                        <div className="pl-[20px] text-white text-[12px] md:text-[13px] font-medium">Subcategory Name</div>
                        <div className="text-white text-[12px] md:text-[13px] font-medium">Parent Category</div>
                        <div className="text-white text-[12px] md:text-[13px] font-medium">Status</div>
                      </div>
                      <div className="flex flex-col gap-[12px] pt-[8px]">
                        {cat.children?.map((sub) => (
                          <div key={sub.id} className="grid grid-cols-[1.5fr_1.5fr_1fr] items-center px-[20px]">
                            <div className="text-[#5E5E5E] text-[11px] md:text-[12px] font-medium leading-[150%]">{sub.name}</div>
                            <div className="text-[#000000] text-[11px] md:text-[12px] font-semibold leading-[150%]">{sub.parent}</div>
                            <div className="flex items-center gap-[8px]">
                              <Toggle active={sub.status === "Active"} />
                              <span className="text-[#4CAF50] text-[12px] md:text-[13.5px] font-medium">Active</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const isDisabled = cat.status === "Disabled";

              return (
                <div key={cat.id} className={`grid grid-cols-[1.5fr_1.5fr_1.2fr_1fr_2.5fr] items-center min-h-[57px] py-[12px] hover:bg-[#F9F9F9] transition-colors cursor-pointer ${idx !== mockCategories.length - 1 ? 'border-b border-[#E0E0E0]' : ''}`} onClick={() => toggleExpand(cat.id)}>
                  <div className={`pl-[24px] text-[11px] md:text-[12px] font-semibold leading-[150%] ${isDisabled ? "text-[#A0A0A0]" : "text-[#000000]"}`}>{cat.name}</div>
                  <div className={`text-[11px] md:text-[12px] font-semibold leading-[150%] ${isDisabled ? "text-[#A0A0A0]" : "text-[#000000]"}`}>{cat.code}</div>
                  <div className={`text-[11px] md:text-[12px] font-semibold leading-[150%] pl-[24px] ${isDisabled ? "text-[#A0A0A0]" : "text-[#000000]"}`}>{cat.subcategories}</div>
                  <div className="flex items-center gap-[8px]">
                    <Toggle active={!isDisabled} />
                    <span className={`text-[11px] md:text-[13.5px] font-medium ${isDisabled ? "text-[#A0A0A0]" : "text-[#5E5E5E]"}`}>{cat.status}</span>
                  </div>
                  <div className="flex items-center justify-between pr-[24px] w-full gap-[10px]">
                    <div className="flex items-center gap-[16px] md:gap-[40px]">
                      <button className={`h-[26px] px-[14px] text-white text-[10px] md:text-[11.5px] font-medium rounded-[13px] flex items-center gap-[6px] transition-colors whitespace-nowrap ${isDisabled ? "bg-[#B3B3B3]" : "bg-[#242A38] hover:bg-[#1A1E29]"}`} onClick={(e) => { e.stopPropagation(); }}>
                        <EditIcon /> Edit
                      </button>
                      <button className="flex items-center justify-center transition-opacity hover:opacity-70" onClick={(e) => { e.stopPropagation(); }}>
                        <TrashIcon isGrey={isDisabled} />
                      </button>
                    </div>
                    <button className={`h-[28px] px-[14px] text-white text-[11px] md:text-[12px] font-medium rounded-[14px] flex items-center gap-[6px] transition-colors whitespace-nowrap ${isDisabled ? "bg-[#A0A0A0]" : "bg-[#1174BB] hover:bg-[#0E63A0]"}`} onClick={(e) => { e.stopPropagation(); toggleExpand(cat.id); }}>
                      <PlusCircleIcon color={isDisabled ? "#A0A0A0" : "#1174BB"} />
                      Add Subcategories
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Subcategories Section (Admin Only) */}
      {(role === "admin" || role === "super_admin") && (
        <div className="mt-[20px]">
          <h2 className="text-[#000000] text-[18px] md:text-[20px] font-medium leading-[100%] mb-[20px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
            All Subcategories
          </h2>
          
          <div className="flex flex-col overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="min-w-[800px]">
              {/* Table Header */}
              <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr] bg-[#1174BB] rounded-[8px] h-[47px] items-center">
                <div className="pl-[24px] text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Subcategory Name</div>
                <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Parent Category</div>
                <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Status</div>
                <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Actions</div>
              </div>

              {/* Subcategories List */}
              <div className="flex flex-col border border-t-0 border-[#E0E0E0] rounded-b-[8px]">
                {mockSubcategories.map((sub, idx) => (
                  <div key={sub.id} className={`grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr] items-center min-h-[57px] py-[12px] hover:bg-[#F9F9F9] transition-colors ${idx !== mockSubcategories.length - 1 ? 'border-b border-[#E0E0E0]' : ''}`}>
                    <div className="pl-[24px] text-[#5E5E5E] text-[12px] md:text-[14.5px] font-medium">{sub.name}</div>
                    <div className="text-[#5E5E5E] text-[12px] md:text-[14px] font-medium">{sub.parent}</div>
                    <div className="flex items-center gap-[8px]">
                      <Toggle active={sub.status === "Active"} />
                      <span className="text-[#4CAF50] text-[12px] md:text-[13.5px] font-medium">Active</span>
                    </div>
                    <div className="flex items-center gap-[16px] md:gap-[40px]">
                      <button className="h-[26px] px-[14px] bg-[#242A38] text-white text-[10px] md:text-[11.5px] font-medium rounded-[13px] flex items-center gap-[6px] hover:bg-[#1A1E29] transition-colors whitespace-nowrap">
                        <EditIcon /> Edit
                      </button>
                      <button className="flex items-center justify-center transition-opacity hover:opacity-70">
                         <TrashIcon isGrey={false} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
