import React from "react";
import { createMatch } from "../services/matchApi";

export default function TutorCard({ tutor }) {
  const handleMatch = async () => {
    try {
      await createMatch(tutor.tutor_user_id);
      alert("Match request sent!");
    } catch (e) {
      console.error(e);
      alert("Could not send request");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "0.75rem",
        marginBottom: "0.5rem",
      }}
    >
      <h3>{tutor.name}</h3>
      <p>
        Subjects: {(tutor.subjects || []).join(", ")} | Rate: $
        {tutor.hourly_rate}/hr
      </p>
      <p>
        Location: {tutor.city} {tutor.zip}
      </p>
      <button onClick={handleMatch}>Request match</button>
    </div>
  );
}
