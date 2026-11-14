
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  isValidSortBy,
  SortKey,
  sortMap,
} from "@/src/utilits/sortMap";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowDownWideNarrow } from "lucide-react";

interface SortShopProps {
  currentSort?: string;
}

const SortShop: React.FC<SortShopProps> = ({ currentSort }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getSortKey = (sortBy?: string): SortKey => {
    if (!sortBy || !isValidSortBy(sortBy)) return "featured";

    return (
      (Object.keys(sortMap) as SortKey[]).find(
        (key) => sortMap[key] === sortBy
      ) ?? "featured"
    );
  };

  const [sortValue, setSortValue] = useState<SortKey>(
    getSortKey(currentSort || searchParams.get("sortBy") || undefined)
  );

  useEffect(() => {
    const sortBy = searchParams.get("sortBy") || currentSort;
    setSortValue(getSortKey(sortBy));
  }, [searchParams, currentSort]);

  const handleSortChange = (value: string) => {
    const selectedSort = value as SortKey;

    setSortValue(selectedSort);

    const params = new URLSearchParams(searchParams.toString());

    if (selectedSort === "featured") {
      params.delete("sortBy");
    } else {
      params.set("sortBy", sortMap[selectedSort]);
    }

    // Reset pagination when sorting changes
    params.delete("page");

    const query = params.toString();

    router.push(query ? `?${query}` : "?", {
      scroll: false,
    });
  };

  return (
    <Select value={sortValue} onValueChange={handleSortChange}>
      <SelectTrigger className="h-10 w-[180px] rounded-lg border-gray-200 bg-white text-sm shadow-none transition-colors hover:border-[#087096] focus:ring-[#087096]">
        <div className="flex items-center gap-2">
          <ArrowDownWideNarrow size={16} className="text-[#087096]" />
          <SelectValue placeholder="Sort products" />
        </div>
      </SelectTrigger>

      <SelectContent className="z-50 rounded-lg border-gray-200 bg-white">
        <SelectItem value="featured">Featured Products</SelectItem>
        <SelectItem value="a-z">Name: A to Z</SelectItem>
        <SelectItem value="z-a">Name: Z to A</SelectItem>
        <SelectItem value="low-high">Price: Low to High</SelectItem>
        <SelectItem value="high-low">Price: High to Low</SelectItem>
        <SelectItem value="new-old">Newest First</SelectItem>
        <SelectItem value="old-new">Oldest First</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortShop;
