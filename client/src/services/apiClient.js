// client/src/services/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Flask base URL
});

// Attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
