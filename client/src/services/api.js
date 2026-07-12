import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000"),
  timeout: 30000,
});

export async function researchCompany(company) {
  const response = await api.post("/api/research", { company });
  return response.data;
}

export async function validateCompany(company) {
  const response = await api.get(`/api/research/validate`, { params: { company } });
  return response.data.isValid;
}

export default api;
