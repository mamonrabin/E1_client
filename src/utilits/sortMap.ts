// utils/sortMap.ts

export const sortMap = {
  "a-z": "a-z",
  "z-a": "z-a",
  "low-high": "priceLowToHigh",
  "high-low": "priceHighToLow",
  "dateNewToOld": "dateNewToOld", // default
} as const;

export type SortKey = keyof typeof sortMap;
export type SortBy = (typeof sortMap)[SortKey];

export const isValidSortBy = (value: string): value is SortBy =>
  Object.values(sortMap).includes(value as SortBy);
