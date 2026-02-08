import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyMatches } from "../services/matchApi";

export default function StudentDashboard() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await getMyMatches();
        setMatches(res.matches || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const goToChat = (matchId) => {
    navigate(`/matches/${matchId}/chat`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      {matches.length === 0 && <p>No matches yet.</p>}
      <ul>
        {matches.map((m) => (
          <li key={m.id} style={{ marginBottom: "0.75rem" }}>
            <span>
              Tutor chat with {m.tutor_name} – {m.status}
            </span>
            {m.status === "accepted" && (
              <button
                style={{ marginLeft: "0.5rem" }}
                onClick={() => goToChat(m.id)}
              >
                Open Chat
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
