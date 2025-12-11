import React, { useState } from "react";
import "./AuthPage.css";

function AuthPage({ onLogin, onRegister, farmers = [] }) {
  const [mode, setMode] = useState("login");

  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "FARMER",
    farmerId: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "FARMER",
  });

  const [error, setError] = useState("");

  /* ---------- PASSWORD VALIDATION ---------- */
  const isValidPassword = (pwd) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  /* ---------- GENERATE UNIQUE FARMER ID ---------- */
  const generateFarmerId = (existingFarmers) => {
    const ids = existingFarmers.map((f) => f.farmerId);
    const numbers = ids.map((id) => parseInt(id.replace("F", ""), 10));
    const max = numbers.length > 0 ? Math.max(...numbers) : 0;
    const newNumber = max + 1;
    return `F${String(newNumber).padStart(3, "0")}`;
  };

  /* ---------- LOGIN ---------- */
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!loginForm.username || !loginForm.email || !loginForm.password) {
      setError("Please enter username, email, and password.");
      return;
    }

    if (loginForm.role === "FARMER" && !loginForm.farmerId.trim()) {
      setError("Please enter your Farmer ID.");
      return;
    }

    const ok = onLogin(loginForm);
    if (!ok) setError("Invalid credentials, role, or Farmer ID.");
  };

  /* ---------- REGISTER ---------- */
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !registerForm.username ||
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (!isValidPassword(registerForm.password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Generate Farmer ID for FARMER role
    let farmerId = "";
    if (registerForm.role === "FARMER") {
      farmerId = generateFarmerId(farmers);
    }

    const registerData = { ...registerForm, farmerId };

    const ok = onRegister(registerData);
    if (!ok) {
      setError("User already exists. Try different credentials.");
      return;
    }

    if (farmerId) {
      alert(
        `Registration successful! Your Farmer ID is: ${farmerId}. Please use it during login.`
      );
    } else {
      alert("Registration successful! You can now login.");
    }

    setMode("login");
    setRegisterForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "FARMER",
    });
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${mode === "register" ? "slide-mode" : ""}`}>
        {/* LEFT PANEL */}
        <div className="side-panel">
          {mode === "login" ? (
            <>
              <h1>Welcome Back!</h1>
              <p>Login to continue your FarmChainX journey.</p>
              <button className="side-btn" onClick={() => setMode("register")}>
                CREATE ACCOUNT
              </button>
            </>
          ) : (
            <>
              <h1>Hello, Friend!</h1>
              <p>Enter your details to join FarmChainX.</p>
              <button className="side-btn" onClick={() => setMode("login")}>
                SIGN IN
              </button>
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="form-panel">
          <div className="form-box">
            <h2>
              {mode === "login"
                ? "Sign in to FarmChainX"
                : "Create Your FarmChainX Account"}
            </h2>

            {error && <div className="error-box">{error}</div>}

            {/* LOGIN FORM */}
            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />

                <select
                  value={loginForm.role}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, role: e.target.value })
                  }
                >
                  <option value="FARMER">Farmer</option>
                  <option value="DISTRIBUTOR">Distributor</option>
                  <option value="CONSUMER">Consumer</option>
                  <option value="ADMIN">Admin</option>
                </select>

                {loginForm.role === "FARMER" && (
                  <input
                    type="text"
                    placeholder="Enter Farmer ID"
                    value={loginForm.farmerId}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, farmerId: e.target.value })
                    }
                  />
                )}

                <button className="submit-btn" type="submit">
                  Sign In
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={registerForm.username}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      username: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={registerForm.confirmPassword}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <select
                  value={registerForm.role}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, role: e.target.value })
                  }
                >
                  <option value="FARMER">Farmer</option>
                  <option value="DISTRIBUTOR">Distributor</option>
                  <option value="CONSUMER">Consumer</option>
                </select>
                <button className="submit-btn" type="submit">
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
