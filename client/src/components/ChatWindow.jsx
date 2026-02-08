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
    <div
      className="ui-card"
      style={{ minHeight: "500px", display: "flex", flexDirection: "column" }}
    >
      <h3
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "15px",
          marginBottom: "20px",
        }}
      >
        Conversation with {studentName}
      </h3>

      <div
        style={{
          flex: 1,
          marginBottom: "1.5rem",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        {messages.map((msg) => {
          const isStudent = msg.sender_id === studentId;
          const displayName = isStudent ? studentName : tutorName;

          return (
            <div key={msg.id || msg._id} className="chat-bubble">
              <strong style={{ color: "#897e04", fontSize: "0.8rem" }}>
                {displayName}
              </strong>
              <div style={{ marginTop: "4px" }}>{msg.text}</div>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
