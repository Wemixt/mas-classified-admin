"use client";

import { useAuth } from "@/hooks";
import { useState, useEffect, useMemo } from "react";
import { categoryService } from "@/services/admin/category.service";
import { Category, SubCategory } from "@/types";
import toast from "react-hot-toast";

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

const RedTrashIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4H13M2.5 4V13.5C2.5 14.3284 3.17157 15 4 15H10C10.8284 15 11.5 14.3284 11.5 13.5V4M5 4V2C5 1.44772 5.44772 1 6 1H8C8.55228 1 9 1.44772 9 2V4" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 7.5V11.5M8.5 7.5V11.5" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlusCircleIcon = ({ color }: { color: string }) => (
  <div className="w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center shrink-0">
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1V9M1 5H9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
);

const ChevronDown = () => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L6 6L11 1" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronUp = () => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 6L6 1L1 6" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CategoriesContent() {
  const { role } = useAuth(); // "admin" | "moderator" | "super_admin"
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const gridClasses = "grid grid-cols-[1.5fr_1.5fr_1.2fr_1.2fr_1fr] items-center";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await categoryService.getMainCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setIsCreating(true);
      await categoryService.createCategory({
        name: newCategoryName,
        description: newCategoryDescription || undefined,
        icon: newCategoryIcon || undefined,
      });
      
      setShowAddModal(false);
      setShowDoneModal(true);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setNewCategoryIcon("");
      fetchCategories(); // Refresh the list
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setIsCreating(false);
    }
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const toggleExpand = (id: number) => {
    setExpandedCategoryId(prev => prev === id ? null : id);
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
          <button 
            onClick={() => setShowAddModal(true)}
            className="h-[44px] px-[20px] bg-[#1174BB] text-white rounded-[6px] text-[14.5px] font-medium flex items-center gap-[10px] hover:bg-[#0E63A0] transition-colors w-full md:w-auto justify-center md:justify-start shrink-0"
          >
            <PlusCircleIcon color="#1174BB" />
            Add Category
          </button>
        )}
      </div>

      {/* All Categories Section */}
      <h2 className="text-[#000000] text-[18px] md:text-[22px] font-medium leading-[100%] mt-[30px] md:mt-[40px] mb-[20px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
        All Categories
      </h2>

      <div className="flex flex-col mb-[40px] overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="min-w-[900px]">
          {/* Table Header */}
          {role === "admin" || role === "super_admin" ? (
            <div className={`bg-[#1174BB] rounded-[8px] h-[47px] mb-[16px] px-[24px] ${gridClasses}`}>
              <div className="text-white text-[13px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Category Name</div>
              <div className="text-white text-[13px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Code</div>
              <div className="text-white text-[13px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Subcategories</div>
              <div className="text-white text-[13px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Actions</div>
              <div className="text-white text-[13px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Statue</div>
            </div>
          ) : (
            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr] bg-[#1174BB] rounded-[8px] h-[47px] items-center px-[24px] mb-[16px]">
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Category Name</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Code</div>
              <div className="text-white text-[12px] md:text-[14px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>Published Ads</div>
              <div />
            </div>
          )}

          {/* Categories List */}
          <div className="flex flex-col gap-[12px]">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1174BB]"></div>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-10 text-[#5E5E5E]">No categories found</div>
            ) : (
              filteredCategories.map((cat) => {
                const isExpanded = expandedCategoryId === cat.id;

                if (role === "moderator") {
                  return (
                    <div key={cat.id} className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr] items-center min-h-[58px] px-[24px] bg-[#F5F5F5] rounded-[10px]">
                      <div className="text-[#000000] text-[13px] md:text-[14px] font-medium leading-[150%]">{cat.name}</div>
                      <div className="text-[#000000] text-[13px] md:text-[14px] font-bold leading-[150%]">{cat.slug}</div>
                      <div className="text-[#000000] text-[13px] md:text-[14px] font-medium leading-[150%]">{cat.subCategories?.length || 0}</div>
                      <div className="flex justify-end">
                        <button className="h-[30px] px-[16px] bg-[#EBEBEB] text-[#101010] text-[12px] font-medium rounded-[15px] hover:bg-[#D4D4D4] transition-colors whitespace-nowrap">
                          View All Ad
                        </button>
                      </div>
                    </div>
                  );
                }

                // Admin View
                return (
                  <div key={cat.id} className="flex flex-col">
                    {/* Main Row */}
                    <div 
                      className={`px-[24px] bg-[#F5F5F5] transition-colors cursor-pointer min-h-[58px] py-[8px] ${gridClasses} ${isExpanded ? 'rounded-t-[10px]' : 'rounded-[10px]'}`}
                      onClick={() => toggleExpand(cat.id)}
                    >
                      <div className="text-[#000000] text-[13px] md:text-[14px] font-medium leading-[150%]">{cat.name}</div>
                      <div className="text-[#000000] text-[13px] md:text-[14px] font-bold leading-[150%]">{cat.slug}</div>
                      <div className="text-[#000000] text-[13px] md:text-[14px] font-medium leading-[150%]">{cat.subCategories?.length || 0}</div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-[12px]">
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="h-[30px] px-[16px] bg-[#14487A] text-white text-[12px] font-medium rounded-full flex items-center gap-[6px] hover:bg-[#0E365E] transition-colors"
                        >
                          <EditIcon /> Edit
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center transition-opacity hover:opacity-70 p-[6px] hover:bg-[#EAEAEA] rounded-full"
                        >
                          <RedTrashIcon />
                        </button>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between gap-[8px]">
                        <div className="flex items-center gap-[8px]">
                          <Toggle active={cat.isActive} />
                          <span className="text-[#000000] text-[13px] md:text-[14px] font-bold">{cat.isActive ? "Active" : "Disabled"}</span>
                        </div>
                        <div className="pr-[8px]">
                          {isExpanded ? <ChevronUp /> : <ChevronDown />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Subcategories */}
                    {isExpanded && (
                      <div className="bg-[#EBEBEB] rounded-b-[10px] px-[24px] py-[20px]">
                        <div className="grid grid-cols-[1.5fr_1.5fr_3.4fr] border-b border-[#D4D4D4] pb-[12px] mb-[12px]">
                          <div className="text-[#333333] text-[13px] font-bold pl-[8px] md:pl-[16px]">Subcategory Name</div>
                          <div className="text-[#333333] text-[13px] font-bold">Code</div>
                          <div className="text-[#333333] text-[13px] font-bold">Statue</div>
                        </div>
                        
                        <div className="flex flex-col">
                          {cat.subCategories?.map((sub) => (
                            <div key={sub.id} className="grid grid-cols-[1.5fr_1.5fr_3.4fr] items-center border-b border-[#D4D4D4] py-[12px]">
                              <div className="text-[#555555] text-[13px] font-medium pl-[8px] md:pl-[16px]">{sub.name}</div>
                              <div className="text-[#555555] text-[13px] font-medium">{sub.slug}</div>
                              <div className="flex items-center gap-[8px]">
                                <Toggle active={sub.isActive} />
                                <span className="text-[#000000] text-[13px] font-bold">{sub.isActive ? "Active" : "Disabled"}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add subcategory inputs */}
                        <div className="grid grid-cols-[1.5fr_1.5fr_3.4fr] items-center pt-[16px]">
                          <div className="pl-[8px] md:pl-[16px]">
                            <input type="text" placeholder="Type here..." className="h-[38px] w-[90%] max-w-[200px] bg-white rounded-full px-[16px] text-[13px] outline-none border border-transparent focus:border-[#1174BB]" onClick={(e) => e.stopPropagation()} />
                          </div>
                          <div>
                            <input type="text" placeholder="Type here..." className="h-[38px] w-[90%] max-w-[200px] bg-white rounded-full px-[16px] text-[13px] outline-none border border-transparent focus:border-[#1174BB]" onClick={(e) => e.stopPropagation()} />
                          </div>
                          <div>
                            <button 
                              onClick={(e) => e.stopPropagation()}
                              className="h-[38px] px-[20px] bg-[#114A82] text-white text-[13px] font-medium rounded-full flex items-center gap-[8px] hover:bg-[#0E3A66] transition-colors whitespace-nowrap w-fit"
                            >
                              <PlusCircleIcon color="#114A82" />
                              <span className="text-white">Add Subcategories</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className="bg-[#F4F5F7] w-full max-w-[500px] rounded-[16px] p-[24px] md:p-[32px] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-[16px] mb-[24px]">
              <div>
                <label className="text-[13px] text-[#5E5E5E] mb-[6px] block font-medium">Category Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Electronics"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full h-[52px] bg-white rounded-[8px] px-[16px] text-[#333] text-[14px] md:text-[15px] outline-none shadow-sm placeholder:text-[#A0A0A0]"
                />
              </div>
              <div>
                <label className="text-[13px] text-[#5E5E5E] mb-[6px] block font-medium">Description</label>
                <input
                  type="text"
                  placeholder="e.g. All electronic items"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className="w-full h-[52px] bg-white rounded-[8px] px-[16px] text-[#333] text-[14px] md:text-[15px] outline-none shadow-sm placeholder:text-[#A0A0A0]"
                />
              </div>
              <div>
                <label className="text-[13px] text-[#5E5E5E] mb-[6px] block font-medium">Icon Class (FontAwesome)</label>
                <input
                  type="text"
                  placeholder="e.g. fa-plug"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  className="w-full h-[52px] bg-white rounded-[8px] px-[16px] text-[#333] text-[14px] md:text-[15px] outline-none shadow-sm placeholder:text-[#A0A0A0]"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-[16px]">
              <button
                onClick={() => setShowAddModal(false)}
                disabled={isCreating}
                className="flex-1 h-[48px] bg-white border border-[#D0D0D0] rounded-[8px] text-[#000] text-[15px] md:text-[16px] font-medium hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                disabled={isCreating}
                className="flex-1 h-[48px] bg-[#114A82] text-white rounded-[8px] text-[15px] md:text-[16px] font-medium hover:bg-[#0E3A66] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  "Add Category"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Done Modal */}
      {showDoneModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowDoneModal(false)}
        >
          <div 
            className="bg-[#F4F5F7] w-full max-w-[400px] rounded-[16px] p-[40px] flex flex-col items-center justify-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDoneModal(false)}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#6B6B6B] hover:bg-[#555555] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Checkmark Icon */}
            <div className="mb-[24px]">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="56" fill="#1174BB" />
                <path d="M34 62L52 80L86 42" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 
              className="text-[#000] text-[28px] md:text-[32px] font-normal leading-[100%]"
              style={{ fontFamily: "Eurostile, sans-serif" }}
            >
              Done!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
