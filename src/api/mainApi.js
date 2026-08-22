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

//Register Page
export const apiRegister = (body) => mainApi.post("/auth/register", body);

//Login Page
export const apiLogin = (body) => mainApi.post("/auth/login", body);

//Home Page
export const apiGetUser = (body) => mainApi.get("/users/me", body);
export const apiLiftRecords = (body) => mainApi.get("/lifts/me", body);
export const apiLeaderboard = (exerciseId, weightClassId, params = {}) =>
  mainApi.get(
    `/leaderboards/exercises/${exerciseId}/weight-classes/${weightClassId}`,
    { params },
  );
export const apiRandomLeaderboard = () => mainApi.get("/leaderboards/random");
export const apiCreateLiftRecord = (body) => mainApi.post("/lifts", body);
export const apiGetExercises = () => mainApi.get("/exercises");

//Profile Page
export const apiEditUser = (body) => mainApi.patch("/users/me", body);

//Leaderboard Page
export const apiGetWeightClasses = (gender) =>
  mainApi.get("/weight-classes", {
    params: {
      gender,
    },
  });

//Edit User Lift Record
export const apiEditLiftRecord = (id, body) =>
  mainApi.patch(`/lifts/${id}`, body);
export const apiDeleteLiftRecord = (id) => mainApi.delete(`/lifts/${id}`);
