// client/src/pages/TutorDashboard.jsx
import React, { useEffect, useState } from "react";
import { getMyMatches } from "../services/matchApi";
import MatchList from "../components/MatchList";

export default function TutorDashboard() {
  const [matches, setMatches] = useState([]);

  const load = async () => {
    const res = await getMyMatches();
    setMatches(res.matches || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tutor dashboard</h2>
      <MatchList matches={matches} onUpdated={load} />
    </div>
  );
}
