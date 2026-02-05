import { useEffect, useState } from "react";
import { getExercises } from "../services/api";
import { Link } from "react-router-dom";

const Exercises = () => {
  console.log("🔥 EXERCISES COMPONENT RENDERED");

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
  getExercises().then(data => {
    console.log("EXERCISES FROM API:", data);
    setExercises(data);
  });
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

            {/* Backend skickar description + difficultyLevel */}
            <p style={{ opacity: 0.6 }}>{e.description}</p>
            <small style={{ opacity: 0.4 }}>{e.difficultyLevel}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
