export type SortKey =
  | "featured"
  | "a-z"
  | "z-a"
  | "dateNewToOld"
  | "low-high"
  | "high-low";

export const sortMap: Record<SortKey, string> = {
  featured: "featured",      // 🔹 new
  "a-z": "a-z",
  "z-a": "z-a",
  dateNewToOld: "dateDesc",
  "low-high": "priceLowToHigh",
  "high-low": "priceHighToLow",
};

export const isValidSortBy = (val: string): val is string =>
  Object.values(sortMap).includes(val);


