import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../services/userService";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Kunde inte hämta users");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Skriv ett namn");
      return;
    }

    if (!trimmedEmail) {
      setError("Skriv en email");
      return;
    }

    // superenkel email-check (inte perfekt, men bra nog för nu)
    if (!trimmedEmail.includes("@")) {
      setError("Email ser inte korrekt ut");
      return;
    }

    try {
      setSaving(true);
      await createUser({ name: trimmedName, email: trimmedEmail });

      setName("");
      setEmail("");

      await loadUsers();
    } catch (e) {
      setError("Kunde inte skapa user");
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const ok = confirm("Ta bort user?");
    if (!ok) return;

    setError("");

    try {
      await deleteUser(id);
      await loadUsers();
    } catch (e) {
      setError("Kunde inte ta bort user");
      console.error(e);
    }
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h1>Users</h1>

      <form
        onSubmit={handleCreate}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: 10,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Namn"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Sparar..." : "Skapa"}
        </button>
      </form>

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul style={{ display: "grid", gap: 10, padding: 0, listStyle: "none" }}>
        {users.map((u) => (
          <li
            key={u.id}
            style={{
              border: "1px solid #333",
              borderRadius: 12,
              padding: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{u.name}</div>
              <div style={{ opacity: 0.75 }}>{u.email}</div>
              <div style={{ opacity: 0.5, fontSize: 12 }}>Id: {u.id}</div>
            </div>

            <button
              onClick={() => handleDelete(u.id)}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
