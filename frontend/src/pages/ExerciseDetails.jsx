import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../services/exerciseService";

function difficultyLabel(value) {
  const v = Number(value);
  if (v === 0) return "Easy";
  if (v === 1) return "Medium";
  if (v === 2) return "Hard";
  return `Level ${v}`;
}

export default function ExerciseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const exerciseId = useMemo(() => Number(id), [id]);

  const [exercise, setExercise] = useState(null);

  // edit state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    if (!Number.isFinite(exerciseId) || exerciseId <= 0) {
      setLoading(false);
      setError("Ogiltigt id.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getExerciseById(exerciseId);
      setExercise(data);

      // fyll edit-formen
      setName(data?.name ?? "");
      setDescription(data?.description ?? "");
      setDifficultyLevel(Number(data?.difficultyLevel ?? 0));
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta övningen.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId]);

  async function handleSave(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDesc = description.trim();

    if (!trimmedName) {
      setError("Namn är obligatoriskt.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateExercise(exerciseId, {
        name: trimmedName,
        description: trimmedDesc ? trimmedDesc : null,
        difficultyLevel: Number(difficultyLevel),
      });

      await load();
    } catch (err) {
      console.error(err);
      setError("Kunde inte uppdatera övningen.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const ok = confirm("Ta bort denna övning?");
    if (!ok) return;

    setError("");

    try {
      await deleteExercise(exerciseId);
      navigate("/exercises");
    } catch (err) {
      console.error(err);
      setError("Kunde inte ta bort övningen.");
    }
  }

  if (loading) return <p>Laddar...</p>;

  return (
    <div style={{ maxWidth: 800 }}>
      <Link to="/exercises" style={{ textDecoration: "none" }}>
        ← Tillbaka
      </Link>

      <h1 style={{ marginTop: 12 }}>Exercise Details</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {exercise && (
        <div
          style={{
            marginTop: 12,
            padding: 14,
            border: "1px solid #e5e5e5",
            borderRadius: 12,
          }}
        >
          <div style={{ opacity: 0.7, fontSize: 12 }}>
            Id: {exercise.id} • Difficulty:{" "}
            {difficultyLabel(exercise.difficultyLevel)}
          </div>

          <form onSubmit={handleSave} style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Namn</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
            </div>

            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Description</div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Valfritt"
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
            </div>

            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Difficulty</div>
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              >
                <option value={0}>Easy</option>
                <option value={1}>Medium</option>
                <option value={2}>Hard</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="submit"
                disabled={saving}
                style={{ padding: "10px 14px", borderRadius: 8, cursor: "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Sparar..." : "Spara"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                style={{ padding: "10px 14px", borderRadius: 8, cursor: "pointer" }}
              >
                Ta bort
              </button>
            </div>
          </form>
        </div>
      )}

      {!exercise && !error && <p>Ingen övning hittades.</p>}
    </div>
  );
}
