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

const ShopPagination = ({ page, limit, total }: ShopPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / (limit || 1)));

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    params.set("limit", String(limit || 6));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-8 flex justify-center">
      <PaginationContent className="cursor-pointer">
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
