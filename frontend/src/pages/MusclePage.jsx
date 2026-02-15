import BodySvgFront from "../components/body/BodySvgFront";
import { useState, useEffect } from "react";
import { getExercisesByMuscle } from "../services/exerciseService";

export default function MusclePage() {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch exercises when muscle + difficulty selected
  useEffect(() => {
    if (!selectedMuscle || !difficulty) {
      setExercises([]);
      return;
    }

    const fetchExercises = async () => {
      try {
        setLoading(true);

        const data = await getExercisesByMuscle(selectedMuscle);

        const filtered = data.filter(
          (e) => e.difficultyLevel === difficulty
        );

        setExercises(filtered);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedMuscle, difficulty]);

  const difficultyButtonStyle = (level) => ({
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    background: difficulty === level ? "#2563eb" : "#222",
    color: difficulty === level ? "white" : "#aaa",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "80vh",
        padding: "2rem 0",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
          Muscles
        </h1>

        <div style={{ display: "flex", gap: "2rem" }}>
          {/* LEFT SVG PANEL */}
          <div
            style={{
              flex: 1,
              background: "#181818",
              padding: "1.5rem",
              borderRadius: "12px",
            }}
          >
            <BodySvgFront
              selectedId={selectedMuscle}
              hoveredId={hoveredMuscle}
              onSelect={setSelectedMuscle}
              onHover={setHoveredMuscle}
            />

            <div style={{ marginTop: "1rem", color: "#888" }}>
              Hovered: {hoveredMuscle || "-"} <br />
              Selected: {selectedMuscle || "-"}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              flex: 1,
              background: "#181818",
              padding: "1.5rem",
              borderRadius: "12px",
            }}
          >
            <h2>Exercises</h2>

            {!selectedMuscle && (
              <p style={{ color: "#888" }}>
                Klicka på en muskel i kroppen.
              </p>
            )}

            {selectedMuscle && (
              <>
                {/* Difficulty Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    style={difficultyButtonStyle(1)}
                    onClick={() => setDifficulty(1)}
                  >
                    Easy
                  </button>

                  <button
                    style={difficultyButtonStyle(2)}
                    onClick={() => setDifficulty(2)}
                  >
                    Medium
                  </button>

                  <button
                    style={difficultyButtonStyle(3)}
                    onClick={() => setDifficulty(3)}
                  >
                    Hard
                  </button>
                </div>

                {/* Loading */}
                {loading && (
                  <p style={{ marginTop: "2rem", color: "#888" }}>
                    Loading exercises...
                  </p>
                )}

                {/* Results */}
                {!loading && difficulty && (
                  <div style={{ marginTop: "2rem" }}>
                    {exercises.length === 0 && (
                      <p style={{ color: "#888" }}>
                        No exercises found.
                      </p>
                    )}

                    {exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        style={{
                          background: "#222",
                          padding: "1rem",
                          borderRadius: "8px",
                          marginBottom: "1rem",
                        }}
                      >
                        <h3 style={{ marginBottom: "0.5rem" }}>
                          {exercise.name}
                        </h3>
                        <p style={{ color: "#aaa" }}>
                          {exercise.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
