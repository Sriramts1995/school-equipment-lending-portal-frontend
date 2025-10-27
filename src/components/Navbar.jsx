// src/components/Navbar.jsx
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
      {/* ADMIN → Equipments + Requests */}
      {userRole === "admin" && (
        <>
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
          <Link
            to="/requests"
            style={{
              marginRight: "15px",
              color: "white",
              textDecoration: "none",
            }}
          >
            Requests
          </Link>
        </>
      )}

      {/* USER → Dashboard only */}
      {userRole === "user" && (
        <Link
          to="/dashboard"
          style={{
            marginRight: "15px",
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>
      )}

      {/* STAFF → Requests only */}
      {userRole === "staff" && (
        <Link
          to="/requests"
          style={{
            marginRight: "15px",
            color: "white",
            textDecoration: "none",
          }}
        >
          Requests
        </Link>
      )}
    </nav>
  );
}
