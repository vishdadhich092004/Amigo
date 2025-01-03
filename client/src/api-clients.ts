import { RegisterFormData } from "./pages/NewUser";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};
