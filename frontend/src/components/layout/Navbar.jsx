import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        backgroundColor: "#111",
        borderBottom: "1px solid #222",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          GymFlow
        </Link>

        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link style={linkStyle} to="/muscles">
            Muscles
          </Link>

          {isLoggedIn && (
            <Link style={linkStyle} to="/my-exercises">
              My Exercises
            </Link>
          )}

          {!isLoggedIn ? (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link to="/login" style={btnLogin}>
                Log in
              </Link>
              <Link to="/register" style={btnRegister}>
                Sign up
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ color: "#888", fontSize: "0.85rem" }}>
                {user?.name}
              </span>
              <button onClick={handleLogout} style={btnLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const linkStyle = {
  color: "#ccc",
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "color 0.2s",
};

const btnLogin = {
  color: "#2563eb",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: "600",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #2563eb",
};

const btnRegister = {
  backgroundColor: "#2563eb",
  color: "white",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: "600",
  padding: "6px 14px",
  borderRadius: "6px",
};

const btnLogout = {
  backgroundColor: "transparent",
  border: "1px solid #444",
  padding: "6px 14px",
  borderRadius: "6px",
  color: "#aaa",
  cursor: "pointer",
  fontSize: "0.85rem",
};
