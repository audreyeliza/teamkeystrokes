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
        const data = await getMessages(matchId); // { messages: [...] }
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    }
    loadMessages();
  }, [matchId]);

  const handleSend = async (text) => {
    try {
      await sendMessage(matchId, text); // { id }
      const data = await getMessages(matchId);
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((msg) => {
          const isStudent = msg.sender_id === studentId;
          const displayName = isStudent ? studentName : tutorName;

          return (
            <div key={msg.id || msg._id}>
              {displayName}: {msg.text}
            </div>
          );
        })}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
