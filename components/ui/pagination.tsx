"use client";

import { ArrowLeft , ArrowRight } from "lucide-react";

interface PaginationProps {
  current: number;
  onPageChange: (page: number) => void;
  onRowChange: (pageSize: number) => void;
  pageSize: number;
  total: number;
}

export default function Pagination({
  current,
  onPageChange,
  pageSize,
  total,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push("...");
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (current > 1) {
      onPageChange(current - 1);
    }
  };

  const handleNext = () => {
    if (current < totalPages) {
      onPageChange(current + 1);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={current <= 1}
        className="flex items-center justify-center w-8 h-8 rounded-full  border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-full">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="flex items-center justify-center w-8 h-8 text-black">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`flex font-outfit items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  current === page
                    ? "border-2 border-gray-300 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={current >= totalPages}
        className="flex items-center justify-center w-8 h-8 rounded-full  bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
