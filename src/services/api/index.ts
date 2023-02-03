import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "http://localhost:3333"
    : "http://localhost:3333"
});

export async function authenticate(username: string, password: string): Promise<any> {
  const { data } = await api.post('/auth', { username, password });

  return data
}

export async function validateToken(token: string): Promise<any> {
  const { data } = await api.post('/auth/validate', { token });

  return data
}