// client/src/services/matchApi.js
import api from "./apiClient";

export async function createMatch(tutorId) {
  const res = await api.post("/matches/", { tutor_id: tutorId });
  return res.data; // { id }
}

export async function getMyMatches() {
  const res = await api.get("/matches/me");
  return res.data; // { matches: [...] }
}

// status: "accepted" | "declined"
export async function updateMatch(matchId, status) {
  const res = await api.patch(`/matches/${matchId}`, { status });
  return res.data;
}
