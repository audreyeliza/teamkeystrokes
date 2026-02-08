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
      style={{
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          flex: 1,
          marginBottom: "1.5rem",
          overflowY: "auto",
          paddingRight: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "12px", // Increased gap slightly to accommodate names
        }}
      >
        {messages.map((msg) => {
          const isStudent = msg.sender_id === studentId;
          const displayName = isStudent ? studentName : tutorName;

          return (
            <div
              key={msg.id || msg._id}
              style={{
                alignSelf: isStudent ? "flex-start" : "flex-end",
                maxWidth: "75%",
              }}
            >
              {/* Name Tag back above the bubble */}
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  color: "#897e04",
                  marginBottom: "4px",
                  textAlign: isStudent ? "left" : "right",
                }}
              >
                {displayName}
              </span>

              <div
                className="chat-bubble"
                style={{
                  margin: 0,
                  backgroundColor: isStudent ? "#f9f9f7" : "#fff",
                  borderLeft: isStudent
                    ? "4px solid #897e04"
                    : "1px solid #eee",
                  borderRight: !isStudent
                    ? "4px solid #897e04"
                    : "1px solid #eee",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: "1rem", lineHeight: "1.4" }}>
                  {msg.text}
                </div>
              </div>
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
