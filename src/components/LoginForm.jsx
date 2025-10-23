// src/components/LoginForm.jsx
import { useState } from "react";
import { users } from "../services/api";
import schoolEquipment from "C:/Users/Sriram/school-equipment-portal/src/assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track if signup fields should appear

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const buttonId = e.nativeEvent.submitter.id;

    if (buttonId === "sign-in") {
      // Show the extra signup fields without validating username/password yet
      setIsSignUp(true);
      return;
    }

    if (buttonId === "cancel") {
      setIsSignUp(false);
      setName("");
      setEmail("");
      setMobile("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      return;
    }

    // Login logic
    if (!isSignUp) {
      if (!username || !password) {
        setError("Please enter username and password");
        return;
      }

      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        onLogin(user.role, user.username);
        setError("");
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } else {
      // Signup logic
      if (
        !name ||
        !email ||
        !mobile ||
        !username ||
        !password ||
        !confirmPassword
      ) {
        setError("All fields are required for signup");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Simulate registration
      alert(
        `User registered!\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nUsername: ${username}`
      );

      // Reset form
      setIsSignUp(false);
      setName("");
      setEmail("");
      setMobile("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ flex: "1", textAlign: "center" }}>
        <img
          src={schoolEquipment}
          alt="School Equipment"
          style={{
            width: "80%",
            maxWidth: "600px",
            marginTop: "0px",
            borderRadius: "8px",
          }}
        />
      </div>
      <div style={{ flex: "1", maxWidth: "300px" }}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="tel"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={!isSignUp} // ✅ only required in login mode
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!isSignUp} // ✅ only required in login mode
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "50px",
              height: "10vh",
              padding: "0px",
            }}
          >
            <button
              id="login"
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#081711ff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isSignUp ? "Register" : "Login"}
            </button>

            {isSignUp && (
              <button
                id="cancel"
                type="button" // <-- change here
                onClick={() => {
                  setIsSignUp(false);
                  setName("");
                  setEmail("");
                  setMobile("");
                  setUsername("");
                  setPassword("");
                  setConfirmPassword("");
                  setError("");
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#081711ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}

            {!isSignUp && (
              <button
                id="sign-in"
                type="submit"
                formNoValidate
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#081711ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
