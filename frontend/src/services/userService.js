import { api } from "./api";

const unwrap = (res) => res?.data ?? res;

export const getUsers = async () => unwrap(await api.get("/users"));
export const createUser = async (payload) => unwrap(await api.post("/users", payload));
export const updateUser = async (id, payload) => unwrap(await api.put(`/users/${Number(id)}`, payload));
export const deleteUser = async (id) => unwrap(await api.del(`/users/${Number(id)}`));
