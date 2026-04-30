"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-[12px] mt-[32px] md:mt-[40px] pb-[20px]">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] border border-[#C5C5C5] bg-white text-[#5E5E5E] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-center gap-[8px]">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show only first page, last page, and pages around current page
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={isLoading}
                className={`w-[36px] h-[36px] rounded-[8px] text-[14px] font-medium transition-all ${
                  currentPage === page
                    ? "bg-[#1174BB] text-white shadow-md"
                    : "bg-white border border-[#C5C5C5] text-[#5E5E5E] hover:bg-[#F4F4F4]"
                }`}
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {page}
              </button>
            );
          } else if (
            page === currentPage - 2 ||
            page === currentPage + 2
          ) {
            return (
              <span key={page} className="text-[#BDBDBD] px-1">...</span>
            );
          }
          return null;
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] border border-[#C5C5C5] bg-white text-[#5E5E5E] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 11L9 7L5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
