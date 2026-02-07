import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Tutor Match</Link>
      <span style={{ marginLeft: "1rem" }} />
      {user ? (
        <>
          {user.role === "tutor" && (
            <>
              <Link to="/tutor/dashboard">Dashboard</Link>
              <span style={{ marginLeft: "0.5rem" }} />
              <Link to="/tutor/profile">Profile</Link>
            </>
          )}
          {user.role === "student" && (
            <>
              <Link to="/student/dashboard">Dashboard</Link>
              <span style={{ marginLeft: "0.5rem" }} />
              <Link to="/search">Search</Link>
            </>
          )}
          <button
            style={{ marginLeft: "1rem" }}
            onClick={logout}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <span style={{ marginLeft: "0.5rem" }} />
          <Link to="/register">Sign up</Link>
        </>
      )}
    </nav>
  );
}
