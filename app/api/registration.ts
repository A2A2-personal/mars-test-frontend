import { API_BASE_URL } from "~/lib/config";
import type { RegistrationData } from "~/types/registration";

export async function submitRegistration(data: RegistrationData) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("photo", data.photo[0]);

  const response = await fetch(`${API_BASE_URL}/registration`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit");
  }

  return await response.json();
}

export async function getRegistrationList() {
  const response = await fetch(`${API_BASE_URL}/registration`, {
    method: "GET"
  });

  console.log(response)
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit");
  }

  return await response.json();
}

export async function deleteRegistration(id: string) {
  const response = await fetch(`${API_BASE_URL}/registration/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit");
  }

  return await response.json();
}

export async function getRegistration(id: string) {
  const response = await fetch(`${API_BASE_URL}/registration/${id}`, {
    method: "GET"
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit");
  }

  return await response.json();
}

export async function updateStatusRegistration(id: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/registration/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit");
  }

  return await response.json();
}

export async function updateRegistration(id: string, data: RegistrationData) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("phoneNumber", data.phoneNumber);
  if (data.photo && data.photo.length !== 0) {
    formData.append("photo", data.photo[0]);
  }

  const response = await fetch(`${API_BASE_URL}/registration/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit");
  }

  return await response.json();
}
