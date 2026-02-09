const BASE = "https://gymflow-35he.onrender.com/api";

export const getExercises = async () => {
  const res = await fetch(`${BASE}/exercises`);
  if (!res.ok) {
    throw new Error("Failed to fetch exercises");
  }

  const data = await res.json();

  // 🔧 ASP.NET Core / EF Core collection fix
  if (Array.isArray(data)) return data;
  if (data.$values) return data.$values;
  if (data.data) return data.data;

  console.error("Unexpected API shape:", data);
  return [];
};