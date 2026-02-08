import React from "react";
import { createMatch } from "../services/matchApi";

export default function TutorCard({ tutor }) {
  const handleMatch = async () => {
    try {
      await createMatch(tutor.tutor_user_id);
      alert("Match request sent!");
    } catch (e) {
      console.error(e);
      alert("Could not send request");
    }
  };

  return (
    <div className="ui-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3
            style={{ marginTop: 0, marginBottom: "0.25rem", color: "#897e04" }}
          >
            {tutor.name}
          </h3>
          <span style={{ fontSize: "1rem", fontWeight: "bold", color: "#666" }}>
            ${tutor.hourly_rate} / hr
          </span>
        </div>
        <button
          className="nav-btn"
          style={{ padding: "8px 16px" }}
          onClick={handleMatch}
        >
          Request Match
        </button>
      </div>

      <p style={{ margin: "1rem 0", fontStyle: "italic", color: "#555" }}>
        "{tutor.bio || "No bio available."}"
      </p>

      <div
        style={{
          fontSize: "0.9rem",
          color: "#666",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Location:</strong> {tutor.city}, {tutor.zip}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Subjects:</strong> {(tutor.subjects || []).join(", ")}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Ages:</strong> {(tutor.age_groups || []).join(", ")}
        </p>
      </div>
    </div>
  );
}
