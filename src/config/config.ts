const getBaseUrl = () => {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }

  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // fallback for local dev
  return "http://localhost:3000/api/v1";
};

export const apiBaseUrl = getBaseUrl();
