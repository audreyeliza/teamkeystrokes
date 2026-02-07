import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>Tutor Match</h1>
      <p>
        Find freelance tutors based on subject, age group, city/ZIP, and hourly rate.
      </p>
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to="/register">
          <button>Get started</button>
        </Link>
        <Link to="/login">
          <button>Log in</button>
        </Link>
      </div>
    </div>
  );
}
