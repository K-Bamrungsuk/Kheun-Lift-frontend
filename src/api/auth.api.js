import api from "./axios";

export async function registerUser(username, email, password) {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function loginUser(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}
