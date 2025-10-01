
import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  _id: string;
  id: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const getCurrentUser = (): DecodedUser | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    return jwtDecode<DecodedUser>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};