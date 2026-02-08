import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(form);
      const role = data.user.role;
      if (role === "tutor") {
        navigate("/tutor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="ui-card" style={{ maxWidth: "450px", margin: "60px auto" }}>
      <h2
        style={{
          color: "#9f8813",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Welcome Back
      </h2>

      {error && (
        <p
          style={{
            color: "#d9534f",
            backgroundColor: "#fdf7f7",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "600" }}>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "600" }}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="nav-btn"
          type="submit"
          style={{ marginTop: "10px", width: "100%", padding: "12px" }}
        >
          Log In
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "0.9rem",
          color: "#666",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#9f8813",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
