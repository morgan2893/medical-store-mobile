import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  baseURL: "https://medical-store-node.vercel.app/api/v1",
  timeout: 10000,
});

// Add auth token from Redux to every request
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
