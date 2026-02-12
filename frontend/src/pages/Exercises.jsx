import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getExercises,
  createExercise,
  deleteExercise,
} from "../services/exerciseService";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getExercises();
      setExercises(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta exercises");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    const lvl = Number(difficultyLevel);

    if (!trimmedName) return setError("Skriv ett namn.");
    if (![1, 2, 3].includes(lvl)) return setError("Välj difficulty (1–3).");

    setError("");

    try {
      await createExercise({
        name: trimmedName,
        description: trimmedDesc ? trimmedDesc : null,
        difficultyLevel: lvl,
      });

      setName("");
      setDescription("");
      setDifficultyLevel(1);
      await load();
    } catch (err) {
      console.error(err);
      setError("Kunde inte skapa exercise");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Ta bort övning?")) return;

    try {
      await deleteExercise(id);
      await load();
    } catch (err) {
      console.error(err);
      setError("Kunde inte ta bort exercise");
    }
  }

  function difficultyLabel(value) {
    const v = Number(value);
    if (v === 1) return "Easy";
    if (v === 2) return "Medium";
    if (v === 3) return "Hard";
    return `Level ${v}`;
  }

  return (
    <div style={{ maxWidth: 1000 }}>
      <h1>Exercises</h1>

      {/* CREATE FORM */}
      <form
        onSubmit={handleCreate}
        style={{
          display: "grid",
          gap: 8,
          marginBottom: 20,
          gridTemplateColumns: "1fr 1fr 160px 120px",
          alignItems: "center",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Namn"
          style={{ padding: 10, borderRadius: 8 }}
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ padding: 10, borderRadius: 8 }}
        />

        <select
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(Number(e.target.value))}
          style={{ padding: 10, borderRadius: 8 }}
        >
          <option value={1}>Easy</option>
          <option value={2}>Medium</option>
          <option value={3}>Hard</option>
        </select>

        <button type="submit" style={{ padding: "10px 14px" }}>
          Skapa
        </button>
      </form>

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {/* LIST */}
      <div style={{ display: "grid", gap: 14 }}>
        {exercises.map((e) => (
          <div
            key={e.id}
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: 16,
              display: "grid",
              gridTemplateColumns: e.imageUrl ? "120px 1fr auto" : "1fr auto",
              gap: 16,
              alignItems: "center",
            }}
          >
            {/* IMAGE */}
            {e.imageUrl && (
              <img
                src={e.imageUrl}
                alt={e.name}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            )}

            {/* INFO */}
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>
                <Link
                  to={`/exercises/${e.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {e.name}
                </Link>
              </div>

              {e.description && (
                <div style={{ opacity: 0.75, marginTop: 6 }}>
                  {e.description}
                </div>
              )}

              <div style={{ opacity: 0.6, fontSize: 13, marginTop: 6 }}>
                Difficulty: {difficultyLabel(e.difficultyLevel)}
              </div>

              {/* ✅ YOUTUBE LINK */}
              {e.youTubeUrl && (
                <div style={{ marginTop: 8 }}>
                  <a
                    href={e.youTubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#4f46e5",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    ▶ Watch on YouTube
                  </a>
                </div>
              )}
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(e.id)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Ta bort
            </button>
          </div>
        ))}
      </div>

      {!loading && !error && exercises.length === 0 && (
        <p style={{ opacity: 0.7, marginTop: 12 }}>Inga exercises ännu.</p>
      )}
    </div>
  );
}
