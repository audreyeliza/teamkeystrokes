// client/src/services/authApi.js
import api from "./apiClient";

export async function registerUser(payload) {
  // payload: { name, email, password, role, city, zip }
  const res = await api.post("/auth/register", payload);
  return res.data; // { access_token, user, subjects, age_groups }
}

export async function loginUser(payload) {
  // payload: { email, password }
  const res = await api.post("/auth/login", payload);
  return res.data; // { access_token, user }
}
