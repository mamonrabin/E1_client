// export const apiBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// export const apiBaseUrl: string = process.env.API_BASE_URL || "http://localhost:3000/api/v1";

const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.API_BASE_URL!;
  }
  // Local dev fallback
  return process.env.API_BASE_URL || "http://localhost:3000/api/v1";
};

export const apiBaseUrl = getBaseUrl();

