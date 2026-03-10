import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/muscles");
    } catch (err) {
      setError("Wrong email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Log in</h2>
        <p style={styles.subtitle}>Welcome back to GymFlow</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p style={styles.link}>
          No account? <Link to="/register" style={styles.linkA}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "75vh",
  },
  card: {
    background: "#181818",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    margin: "0 0 0.3rem 0",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#888",
    margin: "0 0 2rem 0",
    fontSize: "0.9rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "500",
    color: "#ccc",
  },
  input: {
    padding: "0.8rem 1rem",
    border: "1.5px solid #333",
    borderRadius: "10px",
    fontSize: "0.95rem",
    background: "#111",
    color: "white",
    outline: "none",
    fontFamily: "inherit",
  },
  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "0.85rem",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  error: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.2)",
    color: "#f87171",
    padding: "0.7rem",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "0.88rem",
  },
  link: {
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#888",
    fontSize: "0.88rem",
  },
  linkA: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },
};
