import React, { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../services/messageApi";
import MessageInput from "./MessageInput";

export default function ChatWindow({ matchId }) {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const res = await getMessages(matchId);
      setMessages(res.messages || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!matchId) return;
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  const handleSend = async (text) => {
    await sendMessage(matchId, text);
    await loadMessages();
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "0.5rem",
          height: "300px",
          overflowY: "auto",
        }}
      >
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: "0.25rem" }}>
            <strong>{m.sender_id}: </strong>
            <span>{m.text}</span>
          </div>
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
