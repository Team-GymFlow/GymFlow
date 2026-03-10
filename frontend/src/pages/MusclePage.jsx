import BodySvgFront from "../components/body/BodySvgFront";
import { useState, useEffect } from "react";
import { getExercisesByMuscle } from "../services/exerciseService";

const muscleNames = {
  1: "Chest",
  2: "Biceps",
  3: "Shoulders",
  4: "Triceps",
  5: "Back",
  6: "Quads",
  7: "Hamstrings",
  8: "Abs",
};

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let videoId = parsed.searchParams.get("v");
    if (!videoId && parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    }
    if (!videoId && url.includes("/embed/")) {
      videoId = url.split("/embed/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default function MusclePage() {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedMuscle || !difficulty) {
      setExercises([]);
      return;
    }

    const fetchExercises = async () => {
      try {
        setLoading(true);
        const data = await getExercisesByMuscle(selectedMuscle);
        const filtered = data.filter((e) => e.difficultyLevel === difficulty);
        setExercises(filtered);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedMuscle, difficulty]);

  const handleSelectMuscle = (id) => {
    setSelectedMuscle(id);
    setDifficulty(null);
    setExercises([]);
  };

  const difficultyLevels = [
    { level: 1, label: "Easy", color: "#22c55e" },
    { level: 2, label: "Medium", color: "#f59e0b" },
    { level: 3, label: "Hard", color: "#ef4444" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "80vh",
        padding: "2rem 1rem",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>
          Choose Your Muscle Group
        </h1>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {/* LEFT: SVG BODY */}
          <div
            style={{
              flex: "1 1 350px",
              background: "#181818",
              padding: "1.5rem",
              borderRadius: "16px",
              border: "1px solid #2a2a2a",
            }}
          >
            <BodySvgFront
              selectedId={selectedMuscle}
              hoveredId={hoveredMuscle}
              onSelect={handleSelectMuscle}
              onHover={setHoveredMuscle}
            />

            {hoveredMuscle && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "0.5rem",
                  color: "#a5b4fc",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                {muscleNames[hoveredMuscle] || `Muscle ${hoveredMuscle}`}
              </p>
            )}
          </div>

          {/* RIGHT: EXERCISES */}
          <div
            style={{
              flex: "1 1 500px",
              background: "#181818",
              padding: "1.5rem",
              borderRadius: "16px",
              border: "1px solid #2a2a2a",
            }}
          >
            {!selectedMuscle && (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <p style={{ color: "#888", fontSize: "1.1rem" }}>
                  Click on a muscle group to get started.
                </p>
              </div>
            )}

            {selectedMuscle && (
              <>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    color: "#a5b4fc",
                  }}
                >
                  {muscleNames[selectedMuscle] || "Exercises"}
                </h2>

                {/* Difficulty Buttons */}
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {difficultyLevels.map(({ level, label, color }) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      style={{
                        padding: "10px 22px",
                        borderRadius: "10px",
                        border: difficulty === level ? `2px solid ${color}` : "2px solid #333",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        background: difficulty === level ? color : "#1a1a1a",
                        color: difficulty === level ? "#fff" : "#aaa",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Loading */}
                {loading && (
                  <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
                    Loading exercises...
                  </p>
                )}

                {/* No difficulty selected */}
                {!difficulty && !loading && (
                  <p style={{ color: "#666", textAlign: "center", padding: "2rem" }}>
                    Select a difficulty level above.
                  </p>
                )}

                {/* Results */}
                {!loading && difficulty && exercises.length === 0 && (
                  <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
                    No exercises found for this combination.
                  </p>
                )}

                {!loading &&
                  exercises.map((exercise) => {
                    const embedUrl = getYouTubeEmbedUrl(exercise.youTubeUrl);

                    return (
                      <div
                        key={exercise.id}
                        style={{
                          background: "#111",
                          borderRadius: "12px",
                          marginBottom: "1.5rem",
                          overflow: "hidden",
                          border: "1px solid #2a2a2a",
                        }}
                      >
                        {/* YouTube Video */}
                        {embedUrl && (
                          <div
                            style={{
                              position: "relative",
                              paddingBottom: "56.25%",
                              height: 0,
                              overflow: "hidden",
                              background: "#000",
                            }}
                          >
                            <iframe
                              src={embedUrl}
                              title={exercise.name}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: "none",
                              }}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}

                        {/* Exercise Info */}
                        <div style={{ padding: "1rem 1.25rem" }}>
                          <h3
                            style={{
                              fontSize: "1.15rem",
                              marginBottom: "0.4rem",
                              color: "#fff",
                            }}
                          >
                            {exercise.name}
                          </h3>
                          {exercise.description && (
                            <p style={{ color: "#999", fontSize: "0.9rem", margin: 0 }}>
                              {exercise.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
