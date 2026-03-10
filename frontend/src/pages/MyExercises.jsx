import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function MyExercises() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ minHeight: "70vh", padding: "2rem 0" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
        My Saved Exercises
      </h1>
      <p style={{ color: "#888" }}>
        Your favorite exercises will appear here.
      </p>
    </div>
  );
}
