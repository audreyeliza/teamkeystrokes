import React from "react";
import { useNavigate } from "react-router-dom";

export default function MatchList({ matches }) {
  const navigate = useNavigate();

  const openChat = (id) => {
    navigate(`/matches/${id}/chat`);
  };

  if (!matches || matches.length === 0) {
    return <p>No matches yet.</p>;
  }

  return (
    <ul>
      {matches.map((m) => (
        <li key={m.id} style={{ marginBottom: "0.75rem" }}>
          <span>
            Match status: {m.status} (student {m.student_id}, tutor {m.tutor_id})
          </span>
          {m.status === "accepted" && (
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => openChat(m.id)}
            >
              Open chat
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
