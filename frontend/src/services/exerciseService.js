import { api } from "./api";

function toId(value) {
  const id = Number(value);
  if (!Number.isFinite(id) || id <= 0) throw new Error("Invalid id");
  return id;
}

function unwrap(res) {
  return res?.data ?? res; // funkar om api returnerar response eller data
}

function normalizeExercisePayload(payload) {
  const name = String(payload?.name ?? "").trim();

  const descriptionRaw = payload?.description;
  const description =
    descriptionRaw === null || descriptionRaw === undefined
      ? null
      : String(descriptionRaw).trim() || null;

  const difficultyLevel = Number(payload?.difficultyLevel);

  if (!name) throw new Error("Name is required");
  if (![1, 2, 3].includes(difficultyLevel))
    throw new Error("DifficultyLevel must be 1..3");

  return { name, description, difficultyLevel };
}

export const getExercises = async () => unwrap(await api.get("/exercises"));
export const getExerciseById = async (id) => unwrap(await api.get(`/exercises/${toId(id)}`));

export const createExercise = async (payload) =>
  unwrap(await api.post("/exercises", normalizeExercisePayload(payload)));

export const updateExercise = async (id, payload) =>
  unwrap(await api.put(`/exercises/${toId(id)}`, normalizeExercisePayload(payload)));

export const deleteExercise = async (id) =>
  unwrap(await api.del(`/exercises/${toId(id)}`));

export const getExercisesByMuscleGroup = async (muscleGroupId) => {
  const res = await api.get(`/exercises/by-muscle/${Number(muscleGroupId)}`);
  return res?.data ?? res;
};
export const getExercisesByMuscle = (muscleId) =>
  api.get(`/exercises/by-muscle/${muscleId}`);

