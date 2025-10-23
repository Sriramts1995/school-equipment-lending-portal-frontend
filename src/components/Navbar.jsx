//src/components/Navbar.jsx
import { Link } from "react-router-dom";
export default function Navbar({ userRole }) {
  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#1976d2",
        color: "white",
        width: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: 1000,
      }}
    >
      <Link
        to="/dashboard"
        style={{ marginRight: "15px", color: "white", textDecoration: "none" }}
      >
        Dashboard
      </Link>

      {userRole === "admin" && (
        <Link
          to="/equipment"
          style={{
            marginRight: "15px",
            color: "white",
            textDecoration: "none",
          }}
        >
          Equipment
        </Link>
      )}

      {(userRole === "admin" || userRole === "staff") && (
        <Link to="/requests" style={{ color: "white", textDecoration: "none" }}>
          Requests
        </Link>
      )}
    </nav>
  );
}
