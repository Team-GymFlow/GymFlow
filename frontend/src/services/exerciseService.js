import { api } from "./api";

/* ----- Helpers ------ */

function toId(value) {
  const id = Number(value);
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error("Invalid id");
  }
  return id;
}

function unwrap(res) {
  return res?.data ?? res;
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
  if (![1, 2, 3].includes(difficultyLevel)) {
    throw new Error("difficultyLevel must be 1, 2 or 3");
  }

  return {
    name,
    description,
    difficultyLevel,
  };
}

/* ------CRUD ------ */

export const getExercises = async () =>
  unwrap(await api.get("/exercises"));

export const getExerciseById = async (id) =>
  unwrap(await api.get(`/exercises/${toId(id)}`));

export const createExercise = async (payload) =>
  unwrap(
    await api.post(
      "/exercises",
      normalizeExercisePayload(payload)
    )
  );

export const updateExercise = async (id, payload) =>
  unwrap(
    await api.put(
      `/exercises/${toId(id)}`,
      normalizeExercisePayload(payload)
    )
  );

export const deleteExercise = async (id) =>
  unwrap(await api.delete(`/exercises/${toId(id)}`));

/* ------- By Muscle ------ */

export const getExercisesByMuscle = async (muscleId) => {
  if (!muscleId) return [];

  const res = await api.get(
    `/exercises/by-muscle/${toId(muscleId)}`
  );

  return unwrap(res);
};
