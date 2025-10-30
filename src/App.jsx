import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EquipmentManagement from "./pages/EquipmentManagement";
import Requests from "./pages/Requests";
import ItemManagement from "./pages/ItemManagement";
import ItemBookings from "./pages/ItemBookings";

// 🔹 Import API function
import { logoutUser } from "./services/api";

function AppContent() {
  const [user, setUser] = useState(null); // { username, role }
  const navigate = useNavigate();

  const handleLogin = (role, username, name, email) => {
    setUser({ username, role, name, email });
  };

  // 🔹 Updated logout handler using API
  const handleLogout = async () => {
    try {
      const message = await logoutUser();
      alert(message || "Logout successful");
    } catch (error) {
      alert("Logout failed. Please try again.");
    } finally {
      // clear local state and redirect
      setUser(null);
      localStorage.removeItem("loginid");
      localStorage.removeItem("authToken");
      localStorage.removeItem("uname");
      navigate("/", { replace: true });
    }
  };

  // Decide default landing page
  const getLandingRoute = () => {
    if (user.role === "admin") return "/equipment";
    if (user.role === "staff") return "/requests";
    return "/dashboard"; // default for normal users
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
              {/* Dynamic landing route */}
              <Route
                path="/"
                element={<Navigate to={getLandingRoute()} replace />}
              />

              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    currentUser={user.username}
                    userid={localStorage.getItem("loginid")}
                  />
                }
              />
              <Route path="/requests" element={<Requests />} />

              {user.role === "admin" && (
                <>
                  <Route path="/equipment" element={<EquipmentManagement />} />
                  <Route path="/itemmanagement" element={<ItemManagement />} />
                </>
              )}

              <Route path="/home" element={<Home />} />
              <Route path="/itembookings" element={<ItemBookings />} />
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
