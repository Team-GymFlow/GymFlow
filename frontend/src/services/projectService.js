import { api } from "./api";

export async function getProjects() {
  const res = await api.get("/api/Projects");
  return res.data;
}

export async function createProject(payload) {
  const res = await api.post("/api/Projects", payload);
  return res.data;
}

export async function deleteProject(id) {
  await api.delete(`/api/Projects/${id}`);
}
