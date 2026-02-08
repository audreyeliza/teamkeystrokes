import React from "react";
import { useNavigate } from "react-router-dom";
import { updateMatch } from "../services/matchApi";

export default function MatchList({ matches, onUpdated }) {
  const navigate = useNavigate();
  const openChat = (id) => navigate(`/matches/${id}/chat`);

  const handleAccept = async (id) => {
    await updateMatch(id, "accepted");
    if (onUpdated) onUpdated();
  };

  if (!matches || matches.length === 0) {
    return (
      <div className="ui-card">
        <p>No matches yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {matches.map((m) => (
        <div
          key={m.id}
          className="ui-card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 24px",
          }}
        >
          <div>
            <strong style={{ fontSize: "1.1rem" }}>{m.student_name}</strong>
            <span
              style={{
                marginLeft: "12px",
                fontSize: "0.85rem",
                color: "#888",
                textTransform: "uppercase",
              }}
            >
              • {m.status}
            </span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {m.status === "pending" && (
              <button
                className="nav-btn"
                style={{ padding: "6px 15px", backgroundColor: "#666" }}
                onClick={() => handleAccept(m.id)}
              >
                Accept
              </button>
            )}
            <button
              className="nav-btn"
              style={{
                padding: "6px 15px",
                opacity: m.status !== "accepted" ? 0.5 : 1,
              }}
              onClick={() => openChat(m.id)}
              disabled={m.status !== "accepted"}
            >
              Open Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
