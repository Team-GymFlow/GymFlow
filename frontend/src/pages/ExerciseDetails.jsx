import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExercises } from "../services/api";



export default function ExerciseDetails() {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    api.getExercise(id).then(setExercise);
  }, [id]);

  if (!exercise) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{exercise.name}</h1>
      <p><b>Muscle:</b> {exercise.muscleGroup}</p>
      <p><b>Difficulty:</b> {exercise.difficulty}</p>
      <p>{exercise.description}</p>
    </div>
  );
}
