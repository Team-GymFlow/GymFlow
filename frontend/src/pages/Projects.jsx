import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      setError("Kunde inte hämta projects");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createProject({ name });
      setName("");
      loadProjects();
    } catch (e) {
      setError("Kunde inte skapa project");
      console.error(e);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Ta bort projekt?")) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch (e) {
      setError("Kunde inte ta bort project");
      console.error(e);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Projects</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: 12 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Projektets namn"
        />
        <button type="submit">Skapa</button>
      </form>

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => handleDelete(p.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
