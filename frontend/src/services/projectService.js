import { api } from "./api";

const unwrap = (res) => res?.data ?? res;

export const getProjects = async () => unwrap(await api.get("/projects"));
export const createProject = async (payload) => unwrap(await api.post("/projects", payload));
export const updateProject = async (id, payload) => unwrap(await api.put(`/projects/${Number(id)}`, payload));
export const deleteProject = async (id) => unwrap(await api.del(`/projects/${Number(id)}`));
