import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExercises } from "../services/exerciseService";
import { getProjects } from "../services/projectService";
import { getUsers } from "../services/userService";

export default function HomePage() {
  const [counts, setCounts] = useState({ exercises: 0, projects: 0, users: 0 });
  const [latestExercises, setLatestExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [ex, pr, us] = await Promise.all([
        getExercises(),
        getProjects(),
        getUsers(),
      ]);

      const exArr = Array.isArray(ex) ? ex : [];
      const prArr = Array.isArray(pr) ? pr : [];
      const usArr = Array.isArray(us) ? us : [];

      setCounts({
        exercises: exArr.length,
        projects: prArr.length,
        users: usArr.length,
      });

      setLatestExercises(exArr.slice(-5).reverse());
    } catch (e) {
      console.error(e);
      setError("Kunde inte ladda dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const boxStyle = {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: 14,
    background: "rgba(255,255,255,0.02)",
  };

  const primaryBtn = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        <h1 style={{ fontSize: 44, margin: 0, fontWeight: 900 }}>
          Welcome to GymFlow 💪
        </h1>
        <p style={{ opacity: 0.8, margin: 0 }}>
          Your personal workout planner — build exercises, manage projects and keep
          things organized.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          <Link to="/exercises" style={primaryBtn}>Browse Exercises</Link>
          <Link to="/projects" style={primaryBtn}>Go to Projects</Link>
        </div>

        {error && <p style={{ color: "crimson", marginTop: 6 }}>{error}</p>}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
          marginTop: 18,
        }}
      >
        <div style={boxStyle}>
          <div style={{ opacity: 0.75, fontSize: 13 }}>Exercises</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>
            {loading ? "…" : counts.exercises}
          </div>
          <div style={{ marginTop: 8 }}>
            <Link to="/exercises">Open →</Link>
          </div>
        </div>

        <div style={boxStyle}>
          <div style={{ opacity: 0.75, fontSize: 13 }}>Projects</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>
            {loading ? "…" : counts.projects}
          </div>
          <div style={{ marginTop: 8 }}>
            <Link to="/projects">Open →</Link>
          </div>
        </div>

        <div style={boxStyle}>
          <div style={{ opacity: 0.75, fontSize: 13 }}>Users</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>
            {loading ? "…" : counts.users}
          </div>
          <div style={{ marginTop: 8 }}>
            <Link to="/users">Open →</Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
        <div style={boxStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Latest exercises</h2>
            <Link to="/exercises">See all</Link>
          </div>

          {loading ? (
            <p style={{ opacity: 0.7, marginTop: 12 }}>Loading…</p>
          ) : latestExercises.length === 0 ? (
            <p style={{ opacity: 0.7, marginTop: 12 }}>No exercises yet.</p>
          ) : (
            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              {latestExercises.map((e) => (
                <div
                  key={e.id}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{e.name}</div>
                    {e.description && (
                      <div style={{ opacity: 0.7, fontSize: 13 }}>
                        {e.description}
                      </div>
                    )}
                  </div>
                  <Link to={`/exercises/${e.id}`}>Open</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
