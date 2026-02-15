import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Navbar() {
  const { isLoggedIn, login, logout } = useAuth();

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
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          GymFlow
        </Link>

        {/* Right side */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link style={{ color: "#ccc" }} to="/muscles">
            Muscles
          </Link>

          {isLoggedIn && (
            <Link style={{ color: "#ccc" }} to="/my-exercises">
              My Exercises
            </Link>
          )}

          {!isLoggedIn ? (
            <button
              onClick={login}
              style={{
                backgroundColor: "#2563eb",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              style={{
                backgroundColor: "#dc2626",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
