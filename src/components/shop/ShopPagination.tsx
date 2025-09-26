"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface ShopPaginationProps {
  page: number;
  limit: number;
  total: number;
}

const ShopPagination = ({ page, limit, total }: ShopPaginationProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(total / limit);

  const goToPage = (p: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(p));
    params.set("limit", String(limit));
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => goToPage(page - 1)} />
          </PaginationItem>
        )}

        {[...Array(totalPages)].map((_, i) => {
          const p = i + 1;
          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => goToPage(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => goToPage(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ShopPagination;
