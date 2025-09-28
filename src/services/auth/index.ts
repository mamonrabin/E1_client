"use server";

import { apiBaseUrl } from "@/src/config/config";

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: string;   // optional, defaults to "user"
  status?: string; // optional, defaults to "active"
}

export const signUp = async (payload: SignUpPayload) => {
  try {
    const res = await fetch(`${apiBaseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Signup failed: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
};


// Login
export const login = async (payload: { email: string; password: string }) => {
  try {
    const res = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Login failed: ${res.statusText}`);
    }

    const data = await res.json();

    // ✅ Save token to localStorage (or cookies)
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// // Logout (client-side only)
// export const logout = () => {
//   // ✅ Remove token
//   localStorage.removeItem("authToken");

//   // (optional) also clear user info if stored
//   localStorage.removeItem("user");

//   // you could also redirect to login page here
// };







export const getUser = async () => {
  try {
    const token = typeof window !== "undefined" 
      ? localStorage.getItem("accessToken") 
      : null;

    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send token
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("GetUser error:", error);
    throw error;
  }
};
