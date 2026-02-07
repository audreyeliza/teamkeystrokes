// client/src/pages/MatchChatPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";

export default function MatchChatPage() {
  const { matchId } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Match chat</h2>
      <ChatWindow matchId={matchId} />
    </div>
  );
}
