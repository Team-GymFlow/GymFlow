const BASE = "http://localhost:5143/api";

export const getExercises = async () => {
  const res = await fetch(`${BASE}/exercises`);
  return res.json();
};
