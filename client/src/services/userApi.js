// client/src/services/userApi.js
import api from "./apiClient";

export async function getCurrentUser() {
  const res = await api.get("/users/me");
  return res.data;
}

export async function getMetadata() {
  const res = await api.get("/users/metadata");
  return res.data;
}
