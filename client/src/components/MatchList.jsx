// client/src/components/MatchList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { updateMatch } from "../services/matchApi";

export default function MatchList({ matches, onUpdated }) {
  const navigate = useNavigate();

  const openChat = (id) => {
    navigate(`/matches/${id}/chat`);
  };

  const handleAccept = async (id) => {
    await updateMatch(id, "accepted");
    if (onUpdated) onUpdated();
  };

  if (!matches || matches.length === 0) {
    return <p>No matches yet.</p>;
  }

  return (
    <ul>
      {matches.map((m) => (
        <li key={m.id} style={{ marginBottom: "0.75rem" }}>
          <span>
            Match status: {m.status} (student {m.student_name}, tutor{" "}
            {m.tutor_name})
          </span>

          {m.status === "pending" && (
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => handleAccept(m.id)}
            >
              Accept
            </button>
          )}

          <button
            style={{ marginLeft: "0.5rem" }}
            onClick={() => openChat(m.id)}
            disabled={m.status !== "accepted"}
          >
            Open chat
          </button>
        </li>
      ))}
    </ul>
  );
}
