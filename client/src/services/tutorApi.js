// client/src/services/tutorApi.js
import api from "./apiClient";

export async function saveTutorProfile(payload) {
  // tutor-only; payload: { subjects, hourly_rate, age_groups, city, zip, bio, is_active }
  const res = await api.post("/tutors/profile", payload);
  return res.data;
}

export async function toggleTutorActive(isActive) {
  const res = await api.patch("/tutors/profile/active", { is_active: isActive });
  return res.data;
}

export async function getMyTutorProfile() {
  const res = await api.get("/tutors/me");
  return res.data;
}

export async function searchTutors(params) {
  // params: { city, zip, subject, ageGroup, minRate, maxRate }
  const res = await api.get("/tutors/search", { params });
  return res.data; // { tutors: [...] }
}
