const BASE = "https://gymflow-35he.onrender.com/api";

export const getExercises = async () => {
  const res = await fetch(`${BASE}/exercises`);
  return res.json();
};
