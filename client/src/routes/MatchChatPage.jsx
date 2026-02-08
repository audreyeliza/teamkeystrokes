import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import { getMyMatches } from "../services/matchApi";

export default function MatchChatPage() {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getMyMatches();
      const found = (data.matches || []).find((m) => m.id === matchId);
      setMatch(found || null);
    })();
  }, [matchId]);

  if (!match) {
    return <div style={{ padding: "2rem" }}>Loading chat...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>
        Chat between {match.tutor_name} and {match.student_name}
      </h2>
      <ChatWindow
        matchId={matchId}
        studentId={match.student_id}
        tutorId={match.tutor_id}
        studentName={match.student_name}
        tutorName={match.tutor_name}
      />
    </div>
  );
}
