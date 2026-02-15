import { Link } from "react-router-dom";
import gymBg from "../assets/gym.jpg"; // använd din gymbild här

export default function Landing() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        backgroundColor: "#0f0f0f",
        color: "white",
      }}
    >
      {/* BACKGROUND IMAGE */}
     <img
  src={gymBg}
  alt="gym background"
  style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.15,
    zIndex: 0,
    pointerEvents: "none", // 🔥 DETTA FIXAR HOVER
  }}
/>


      {/* BIG BACKGROUND TEXT */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "8rem",
          fontWeight: "900",
          color: "rgba(255,255,255,0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        TRAIN HARD
      </div>

      {/* HERO CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              fontWeight: "800",
            }}
          >
            GymFlow
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#ccc",
              marginBottom: "1.5rem",
              lineHeight: "1.6",
            }}
          >
            Train smarter. Move better.
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "#999",
              marginBottom: "2.5rem",
            }}
          >
            Explore muscles, discover exercises, choose difficulty level
            and save your favorites to build your own training flow.
          </p>

          <Link
            to="/muscles"
            style={{
              padding: "14px 36px",
              backgroundColor: "#2563eb",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              color: "white",
              fontSize: "1rem",
              boxShadow: "0 0 15px rgba(37,99,235,0.6)",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              (e.target.style.boxShadow =
                "0 0 25px rgba(37,99,235,0.9)")
            }
            onMouseLeave={(e) =>
              (e.target.style.boxShadow =
                "0 0 15px rgba(37,99,235,0.6)")
            }
          >
            Let’s Start
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "1.5rem",
          borderTop: "1px solid #222",
          color: "#777",
        }}
      >
        © {new Date().getFullYear()} GymFlow
      </footer>
    </div>
  );
}
