import { apiBaseUrl } from "@/src/config/config";
import { TContact } from "@/src/types";

export const createContact = async (ContactData : TContact) => {
  try {
    const res = await fetch(`${apiBaseUrl}/contact/create-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ContactData),
    });

    if (!res.ok) {
      throw new Error(`Create contact failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};