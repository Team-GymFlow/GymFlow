import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, createProject, deleteProject } from "../services/projectService";
import { getUsers } from "../services/userService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");           // string från <select>
  const [filterUserId, setFilterUserId] = useState(""); // "" = alla

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredProjects = useMemo(() => {
    if (!filterUserId) return projects;

    const id = Number(filterUserId);
    if (!Number.isFinite(id) || id <= 0) return projects;

    return projects.filter((p) => p.userId === id);
  }, [projects, filterUserId]);

  async function loadAll() {
    setLoading(true);
    setError("");

    try {
      const [projectsData, usersData] = await Promise.all([
        getProjects(),
        getUsers(),
      ]);

      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta data (projects/users)");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const parsedUserId = Number(userId);

    if (!trimmedName) {
      setError("Skriv ett projektnamn.");
      return;
    }

    if (!Number.isFinite(parsedUserId) || parsedUserId <= 0) {
      setError("Välj en användare.");
      return;
    }

    setError("");

    try {
      await createProject({ name: trimmedName, userId: parsedUserId });

      setName("");
      setUserId("");

      await loadAll();
    } catch (err) {
      console.error(err);
      setError("Kunde inte skapa project");
    }
  }

  async function handleDelete(projectId) {
    const ok = confirm("Ta bort projekt?");
    if (!ok) return;

    setError("");

    try {
      await deleteProject(projectId);
      await loadAll();
    } catch (err) {
      console.error(err);
      setError("Kunde inte ta bort project");
    }
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <h1>Projects</h1>

      {/* Create */}
      <form
        onSubmit={handleCreate}
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Projektets namn"
          style={{
            flex: "1 1 260px",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            flex: "1 1 220px",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        >
          <option value="">Välj user...</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
        >
          Skapa
        </button>
      </form>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <select
          value={filterUserId}
          onChange={(e) => setFilterUserId(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        >
          <option value="">Visa alla users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setFilterUserId("")}
          style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
        >
          Visa alla
        </button>
      </div>

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
        {filteredProjects.map((p) => (
          <li
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              border: "1px solid #e5e5e5",
              borderRadius: 10,
              gap: 10,
            }}
          >
            <span style={{ fontWeight: 700 }}>{p.name}</span>

            <div style={{ display: "flex", gap: 8 }}>
              <Link
                to={`/projects/${p.id}/tasks`}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Tasks
              </Link>

              <button
                onClick={() => handleDelete(p.id)}
                style={{ padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}
              >
                Ta bort
              </button>
            </div>
          </li>
        ))}
      </ul>

      {!loading && !error && filteredProjects.length === 0 && (
        <p style={{ opacity: 0.7, marginTop: 12 }}>Inga projekt matchar filtret.</p>
      )}
    </div>
  );
}
