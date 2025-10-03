export type SortKey =
  | "featured"
  | "a-z"
  | "z-a"
  | "dateNewToOld"
  | "low-high"
  | "high-low";

export const sortMap: Record<SortKey, string> = {
  featured: "featured",      // 🔹 new
  "a-z": "nameAsc",
  "z-a": "nameDesc",
  dateNewToOld: "dateDesc",
  "low-high": "priceAsc",
  "high-low": "priceDesc",
};

export const isValidSortBy = (val: string): val is string =>
  Object.values(sortMap).includes(val);
