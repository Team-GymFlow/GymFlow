import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to GymFlow 💪</h1>

      <p>Your personal workout planner.</p>

      <Link to="/exercises">
        <button>Browse Exercises</button>
      </Link>
    </div>
  );
}
