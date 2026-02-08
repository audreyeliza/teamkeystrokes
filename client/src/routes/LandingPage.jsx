import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>TutorMatch</h1>
      <p>
        Find freelance tutors based on subject, age group, city/ZIP, and hourly
        rate.
      </p>
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </div>
    </div>
  );
}
