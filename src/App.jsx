import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EquipmentManagement from "./pages/EquipmentManagement";
import Requests from "./pages/Requests";
import AddItem from "./pages/AddItem";

function AppContent() {
  const [user, setUser] = useState(null); // { username, role }
  const navigate = useNavigate();

  const handleLogin = (role, username) => {
    setUser({ username, role });
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/", { replace: true }); //redirects to root
    //window.location.href = "/";
  };

  return (
    <>
      {user && <Navbar userRole={user.role} />}
      <div style={{ padding: user ? "20px" : "0" }}>
        <Routes>
          {!user ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={<Dashboard currentUser={user.username} />}
              />
              <Route path="/requests" element={<Requests />} />
              {user.role === "admin" && (
                <>
                  <Route path="/equipment" element={<EquipmentManagement />} />
                  <Route path="/add-item" element={<AddItem />} />
                </>
              )}
              <Route path="/home" element={<Home />} />
            </>
          )}
        </Routes>

        {user && (
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "8px 16px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
