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
    <div>
      {matches.map((m) => (
        <div
          key={m.id}
          className="ui-card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 25px",
          }}
        >
          <div>
            <strong style={{ color: "#897e04" }}>{m.student_name}</strong>
            <span
              style={{ marginLeft: "10px", fontSize: "14px", color: "#666" }}
            >
              ({m.status})
            </span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {m.status === "pending" && (
              <button className="btn-gold" onClick={() => handleAccept(m.id)}>
                Accept
              </button>
            )}
            <button
              className="btn-gold"
              style={{
                backgroundColor: m.status === "accepted" ? "#897e04" : "#ccc",
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
