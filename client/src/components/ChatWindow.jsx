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
      style={{ minHeight: "600px", display: "flex", flexDirection: "column" }}
    >
      <h3
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "15px",
          marginBottom: "20px",
          color: "#897e04",
        }}
      >
        Chat with {studentName}
      </h3>

      <div
        style={{
          flex: 1,
          marginBottom: "1.5rem",
          overflowY: "auto",
          paddingRight: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.map((msg) => {
          // Check if the message is from the student
          const isStudent = msg.sender_id === studentId;
          const displayName = isStudent ? studentName : tutorName;

          // Logic for bubble placement:
          // You could further refine this by passing the 'currentUser' ID from AuthContext
          // to align "your" messages to the right.
          // For now, we'll keep it simple with your existing props.

          return (
            <div
              key={msg.id || msg._id}
              style={{
                alignSelf: isStudent ? "flex-start" : "flex-end",
                maxWidth: "80%",
              }}
            >
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
                  textAlign: isStudent ? "left" : "right",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                }}
              >
                <strong
                  style={{
                    color: "#897e04",
                    fontSize: "0.75rem",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {displayName}
                </strong>
                <div style={{ fontSize: "0.95rem" }}>{msg.text}</div>
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
