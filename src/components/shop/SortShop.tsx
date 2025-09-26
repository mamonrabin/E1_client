"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isValidSortBy, SortKey, sortMap } from "@/src/utilits/sortMap";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


interface SortShopProps {
  currentSort?: string;
}

const SortShop: React.FC<SortShopProps> = ({ currentSort }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortValue, setSortValue] = useState<SortKey>("dateNewToOld");

  useEffect(() => {
    const sortBy = searchParams.get("sortBy") || "dateNewToOld";
    if (isValidSortBy(sortBy)) {
      const matchedKey = (Object.keys(sortMap) as SortKey[]).find(
        (key) => sortMap[key] === sortBy
      );
      if (matchedKey) setSortValue(matchedKey);
    } else {
      setSortValue("dateNewToOld");
    }
  }, [searchParams]);

  const handleSortChange = (val: SortKey) => {
    setSortValue(val);
    const backendSort = sortMap[val];

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", backendSort);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={sortValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] rounded-sm border border-primary/40 outline-none">
        <SelectValue placeholder="Default sorting" ></SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-sm border border-primary/40 z-50 bg-white">
        <SelectItem value="a-z">Sorting by A to Z</SelectItem>
        <SelectItem value="z-a">Sorting by Z to A</SelectItem>
        <SelectItem value="low-high">Price, low to high</SelectItem>
        <SelectItem value="high-low">Price, high to low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortShop;
