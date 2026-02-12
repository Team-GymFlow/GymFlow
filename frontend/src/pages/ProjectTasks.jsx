import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getTasksByProjectId,
  createTask,
  deleteTask,
} from "../services/taskService";

export default function ProjectTasks() {
  const { projectId } = useParams();

  const parsedProjectId = useMemo(() => Number(projectId), [projectId]);
  const isValidProjectId =
    Number.isFinite(parsedProjectId) && parsedProjectId > 0;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    if (!isValidProjectId) {
      setLoading(false);
      setTasks([]);
      setError("Ogiltigt projectId i URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getTasksByProjectId(parsedProjectId);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedProjectId]);

  async function handleCreate(e) {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    if (!isValidProjectId) {
      setError("Ogiltigt projectId.");
      return;
    }

    setError("");

    try {
      await createTask({
        title: trimmed,
        description: null,
        projectId: parsedProjectId,
      });

      setTitle("");
      await load();
    } catch (err) {
      console.error(err);
      setError("Kunde inte skapa task");
    }
  }

  async function handleDelete(id) {
    const ok = confirm("Ta bort task?");
    if (!ok) return;

    setError("");

    try {
      await deleteTask(id);
      await load();
    } catch (err) {
      console.error(err);
      setError("Kunde inte ta bort task");
    }
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <Link to="/projects" style={{ textDecoration: "none" }}>
        ← Tillbaka till Projects
      </Link>

      <h1 style={{ marginTop: 12 }}>Tasks</h1>

      <form
        onSubmit={handleCreate}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ny task..."
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={!title.trim() || !isValidProjectId}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
            opacity: !title.trim() || !isValidProjectId ? 0.6 : 1,
          }}
        >
          Skapa
        </button>
      </form>

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              border: "1px solid #e5e5e5",
              borderRadius: 10,
            }}
          >
            <span style={{ fontWeight: 700 }}>{t.title ?? "Task"}</span>

            <button
              onClick={() => handleDelete(t.id)}
              style={{ padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>

      {!loading && !error && tasks.length === 0 && (
        <p style={{ opacity: 0.7, marginTop: 12 }}>
          Inga tasks för detta projekt.
        </p>
      )}
    </div>
  );
}
