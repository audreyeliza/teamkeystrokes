import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    city: "",
    zip: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await register(form);
      const role = data.user.role;
      if (role === "tutor") {
        navigate("/tutor/profile");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Could not register. Try a different email.");
    }
  };

  return (
    <div className="ui-card" style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2
        style={{
          color: "#9f8813",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Create Account
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
          <label style={{ fontWeight: "600" }}>Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

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
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "600" }}>I am a...</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Parent / Student</option>
            <option value="tutor">Professional Tutor</option>
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600" }}>City</label>
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600" }}>ZIP Code</label>
            <input
              name="zip"
              placeholder="12345"
              value={form.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          className="nav-btn"
          type="submit"
          style={{ marginTop: "10px", width: "100%", padding: "12px" }}
        >
          Get Started
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
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#9f8813",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Log In
        </Link>
      </p>
    </div>
  );
}
