import { LoginFormData } from "./pages/LoginUser";
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
export const loginUser = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
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

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
    credentials: "include",
    method: "GET",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};
