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
    <div
      style={{
        border: "1px solid #ccc",
        padding: "0.75rem",
        marginBottom: "0.5rem",
        backgroundColor: "#fff",
      }}
    >
      {/* Name and Rate */}
      <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
        {tutor.name}{" "}
        <span style={{ fontSize: "0.9rem", color: "#666" }}>
          (${tutor.hourly_rate}/hr)
        </span>
      </h3>

      {/* Bio - Italicized to differentiate it */}
      <p style={{ marginBottom: "0.75rem", fontStyle: "italic" }}>
        {tutor.bio || "No bio available."}
      </p>

      {/* Details Block - Spaced out clearly */}
      <div style={{ marginBottom: "0.75rem" }}>
        <p style={{ margin: "0 0 0.25rem 0" }}>
          <strong>Location:</strong> {tutor.city}, {tutor.zip}
        </p>
        <p style={{ margin: "0 0 0.25rem 0" }}>
          <strong>Subjects:</strong> {(tutor.subjects || []).join(", ")}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Ages:</strong> {(tutor.age_groups || []).join(", ")}
        </p>
      </div>

      <button onClick={handleMatch}>Request Match</button>
    </div>
  );
}
