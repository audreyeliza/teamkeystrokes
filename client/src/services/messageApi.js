// client/src/services/messageApi.js
import api from "./apiClient";

export async function getMessages(matchId) {
  const res = await api.get(`/messages/${matchId}`);
  return res.data; // { messages: [...] }
}

export async function sendMessage(matchId, text) {
  const res = await api.post(`/messages/${matchId}`, { text });
  return res.data; // { id }
}
