import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const mainApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

mainApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const apiRegister = (body) => mainApi.post("/auth/register", body);

export const apiLogin = (body) => mainApi.post("/auth/login", body);

export const apiGetUser = (body) => mainApi.get("/users/me", body);
export const apiLiftRecords = (body) => mainApi.get("/lifts/me", body);
export const apiLeaderboard = (exerciseId, weightClassId, params = {}) =>
  mainApi.get(
    `/leaderboards/exercises/${exerciseId}/weight-classes/${weightClassId}`,
    { params },
  );
