import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const data = await register(form); // { user: { role } }
      const role = data.user.role;
      if (role === "tutor") {
        navigate("/tutor/profile"); // go set up tutor profile
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Could not register. Try a different email.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Email: </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Role: </label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Parent/Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>City: </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>ZIP: </label>
          <input name="zip" value={form.zip} onChange={handleChange} required />
        </div>
        <button style={{ marginTop: "1rem" }} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
