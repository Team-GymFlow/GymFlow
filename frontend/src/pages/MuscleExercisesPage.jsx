import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExercisesByMuscle } from "../services/exerciseService";
import Card from "../components/ui/Card";

export default function MuscleExercisesPage() {
  const { muscleId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getExercisesByMuscle(muscleId);
        setExercises(data ?? []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [muscleId]);

  return (
    <div>
      <h1>Exercises</h1>

      {loading && <p>Loading...</p>}

      {!loading && exercises.length === 0 && (
        <p>No exercises for this muscle group.</p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {exercises.map((e) => (
          <Card key={e.id}>
            <div style={{ padding: 16 }}>
              <h3>{e.name}</h3>
              <p>{e.description ?? "No description"}</p>
              <small>Difficulty: {e.difficultyLevel}</small>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
