import React from "react";
import { useNavigate } from "react-router-dom";
import { updateMatch } from "../services/matchApi";

export default function MatchList({ matches, onUpdated, userRole }) {
  const navigate = useNavigate();
  const openChat = (id) => navigate(`/matches/${id}/chat`);

  const handleAccept = async (id) => {
    await updateMatch(id, "accepted");
    if (onUpdated) onUpdated();
  };

  if (!matches || matches.length === 0) {
    return (
      <div className="ui-card">
        <p style={{ color: "#666", textAlign: "center", margin: 0 }}>
          No matches or requests yet.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {matches.map((m) => {
        // Determine the display name based on who is looking at the list
        const displayName =
          userRole === "tutor" ? m.student_name : m.tutor_name;
        const displayLabel = userRole === "tutor" ? "Student" : "Tutor";

        return (
          <div
            key={m.id}
            className="ui-card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 25px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#897e04",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {displayLabel}
              </div>
              <strong style={{ fontSize: "1.2rem", color: "#333" }}>
                {displayName}
              </strong>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "0.85rem",
                  color: "#999",
                }}
              >
                • {m.status}
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {/* Only tutors see the Accept button, and only if pending */}
              {userRole === "tutor" && m.status === "pending" && (
                <button
                  className="nav-btn"
                  style={{ backgroundColor: "#444" }}
                  onClick={() => handleAccept(m.id)}
                >
                  Accept Request
                </button>
              )}

              <button
                className="nav-btn"
                style={{ opacity: m.status !== "accepted" ? 0.5 : 1 }}
                onClick={() => openChat(m.id)}
                disabled={m.status !== "accepted"}
              >
                {m.status === "accepted" ? "Open Chat" : "Waiting..."}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
