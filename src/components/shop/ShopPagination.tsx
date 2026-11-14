
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ShopPaginationProps {
  page: number;
  limit: number;
  total: number;
}

const ShopPagination = ({
  page,
  limit,
  total,
}: ShopPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const safeLimit = Math.max(1, limit || 6);
  const totalPages = Math.ceil(total / safeLimit);
  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

  const startItem = total === 0 ? 0 : (currentPage - 1) * safeLimit + 1;
  const endItem = Math.min(currentPage * safeLimit, total);

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(nextPage));
    params.set("limit", String(safeLimit));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: true,
    });
  };

  // Generate a compact page range
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-gray-100 pt-6 sm:flex-row">
      {/* Product count */}
      <p className="text-xs text-gray-500 sm:text-sm">
        Showing{" "}
        <span className="font-semibold text-[#202020]">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#202020]">
          {total}
        </span>{" "}
        products
      </p>

      {/* Pagination */}
      <Pagination className="mx-0 w-auto justify-center">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={`h-9 rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-[#087096] hover:bg-[#087096]/5 hover:text-[#087096] ${
                currentPage === 1
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            />
          </PaginationItem>

          {getPageNumbers().map((p, index) => (
            <PaginationItem key={`${p}-${index}`}>
              {p === "..." ? (
                <span className="flex h-9 w-8 items-center justify-center text-gray-400">
                  ...
                </span>
              ) : (
                <PaginationLink
                  isActive={p === currentPage}
                  onClick={() => goToPage(p)}
                  aria-label={`Go to page ${p}`}
                  className={`h-9 min-w-9 cursor-pointer rounded-lg border transition-colors ${
                    p === currentPage
                      ? "border-[#087096] bg-[#087096] text-white hover:bg-[#065b78] hover:text-white"
                      : "border-gray-200 text-gray-600 hover:border-[#087096] hover:bg-[#087096]/5 hover:text-[#087096]"
                  }`}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              className={`h-9 rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-[#087096] hover:bg-[#087096]/5 hover:text-[#087096] ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ShopPagination;
