import React, { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../services/messageApi";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  matchId,
  studentId,
  tutorId,
  studentName,
  tutorName,
}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await getMessages(matchId);
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    }
    loadMessages();
  }, [matchId]);

  const handleSend = async (text) => {
    try {
      await sendMessage(matchId, text);
      const data = await getMessages(matchId);
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="ui-card">
      <div
        style={{
          marginBottom: "1.5rem",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#999" }}>No messages yet...</p>
        ) : (
          messages.map((msg) => {
            const isStudent = msg.sender_id === studentId;
            const displayName = isStudent ? studentName : tutorName;
            return (
              <div key={msg.id || msg._id} className="chat-bubble">
                <small style={{ color: "#897e04", fontWeight: "bold" }}>
                  {displayName}
                </small>
                <div style={{ marginTop: "4px" }}>{msg.text}</div>
              </div>
            );
          })
        )}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
