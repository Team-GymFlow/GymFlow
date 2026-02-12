import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  marginRight: "1rem",
  textDecoration: "none",
  color: isActive ? "#4f46e5" : "inherit",
  fontWeight: isActive ? "bold" : "normal",
});

const Navbar = () => {
  return (
    <nav
      style={{
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        GymFlow
      </span>

      <div>
        <NavLink to="/" end style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/projects" style={linkStyle}>
          Projects
        </NavLink>
        <NavLink to="/users" style={linkStyle}>
          Users
        </NavLink>
        <NavLink to="/exercises" style={linkStyle}>
          Exercises
        </NavLink>
        <NavLink to="/muscles" style={linkStyle}>
          Muscles
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
