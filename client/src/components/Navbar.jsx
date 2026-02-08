import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-container">
      {/* Brand Logo / Name */}
      <Link to="/" className="nav-logo" style={{ textDecoration: "none" }}>
        <span
          style={{ fontSize: "1.5rem", fontWeight: "800", color: "#9f8813" }}
        >
          TutorMatch
        </span>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {user ? (
          <>
            {user.role === "tutor" && (
              <>
                <Link to="/tutor/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/tutor/profile" className="nav-link">
                  Profile
                </Link>
              </>
            )}
            {user.role === "student" && (
              <>
                <Link to="/student/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/search" className="nav-link">
                  Search Tutors
                </Link>
              </>
            )}
            <button
              className="nav-btn"
              onClick={logout}
              style={{
                marginLeft: "10px",
                padding: "8px 16px",
                fontSize: "0.9rem",
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Log In
            </Link>
            <Link
              to="/register"
              className="nav-btn"
              style={{ padding: "8px 16px", fontSize: "0.9rem" }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
