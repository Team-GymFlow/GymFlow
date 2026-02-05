import { useEffect, useState } from "react";
import { getExercises } from "../services/api";
import { Link } from "react-router-dom";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises().then(setExercises);
  }, []);

  return (
    <div>
      <h1>Exercises</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {exercises.map((e) => (
          <Link
            key={e.id}
            to={`/exercises/${e.id}`}
            style={{
              background: "#111",
              padding: "1rem",
              borderRadius: "10px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <h3>{e.name}</h3>
            <p style={{ opacity: 0.6 }}>{e.muscleGroup}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
