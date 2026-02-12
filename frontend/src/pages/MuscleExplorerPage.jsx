import { useState } from "react";
import Card from "../components/ui/Card";
import BodySvgFront from "../components/body/BodySvgFront";
import { getExercisesByMuscleGroup } from "../services/exerciseService";

export default function MuscleExplorerPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSelect(id) {
    setSelectedId(id);
    setLoading(true);
    setError("");

    try {
      const data = await getExercisesByMuscleGroup(id);
      setExercises(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("Kunde inte hämta exercises för muskelgruppen.");
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <h1 style={{ margin: 0 }}>Muscles</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <div style={{ padding: 14 }}>
            <BodySvgFront
              selectedId={selectedId}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onSelect={handleSelect}
            />
            <div style={{ marginTop: 10, opacity: 0.7, fontSize: 13 }}>
              Hover: {hoveredId ?? "-"} • Selected: {selectedId ?? "-"}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 14 }}>
            <h2 style={{ marginTop: 0 }}>Exercises</h2>

            {error && <p style={{ color: "crimson" }}>{error}</p>}
            {loading && <p style={{ opacity: 0.7 }}>Loading…</p>}

            {!loading && !error && selectedId && exercises.length === 0 && (
              <p style={{ opacity: 0.7 }}>Inga exercises för denna muskel.</p>
            )}

            <div style={{ display: "grid", gap: 10 }}>
              {exercises.map((e) => (
                <div
                  key={e.id}
                  style={{
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{e.name}</div>
                  {e.description && (
                    <div style={{ opacity: 0.75, marginTop: 4 }}>
                      {e.description}
                    </div>
                  )}
                  <div style={{ opacity: 0.6, fontSize: 12, marginTop: 6 }}>
                    Difficulty: {e.difficultyLevel}
                  </div>
                </div>
              ))}
            </div>

            {!selectedId && (
              <p style={{ opacity: 0.7 }}>Klicka på en muskel i kroppen.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
